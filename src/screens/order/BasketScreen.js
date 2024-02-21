import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import BorderButton from "../../components/borderButton/BorderButton";
import BottomButton from "../../components/buttons/BottomButton";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {useToast} from "../../helpers/toast/Toast";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import {useDispatch} from "react-redux";
import {setIsEditMenuFalseReducer} from "../../redux/menuSlice";
import {useMenuContext} from "../../context/MenuContext";
import {isEmptyArray} from "formik";

export default function BasketScreen() {
    const {showToast} = useToast();
    const dispatch = useDispatch();

    const [basket, setBasket] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoadingMenu, setIsLoadingMenu] = useState(false);

    const {
        disableLunchCheckbox,
        disableDinnerCheckbox,
        isLunch,
        fetchDisableLunchCheckbox,
        fetchDisableDinnerCheckbox,
    } = useMenuContext();

    useEffect(() => {
        setIsLoadingMenu(true);
        const timer = setTimeout(() => {
            setIsLoadingMenu(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        fetchDisableLunchCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableLunchCheckbox", error.message, "BasketScreen.js")
        );

        fetchDisableDinnerCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableDinnerCheckbox", error.message, "BasketScreen.js")
        );

    }, [disableLunchCheckbox, disableDinnerCheckbox]);

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    const fetchBasket = async () => {
        try {
            setIsLoading(true);
            let basketItems = await getDataFromLocalStorage('basket');

            if (!basketItems) {
                setIsLoading(false);
                return;
            }
            basketItems = JSON.parse(basketItems);

            setBasket(basketItems);
            setIsLoading(false);
        } catch (error) {
            log("error", "BasketScreen", "fetchBasketItems", error.message, "BasketScreen.js");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBasket().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchBasket", error.message, "BasketScreen.js")
        );
    }, [isModalVisible]);

    useEffect(() => {
        fetchBasket().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchBasket", error.message, "BasketScreen.js")
        );
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchBasket().catch((error) =>
                log("error", "BasketScreen", "useFocusEffect | fetchBasket", error.message, "BasketScreen.js")
            );
        }, [])
    );

    const handleProceedToOrder = async () => {
        setIsSubmit(true);
        setIsButtonDisabled(true);

        try {
            if (isSubmit) return;
            setIsButtonLoading(true);

            await fetchDisableDinnerCheckbox();
            await fetchDisableLunchCheckbox();

            console.log(disableLunchCheckbox, disableDinnerCheckbox, isLunch);

            if (disableLunchCheckbox == null || disableDinnerCheckbox == null || isLunch == null) {
                setIsButtonLoading(false);
                setIsLoading(false);
                return;
            }

            if (!basket || !basket.meal || basket.meal.length === 0) {
                showToast("error", "Please add at least one meal to proceed.");
                setIsButtonLoading(false);
                return;
            }

            if (basket && basket.meal && basket.meal.length === 0) {
                showToast("error", "Please add at least one meal to proceed.");
                setIsButtonLoading(false);
                return;
            }

            const isLunchItems = basket && basket.meal && basket?.meal.filter(meal => meal.venue === "Lunch");
            const isDinnerItems = basket && basket.meal && basket?.meal.filter(meal => meal.venue === "Dinner");

            if (isLunchItems.length === 0 && isDinnerItems.length === 0) {
                showToast("error", "Please add at least one meal to proceed.");
                setIsButtonLoading(false);
                return;
            }

            if (isLunch && isDinnerItems.length !== 0) {
                basket.meal = basket && basket.meal && basket.meal.filter(meal => meal.venue !== "Dinner");
                await addDataToLocalStorage("basket", JSON.stringify(basket));
                await fetchBasket();
                showToast("error", "You can't order lunch and dinner at the same time.");
                setIsButtonLoading(false);
                return;
            }

            if (!isLunch && isLunchItems.length !== 0) {
                basket.meal = basket && basket.meal && basket.meal.filter(meal => meal.venue !== "Lunch");
                await addDataToLocalStorage("basket", JSON.stringify(basket));
                await fetchBasket();
                showToast("error", "You can't order lunch and dinner at the same time.");
                setIsButtonLoading(false);
                return;
            }

            if (basket && basket.meal && !isEmptyArray(basket.meal) && basket.meal.length > 0) {
                console.log("Navigate to checkout");
                // @ts-ignore
                navigation.navigate('Checkout');

                setIsButtonLoading(false);
            } else {
                showToast("error", "Please add at least one meal to proceed.");
                setIsButtonLoading(false);
            }

            setIsButtonLoading(false);
        } catch (error) {
            log("error", "BasketScreen", "handleProceedToOrder", error.message, "BasketScreen.js");
            setIsButtonLoading(false);
        } finally {
            setIsSubmit(false);
            setIsButtonDisabled(false);
        }
    }

    const handleAddMeal = () => {
        dispatch(setIsEditMenuFalseReducer());
        navigation.navigate('Menu');
    }

    if (isLoadingMenu) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <ActivityIndicator size="large" color="#7E1F24" style={styles.loadingIndicator}/>
                    <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder} isLoading={false}
                                  isButtonDisabled={isButtonDisabled}/>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal) => (
                            <BasketItem
                                setLoading={setIsLoading}
                                loading={isLoading}
                                totalAmount={meal.totalPrice}
                                venue={meal.venue}
                                setIsModalVisible={setIsModalVisible}
                                isModalVisible={isModalVisible}
                                setSelectedMealId={setSelectedMealId}
                                selectedMealId={selectedMealId}
                                key={meal.id}
                                mealName={meal.name}
                                mealId={meal.id}
                                items={meal.items}
                                setBasket={setBasket}
                                itemCount={meal.count}
                                isSpecial={meal.isSpecial}
                                potion={meal.potion}
                                isVeg={meal.isVeg}
                            />
                        ))
                    }
                </ScrollView>
                <BorderButton text="Add Meal" onPress={handleAddMeal} icon={plusIcon}/>
                <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder} isLoading={isButtonLoading}
                              isButtonDisabled={isButtonDisabled}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
