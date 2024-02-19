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
import useMenuHook from "../../services/useMenuHook";

export default function BasketScreen() {
    const {showToast} = useToast();
    const dispatch = useDispatch();

    const [basket, setBasket] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState(null);
    const [isLunch, setIsLunch] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        disableLunchCheckbox,
        disableDinnerCheckbox,
        fetchDisableLunchCheckbox,
        fetchDisableDinnerCheckbox
    } = useMenuHook();

    useEffect(() => {
        fetchDisableLunchCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableLunchCheckbox", error.message, "BasketScreen.js")
        );

        fetchDisableDinnerCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableDinnerCheckbox", error.message, "BasketScreen.js")
        );

        if (disableLunchCheckbox) {
            console.log("disableLunchCheckbox", disableLunchCheckbox);
            setIsLunch(false);
        } else if (disableDinnerCheckbox) {
            console.log("disableDinnerCheckbox", disableDinnerCheckbox);
            setIsLunch(true);
        }
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

    useEffect(() => {
        fetchDisableLunchCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableLunchCheckbox", error.message, "BasketScreen.js")
        );
        fetchDisableDinnerCheckbox().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchDisableDinnerCheckbox", error.message, "BasketScreen.js")
        );
    }, [isLunch]);

    const checkLunchAvailability = async () => {
        await fetchDisableLunchCheckbox(); // Assuming this updates the disableLunchCheckbox state
        return !disableLunchCheckbox; // Returns true if lunch is available
    };

    const checkDinnerAvailability = async () => {
        await fetchDisableDinnerCheckbox(); // Assuming this updates the disableDinnerCheckbox state
        return !disableDinnerCheckbox; // Returns true if dinner is available
    };


    const handleProceedToOrder = async () => {
        setIsSubmit(true);

        if (isSubmit) return;

        setIsButtonLoading(true);

        await fetchDisableDinnerCheckbox();
        await fetchDisableLunchCheckbox();

        if (disableLunchCheckbox) {
            console.log("disableLunchCheckbox", disableLunchCheckbox);
            setIsLunch(false);
        } else if (disableDinnerCheckbox) {
            console.log("disableDinnerCheckbox", disableDinnerCheckbox);
            setIsLunch(true);
        }

        const lunchAvailable = await checkLunchAvailability();
        const dinnerAvailable = await checkDinnerAvailability();

        if (lunchAvailable) {
            setIsLunch(true);
        } else if (dinnerAvailable) {
            setIsLunch(false);
        }

        setTimeout(async () => {

            await fetchDisableDinnerCheckbox();
            await fetchDisableLunchCheckbox();

            if (disableLunchCheckbox) {
                console.log("disableLunchCheckbox", disableLunchCheckbox);
                setIsLunch(prevState => true);
            } else if (disableDinnerCheckbox) {
                console.log("disableDinnerCheckbox", disableDinnerCheckbox);
                setIsLunch(prevState => false);
            }

            console.log("Lunch availability: ", lunchAvailable, " | Dinner availability: ", dinnerAvailable);
            console.log("isLunch state updated to: ", isLunch);

        }, 5);

        console.log("disableLunchCheckbox", disableLunchCheckbox);
        console.log("disableDinnerCheckbox", disableDinnerCheckbox);

        console.log("basket", basket);

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

        console.log("isLunchItems", isLunchItems);
        console.log("isDinnerItems", isDinnerItems);


        if (isLunch && isDinnerItems.length !== 0) {
            basket.meal = basket && basket.meal && basket.meal.filter(meal => meal.venue !== "Dinner");
            await addDataToLocalStorage("basket", JSON.stringify(basket));
            await fetchBasket();
            showToast("error", "You can't order lunch and dinner at the same time.");
            setIsButtonLoading(false);
            return;
        }

        console.log("isLunch", isLunch);

        if (!isLunch && isLunchItems.length !== 0) {
            basket.meal = basket && basket.meal && basket.meal.filter(meal => meal.venue !== "Lunch");
            await addDataToLocalStorage("basket", JSON.stringify(basket));
            await fetchBasket();
            showToast("error", "You can't order lunch and dinner at the same time.");
            setIsButtonLoading(false);
            return;
        }

        if (basket && basket.meal && basket.meal.length > 0) {
            navigation.navigate('Checkout');
            setIsButtonLoading(false);
        } else {
            showToast("error", "Please add at least one meal to proceed.");
            setIsButtonLoading(false);
        }

        setIsButtonLoading(false);
    }

    const handleAddMeal = () => {
        dispatch(setIsEditMenuFalseReducer());
        navigation.navigate('Menu');
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <ActivityIndicator size="large" color="#7E1F24" style={styles.loadingIndicator}/>
                    <BorderButton text="Add Meal" onPress={() => navigation.navigate('Menu')} icon={plusIcon}/>
                    <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder} isLoading={true}/>
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
                <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder} isLoading={isButtonLoading}/>
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
        paddingTop: 20,
        flex: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
