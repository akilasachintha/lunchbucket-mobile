import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {setMenuBasketService, updateBasketFromId} from '../../services/menuService';
import {useToast} from '../../helpers/toast/Toast';
import {useSelector} from "react-redux";
import useMenuHook from "../../services/useMenuHook";
import {useMenuContext} from "../../context/MenuContext";
import {useErrorContext} from "../../context/ErrorContext";

interface BasketButtonProps {
    totalCheckedItemsCount: number;
    totalSpecialPrice: number;
    totalAmount: number;
    totalCheckedItems: any[];
    venue: string;
    mealId: number;
    isVeg: boolean;
    totalCheckedSpecialItemsCount: number;
    totalCheckedSpecialItems: any[];
    isLunch: boolean;
    lunchRiceItems: any[];
    dinnerRiceItems: any[];
}

const BasketButton: React.FC<BasketButtonProps> = ({
                                                       totalCheckedItemsCount,
                                                       totalSpecialPrice,
                                                       totalAmount,
                                                       totalCheckedItems,
                                                       venue,
                                                       mealId,
                                                       isVeg,
                                                       totalCheckedSpecialItemsCount,
                                                       totalCheckedSpecialItems,
                                                       lunchRiceItems,
                                                       dinnerRiceItems
                                                   }) => {
    const navigation = useNavigation();
    const {showToast} = useToast();
    const isEditMenu = useSelector((state: any) => state.menu.isEditMenu);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {menuLimits} = useMenuContext();
    const {showError} = useErrorContext();

    const {
        packetLimit,
        checkPacketLimit,
    } = useMenuHook();

    const {
        isLunch,
        disableDinnerCheckbox,
        disableLunchCheckbox,
        fetchDisableLunchCheckbox,
        fetchDisableDinnerCheckbox,
        getDisableLunchCheckbox,
        getDisableDinnerCheckbox,
    } = useMenuContext();

    const handleBasketPress = async () => {
        setIsLoading(true);
        setIsButtonDisabled(true);

        try {
            if (isButtonDisabled) return;

            if(totalCheckedItemsCount === 0 && totalCheckedSpecialItemsCount === 0) {
                // @ts-ignore
                navigation.navigate('Basket');
                setIsLoading(false);
                return;
            }

            await fetchDisableLunchCheckbox();
            await fetchDisableDinnerCheckbox();

            if (disableLunchCheckbox === null || disableDinnerCheckbox === null || isLunch === null) {
                setIsLoading(false);
                setIsButtonDisabled(false);
                return;
            }

            const isSpecial = totalCheckedSpecialItemsCount > 0;
            const ids = totalCheckedSpecialItems.map(item => item.id);

            if (totalCheckedSpecialItemsCount > 0 || totalCheckedItemsCount > 0) {
                await checkPacketLimit(isLunch, isVeg, isSpecial, ids);
            }

            if ((totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0) && packetLimit) {
                setIsLoading(false);
                return;
            }

            if (venue === 'Lunch' && disableLunchCheckbox) {
                // showToast('error', 'Sorry, Lunch time exceeded.');
                showError('Sorry, Lunch time exceeded.');
                setIsLoading(false);
                return;
            }

            if (venue === 'Dinner' && disableDinnerCheckbox) {
                // showToast('error', 'Sorry, Dinner time exceeded.');
                showError('Sorry, Dinner time exceeded.');
                setIsLoading(false);
                return;
            }

            if (isEditMenu) {
                totalCheckedSpecialItemsCount = 0;
            }

            const hasCheckedLunchRiceItem = lunchRiceItems.some(item => item.checked);
            const hasCheckedDinnerRiceItem = dinnerRiceItems.some(item => item.checked);

            if (venue === 'Lunch' && !(hasCheckedLunchRiceItem) && !isSpecial) {
                // showToast('error', `Need to select one rice item.`);
                showError('Need to select one rice item.');
                setIsLoading(false);
                return;
            }

            if (venue === 'Dinner' && !(hasCheckedDinnerRiceItem) && !isSpecial) {
                // showToast('error', `Need to select one rice item.`);
                showError('Need to select one rice item.');
                setIsLoading(false);
                return;
            }

            if (totalCheckedItemsCount > (menuLimits != null ? menuLimits.limits.max : 6)) {
                // showToast('error', `You can select only ${menuLimits?.limits.max} dishes.`);
                showError(`You can select only ${menuLimits?.limits.max} dishes.`);
                setIsLoading(false);
                return;
            }

            if (totalCheckedSpecialItemsCount === 0 && totalCheckedItemsCount === 0) {

                // @ts-ignore
                navigation.navigate('Basket');
                setIsLoading(false);
                return;
            }

            if (totalCheckedSpecialItemsCount > 0 && totalCheckedItemsCount <= 0) {
                // Handle special meals
                const basketItems = totalCheckedSpecialItems && totalCheckedSpecialItems.filter(item => item.checked === true);

                try {
                    if (isEditMenu && mealId > 0) {
                        await updateBasketFromId(mealId, basketItems);
                        showToast('success', 'Basket updated successfully');

                        // @ts-ignore
                        navigation.navigate('Basket');
                    } else {
                        await setMenuBasketService(basketItems, totalAmount, venue, isVeg, true);

                        // @ts-ignore
                        navigation.navigate('Basket');
                    }
                } catch (error) {
                    console.error('Error updating basket:', error);
                }
            }

            if (totalCheckedSpecialItemsCount <= 0 && (totalCheckedItemsCount > 0 && totalCheckedItemsCount <= (menuLimits != null ? menuLimits.limits.max : 6))) {
                // Handle normal meals
                const basketItems = totalCheckedItems && totalCheckedItems.filter(item => item.checked === true);

                try {
                    if (isEditMenu && mealId > 0) {
                        await updateBasketFromId(mealId, basketItems);
                        showToast('success', 'Basket updated successfully');

                        // @ts-ignore
                        navigation.navigate('Basket');

                    } else if (totalCheckedItemsCount >= (menuLimits != null ? menuLimits.limits.min : 4) && totalCheckedItemsCount <= (menuLimits != null ? menuLimits.limits.max : 6)) {
                        await setMenuBasketService(basketItems, totalAmount, venue, isVeg, false);

                        // @ts-ignore
                        navigation.navigate('Basket');
                    } else {
                        showError(`Please select at least ${menuLimits && menuLimits.limits && menuLimits?.limits.min} items to proceed.`);
                        // showToast('error', `Please select at least ${menuLimits && menuLimits.limits && menuLimits?.limits.min} items to proceed.`);
                    }
                } catch (error) {
                    console.error('Error updating basket:', error);
                }
            }

            if (totalCheckedSpecialItemsCount <= 0 && (totalCheckedItemsCount <= (menuLimits != null ? menuLimits.limits.min : 4) && totalCheckedItemsCount >= (menuLimits != null ? menuLimits.limits.max : 6))) {
                console.log("New");
                // showToast('error', `Please select ${menuLimits && menuLimits.limits && menuLimits?.limits.max} items to proceed.`);
                showError(`Please select ${menuLimits && menuLimits.limits && menuLimits?.limits.max} items to proceed.`);
                setIsLoading(false);
            }

            setTimeout(() => {
                setIsButtonDisabled(false);
            }, 1000);

            setIsLoading(false);
        } catch (error) {
            console.error('Error handling basket press:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
            setIsButtonDisabled(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(false);
            setIsButtonDisabled(false);
        }, [])
    );

    return (
        <TouchableOpacity
            onPress={() => handleBasketPress()}
            disabled={isButtonDisabled || isLoading}
            style={styles.priceContainer}>
            <TouchableOpacity
                onPress={() => handleBasketPress()}
                style={styles.priceContainerLeft}
                disabled={isButtonDisabled || isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size={26} color="#630A10"/>
                ) : (
                    <Text style={styles.priceContainerLeftText}>
                        {!isEditMenu ? (
                            `${(totalCheckedItemsCount <= 0 && totalCheckedSpecialItemsCount <= 0) ? 'View ' : 'Add to '} Basket ${totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0 ? `(${totalCheckedItemsCount + totalCheckedSpecialItemsCount})` : ''}`
                        ) : (
                            `Update Basket ${totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0 ? `(${totalCheckedItemsCount + (isEditMenu ? 0 : totalCheckedSpecialItemsCount)})` : ''}`
                        )}
                    </Text>
                )}
            </TouchableOpacity>
            {(totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0) && (
                <View style={styles.priceContainerRight}>
                    <Text style={styles.priceContainerRightText}>Rs {
                        (totalCheckedItemsCount > 0 ? totalAmount : 0) +
                        (totalCheckedSpecialItemsCount > 0 ? (isEditMenu ? 0 : totalSpecialPrice) : 0)}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default BasketButton;

const styles = StyleSheet.create({
    priceContainer: {
        backgroundColor: '#ffd564',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    priceContainerLeft: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerRight: {
        alignItems: 'flex-start',
        flex: 1,
    },
    priceContainerLeftText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
    priceContainerRightText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
        paddingLeft: 40,
    },
});
