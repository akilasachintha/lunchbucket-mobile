import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import TopHeader from "../../components/topHeader/TopHeader";
import OrderPlaceSuccessfulModal from "../../components/modals/OrderPlaceSuccessfulModal";
import BottomButton from "../../components/buttons/BottomButton";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {handleCheckoutService} from "../../services/checkoutService";
import {ERROR_STATUS} from "../../errorLogs/errorStatus";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import {getUserPointsService} from "../../services/userProfileService";
import ClaimPointsModal from "../../components/modals/ClaimPointsModal";
import {useMenuContext} from "../../context/MenuContext";
import {isEmptyArray} from "formik";
import {useErrorContext} from "../../context/ErrorContext";

export default function Checkout() {
    const [successResult, setSuccessResult] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountCopy, setTotalAmountCopy] = useState(0);
    const [basket, setBasket] = useState({});
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [points, setPoints] = useState(0);
    const [pointsCopy, setPointsCopy] = useState(0);
    const [isPointsApplied, setIsPointsApplied] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {showError} = useErrorContext();

    const {
        isLunchDisable,
        fetchDisableLunchCheckbox,
    } = useMenuContext();

    const fetchCheckout = async () => {
        try {
            const result = await handleCheckoutService();

            if (result === ERROR_STATUS.ERROR) {
                log("error", "CheckoutScreen", "fetchCheckout | result", result, "CheckoutScreen.js");
            } else {
                log("success", "CheckoutScreen", "fetchCheckout | result", result, "CheckoutScreen.js");
                setSuccessResult(result);
                return true;
            }
        } catch (error) {
            showError(error && error.message);
            log("warn", "CheckoutScreen", "fetchCheckout", error.message, "CheckoutScreen.js");
            return false;
        }
    }

    const handleCheckout = async () => {
        if (isPlacingOrder) return;
        setIsPlacingOrder(true);
        setIsButtonDisabled(true);

        try {
            let basketItems = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            await fetchDisableLunchCheckbox();

            basketItems = JSON.parse(basketItems);

            if (isLunchDisable == null) {
                setIsPlacingOrder(false);
                setIsButtonDisabled(false);
                setIsLoading(false);
            }

            if (isLunchDisable && basketItems.venue === 'Lunch') {
                showError('You cannot order lunch at this time.');
                setIsPlacingOrder(false);
                return;
            }

            if (!isLunchDisable && basketItems.venue === 'Dinner') {
                showError('You cannot order dinner at this time.');
                setIsPlacingOrder(false);
                return;
            }

            basketItems.isCash = !!(basketItems && basketItems.isCash);

            await addDataToLocalStorage('basket', JSON.stringify(basketItems));

            const orderPlacedSuccessfully = await fetchCheckout();

            if (orderPlacedSuccessfully) {
                setIsVisible(true);
            }

        } catch (error) {
            log("error", "CheckoutScreen", "handleCheckout", error.message, "CheckoutScreen.js");
            setIsButtonDisabled(false);
        } finally {
            setIsPlacingOrder(false);
            setIsButtonDisabled(false);
        }
    };

    const fetchBasket = async () => {
        try {
            let basketItems = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            basketItems = JSON.parse(basketItems);
            if (basketItems && basketItems.meal && basketItems.meal.length > 0) {
                let totalAmount = 0;

                basketItems && basketItems.meal.forEach((meal) => {
                    totalAmount += meal.totalPrice;
                });

                basketItems.totalPrice = totalAmount;
                setTotalAmountCopy(totalAmount);

                if (totalAmount >= pointsCopy) {
                    setTotalAmount(totalAmount - pointsCopy);
                } else {
                    setTotalAmount(0);
                }
            }
            setBasket(basketItems);
        } catch (error) {
            log("warn", "CheckoutScreen", "fetchBasket", error.message, "CheckoutScreen.js");
        }
    };

    const fetchUserPoints = async () => {
        try {
            setIsLoading(true);
            const userPoints = await getUserPointsService();
            if (!userPoints) setPoints(0);

            setPoints(userPoints);
            setIsLoading(false);
        } catch (error) {
            setPoints(0);
            log("error", "CheckoutScreen", "fetchUserPoints", error.message, "CheckoutScreen.js");
        }
    }

    useEffect(() => {
        fetchBasket().catch(
            (error) => log("error", "CheckoutScreen", "useEffect", error.message, "CheckoutScreen.js"),
        );
        fetchUserPoints().catch(
            (error) => log("error", "CheckoutScreen", "useEffect", error.message, "CheckoutScreen.js"),
        );
    }, []);

    useEffect(() => {
        setTotalAmount(basket.totalPrice >= pointsCopy ? basket.totalPrice - pointsCopy : 0);
    }, [pointsCopy]);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {isVisible &&
                <OrderPlaceSuccessfulModal isVisible={isVisible} setIsVisible={setIsVisible} basket={basket}
                                           successResult={successResult}/>}
            {isPointsApplied &&
                <ClaimPointsModal points={points} isPointsApplied={isPointsApplied} setPoints={setPoints}
                                  pointsCopy={pointsCopy}
                                  setIsPointsApplied={setIsPointsApplied} setPointsCopy={setPointsCopy}
                                  totalAmount={totalAmount}/>
            }
            <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
            <TopHeader headerText="Order Details" backButtonPath="Basket"/>
            <View style={styles.bodyContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {basket && basket.meal && basket.meal.length > 0 && !isEmptyArray(basket.meal) && basket.meal.map((meal, index) => (
                        <CheckoutItem key={index} index={meal && meal.id} mealName={meal && meal.name}
                                      mealId={meal && meal.id}
                                      isSpecial={meal && meal.isSpecial}
                                      count={meal && meal.count} price={meal && meal.totalPrice}/>
                    ))}
                </ScrollView>
                <View style={styles.amountListContainer}>
                    <View style={styles.claimPointsMainContainer}>
                        <TouchableOpacity style={styles.claimPointsContainer} onPress={() => setIsPointsApplied(true)}>
                            {isLoading ?
                                <ActivityIndicator size="small" color="#018525"/> :
                                <Text style={styles.claimPointsText}>Claim Your Points Rs {points}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Bill Amount</Text>
                        <Text style={styles.amountRightContainer}>Rs {totalAmountCopy.toFixed(2)}</Text>
                    </TouchableOpacity>
                    {
                        pointsCopy > 0 && (
                            <TouchableOpacity style={styles.amountContainer}>
                                <Text style={styles.amountLeftContainer}>Your Points</Text>
                                <Text style={styles.amountRightContainer}> - Rs {pointsCopy}</Text>
                            </TouchableOpacity>
                        )
                    }

                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Delivery Fee</Text>
                        <Text style={styles.amountRightContainer}>Rs {(0).toFixed(2)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.totalAmountLeftContainer}>Total Amount</Text>
                        <Text style={styles.totalAmountRightContainer}>Rs {totalAmount.toFixed(2)}</Text>
                    </TouchableOpacity>
                </View>
                <BottomButton buttonText="Place Order" onPress={handleCheckout} isLoading={isPlacingOrder}
                              isButtonDisabled={isButtonDisabled}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10,
    },
    amountListContainer: {
        paddingVertical: "5%",
    },
    amountContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginHorizontal: 40,
        alignItems: 'center',
    },
    claimPointsMainContainer: {
        alignItems: 'center',
    },
    claimPointsContainer: {
        backgroundColor: 'rgba(137, 205, 156, 0.46)',
        alignItems: 'center',
        width: '70%',
        paddingVertical: 10,
        marginHorizontal: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#018525',
        marginBottom: 20,
    },
    claimPointsText: {
        color: '#01260b',
    },
    amountLeftContainer: {
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
    },
    amountRightContainer: {
        flex: 1,
        fontSize: 18,
        color: 'rgba(71, 71, 71, 1)',
        textAlign: 'right'
    },
    totalAmountLeftContainer: {
        fontSize: 18,
        flex: 1,
        color: '#7E1F24',
    },
    totalAmountRightContainer: {
        fontSize: 18,
        flex: 1,
        color: '#7E1F24',
        fontWeight: 'bold',
        textAlign: 'right'
    },
});
