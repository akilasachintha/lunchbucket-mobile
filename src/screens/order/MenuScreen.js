import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import {useToast} from "../../helpers/toast/Toast";

import {
    fetchMenuData,
    getByMealIdFromBasketService,
    getDinnerMeetMenuService,
    getDinnerMenuService,
    getDinnerRiceMenuService,
    getDinnerStewMenuService,
    getDinnerVegetableMenuService,
    getLunchMeetMenuService,
    getLunchMenuService,
    getLunchRiceMenuService,
    getLunchStewMenuService,
    getLunchVegetableMenuService
} from "../../services/menuService";
import {log} from "../../helpers/logs/log";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import Timer from "../../components/timer/Timer";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import {
    fetchMenuPercentageDinnerForThreeIDs,
    fetchMenuPercentageDinnerForTwoIDs,
    fetchMenuPercentageLunchForThreeIDs,
    fetchMenuPercentageLunchForTwoIDs
} from "../../redux/menuPercentageSlice";
import specialMenu from "../../components/menu/SpecialMenu";
import UpdateAppModal from "../../components/modals/UpdateAppModal";
import useAppUpdateHook from "../../services/useAppUpdateHook";
import PromotionModal from "../../components/modals/PromotionModal";
import usePromotionHook from "../../services/usePromotionHook";
import {useMenuContext} from "../../context/MenuContext";
import {useErrorContext} from "../../context/ErrorContext";

export default function MenuScreen({route}) {
    const {showToast} = useToast();
    const isEditMenu = useSelector(state => state.menu.isEditMenu);
    const menuPercentageDinnerForTwoIDs = useSelector(state => state.menuPercentage.menuPercentageDinnerForTwoIDs);
    const menuPercentageLunchForTwoIDs = useSelector(state => state.menuPercentage.menuPercentageLunchForTwoIDs);
    const menuPercentageDinnerForThreeIDs = useSelector(state => state.menuPercentage.menuPercentageDinnerForThreeIDs);
    const menuPercentageLunchForThreeIDs = useSelector(state => state.menuPercentage.menuPercentageLunchForThreeIDs);
    const {menuLimits, isLunchDisable, fetchDisableLunchCheckbox} = useMenuContext();

    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVegLunch, setIsVegLunch] = useState(false);
    const [isVegDinner, setIsVegDinner] = useState(false);

    const [isVegLunchSpecial, setIsVegLunchSpecial] = useState(false);
    const [isVegDinnerSpecial, setIsVegDinnerSpecial] = useState(false);

    const [mealId, setMealId] = useState(0);
    const [, setMeal] = useState({});

    // Lunch
    const [isLunch, setIsLunch] = useState(true);
    const [lunchSpecialItems, setLunchSpecialItems] = useState([]);
    const [lunchRiceItems, setLunchRiceItems] = useState([]);
    const [lunchVegetableItems, setLunchVegetableItems] = useState(null);
    const [lunchStewItems, setLunchStewItems] = useState([]);
    const [lunchMeatItems, setLunchMeatItems] = useState([]);

    // Dinner
    const [dinnerSpecialItems, setDinnerSpecialItems] = useState([]);
    const [dinnerRiceItems, setDinnerRiceItems] = useState([]);
    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([]);
    const [dinnerStewItems, setDinnerStewItems] = useState([]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([]);
    const {showError} = useErrorContext();


    const {isUpdateModalVisible, setIsUpdateModalVisible, fetchUpdateStatus} = useAppUpdateHook();
    const {fetchPromotion, setIsPromotionModalVisible, isPromotionModalVisible} = usePromotionHook();

    useEffect(() => {
        fetchUpdateStatus().catch(e => console.log(e));
        fetchPromotion().catch(e => console.log(e));
    }, [isPromotionModalVisible]);

    const fetchMealById = async (mealId) => {
        const result = await getByMealIdFromBasketService(mealId);

        if (result != null) {
            setMeal(result);

            if (result.venue === "Dinner") {
                setIsVegDinner(result.isVeg);
                const dinnerMenu = await getDinnerMenuService();
                const totalDinnerVegetableItems = await getDinnerVegetableMenuService(dinnerMenu);
                const dinnerVegetableItems = result.items.filter((item) => item.foodType === "Vegetables");
                const updatedDinnerVegetableItems = totalDinnerVegetableItems && totalDinnerVegetableItems.map((item) => {
                    const foundItem = dinnerVegetableItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerStewItems = await getDinnerStewMenuService(dinnerMenu);
                const dinnerStewItems = result.items.filter((item) => item.foodType === "Condiments");
                const updatedDinnerStewItems = totalDinnerStewItems.map((item) => {
                    const foundItem = dinnerStewItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerMeatItems = await getDinnerMeetMenuService(dinnerMenu);
                const dinnerMeatItems = result.items.filter((item) => item.foodType === "Meat");
                const updatedDinnerMeatItems = totalDinnerMeatItems.map((item) => {
                    const foundItem = dinnerMeatItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerRiceItems = await getDinnerRiceMenuService(dinnerMenu);
                const dinnerRiceItems = result.items.filter((item) => item.foodType === "Rice");
                const updatedDinnerRiceItems = totalDinnerRiceItems.map((item) => {
                    const foundItem = dinnerRiceItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                setDinnerRiceItems(updatedDinnerRiceItems);
                setDinnerVegetableItems(updatedDinnerVegetableItems);
                setDinnerStewItems(updatedDinnerStewItems);
                setDinnerMeatItems(updatedDinnerMeatItems);
            }

            if (result.venue === "Lunch") {
                setIsVegLunch(result.isVeg);
                const lunchMenu = await getLunchMenuService();

                const totalLunchVegetableItems = await getLunchVegetableMenuService(lunchMenu);
                const lunchVegetableItems = result.items.filter((item) => item.foodType === "Vegetables");
                const updatedLunchVegetableItems = totalLunchVegetableItems.map((item) => {
                    const foundItem = lunchVegetableItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchStewItems = await getLunchStewMenuService(lunchMenu);
                const lunchStewItems = result.items.filter((item) => item.foodType === "Condiments");
                const updatedLunchStewItems = totalLunchStewItems.map((item) => {
                    const foundItem = lunchStewItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchMeatItems = await getLunchMeetMenuService(lunchMenu);
                const lunchMeatItems = result.items.filter((item) => item.foodType === "Meat");
                const updatedLunchMeatItems = totalLunchMeatItems.map((item) => {
                    const foundItem = lunchMeatItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchRiceItems = await getLunchRiceMenuService(lunchMenu);
                const lunchRiceItems = result.items.filter((item) => item.foodType === "Rice");
                const updatedLunchRiceItems = totalLunchRiceItems.map((item) => {
                    const foundItem = lunchRiceItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                setLunchRiceItems(updatedLunchRiceItems);
                setLunchVegetableItems(updatedLunchVegetableItems);
                setLunchStewItems(updatedLunchStewItems);
                setLunchMeatItems(updatedLunchMeatItems);
            }
        }
        setLoading(false);
    };

    const clearValuesAndFetchData = async () => {
        setLoading(true);

        // Clear values
        setSelectedItems([]);
        setLunchSpecialItems([]);
        setLunchSpecialItems([]);
        setLunchRiceItems([]);
        setLunchVegetableItems([]);
        setLunchStewItems([]);
        setLunchMeatItems([]);

        setDinnerSpecialItems([]);
        setDinnerRiceItems([]);
        setDinnerVegetableItems([]);
        setDinnerStewItems([]);
        setDinnerMeatItems([]);

        // Fetch Menu data
        try {
            const lunchMenu = await getLunchMenuService();
            const dinnerMenu = await getDinnerMenuService();

            if (lunchMenu) {
                const menuData = await fetchMenuData(lunchMenu, dinnerMenu);
                setLunchSpecialItems(menuData.specialMenuLunch);
                setLunchRiceItems(menuData.riceMenuLunch);
                setLunchMeatItems(menuData.meetMenuLunch);
                setLunchStewItems(menuData.stewMenuLunch);
                setLunchVegetableItems(menuData.vegetableMenuLunch);

                setDinnerSpecialItems(menuData.specialMenuDinner);
                setDinnerRiceItems(menuData.riceMenuDinner);
                setDinnerMeatItems(menuData.meetMenuDinner);
                setDinnerStewItems(menuData.stewMenuDinner);
                setDinnerVegetableItems(menuData.vegetableMenuDinner);
            }
        } catch (error) {
            showToast("error", "Error fetching menus");
            setLoading(false);
            log("error", "MenuScreen", "useEffect 1", error.message, "MenuScreen.js");
        } finally {
            setLoading(false);
        }
    };

    const createItemListWithType = (type, items, setItems, disableCheckbox) => {
        const handleItemPress = (index) => {
            const newItems = [...items];
            const itemChecked = newItems[index].checked;
            const itemCount = newItems.filter(item => item.checked && item.foodType === type).length;

            const isItemAlreadySelected = selectedItems.some(item => item.id === newItems[index].id);

            switch (itemChecked) {
                case true:
                    setSelectedItems(selectedItems.filter(item => item.id !== newItems[index].id));
                    newItems[index].checked = false;
                    break;
                case false:
                    if (isItemAlreadySelected) {
                        return;
                    }
                    if (type === "Rice" && itemCount === 0) {
                        setSelectedItems([...selectedItems, newItems[index]]);
                        newItems[index].checked = true;
                    } else if (type === "Rice" && itemCount > 0) {
                        // showToast('error', `You can select one rice item only.`);
                        showError(`You can select one rice item only.`);
                        return;
                    }

                    const hasCheckedLunchRiceItem = lunchRiceItems.some(item => item.checked);
                    const hasCheckedDinnerRiceItem = dinnerRiceItems.some(item => item.checked);

                    if (!(hasCheckedLunchRiceItem || hasCheckedDinnerRiceItem) && (totalCheckedLunchItemsCount >= (menuLimits && menuLimits.limits && menuLimits.limits.min) - 1 || totalCheckedDinnerItemsCount >= (menuLimits && menuLimits.limits && menuLimits.limits.min) - 1)) {
                        // showToast('error', `Need to select one rice item for proceeding.`);
                        showError(`Need to select one rice item for proceeding.`);
                        return;
                    } else if ((totalCheckedLunchItemsCount >= (menuLimits && menuLimits.limits && menuLimits.limits.max) || totalCheckedDinnerItemsCount >= (menuLimits && menuLimits.limits && menuLimits.limits.max) - 1)) {
                        // showToast('error', `You can select up to ${menuLimits && menuLimits.limits && menuLimits.limits.max} dishes only.`);
                        showError(`You can select up to ${menuLimits && menuLimits.limits && menuLimits.limits.max} dishes only.`);
                        return;
                    } else {
                        newItems[index].checked = true;
                        setSelectedItems([...selectedItems, newItems[index]]);
                    }
            }
            setItems(newItems);
        };

        return {type, items, handleItemPress, disableCheckbox};
    };

    const lunchItemList = [
        createItemListWithType("Rice", lunchRiceItems, setLunchRiceItems, 1, isLunchDisable),
        createItemListWithType("Vegetables", lunchVegetableItems, setLunchVegetableItems, 2, isLunchDisable),
        createItemListWithType("Condiments", lunchStewItems, setLunchStewItems, 1, isLunchDisable),
        createItemListWithType("Meat", lunchMeatItems, setLunchMeatItems, 1, isLunchDisable),
    ];

    const dinnerItemList = [
        createItemListWithType("Rice", dinnerRiceItems, setDinnerRiceItems, 1, !isLunchDisable),
        createItemListWithType("Vegetables", dinnerVegetableItems, setDinnerVegetableItems, 2, !isLunchDisable),
        createItemListWithType("Condiments", dinnerStewItems, setDinnerStewItems, 1, !isLunchDisable),
        createItemListWithType("Meat", dinnerMeatItems, setDinnerMeatItems, 1, !isLunchDisable),
    ];

    const getTotalCheckedItemsCount = (itemLists) => {
        if (itemLists.length === 0) return 0;

        return itemLists.reduce((total, itemList) => {
            if (itemList && itemList.items && Array.isArray(itemList.items)) {
                const checkedItemsCount = itemList.items.filter(item => item.checked).length;
                return total + checkedItemsCount;
            } else {
                return total;
            }
        }, 0);
    };

    const getTotalCheckedSpecialItemsCount = (specialMenu) => {
        if (!specialMenu || specialMenu.length === 0) return 0;

        return specialMenu.reduce((total, item) => {
            if (item.category && item.category.length > 0) {
                const checkedItemsCount = item.category.filter(subItem => subItem.checked).length;
                return total + checkedItemsCount;
            } else {
                return total;
            }
        }, 0);
    };

    const totalCheckedSpecialLunchItemsCount = useMemo(() => {
        return getTotalCheckedSpecialItemsCount(lunchSpecialItems);
    }, [lunchSpecialItems]);

    const totalCheckedSpecialDinnerItemsCount = useMemo(() => {
        return getTotalCheckedSpecialItemsCount(dinnerSpecialItems);
    }, [dinnerSpecialItems]);

    const getTotalCheckedItems = (itemLists) => {
        if (itemLists.length === 0) return [];

        return itemLists.reduce((total, itemList) => {
            if (itemList && itemList.items && Array.isArray(itemList.items)) {
                const checkedItems = itemList.items.filter(item => item.checked);
                return [...total, ...checkedItems];
            } else {
                return total;
            }
        }, []);
    };

    const getTotalCheckedSpecialItems = (specialMenu) => {
        if (!specialMenu || specialMenu.length === 0) return [];

        return specialMenu.reduce((total, item) => {
            if (item.category && item.category.length > 0) {
                const checkedItems = item.category.filter(subItem => subItem.checked);
                return [...total, ...checkedItems];
            } else {
                return total;
            }
        }, []);
    };

    const totalCheckedLunchItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(lunchItemList);
    }, [lunchRiceItems, lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const totalCheckedDinnerItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(dinnerItemList);
    }, [dinnerRiceItems, dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

    const calculateTotalPrice = (itemList) => {
        let totalPrice = 0;
        let checkedItemsCount = 0;
        itemList && itemList.forEach((item) => {
            if (item.checked) {
                totalPrice += item.price;
                checkedItemsCount++;
            }
        });

        if (menuLimits && menuLimits.extra_payments && menuLimits.extra_payments[checkedItemsCount]) {
            totalPrice += menuLimits.extra_payments[checkedItemsCount].payment;
        }

        return totalPrice;
    };

    const lunchTotalPrice = useMemo(() => {
        return calculateTotalPrice(getTotalCheckedItems(lunchItemList));
    }, [lunchRiceItems, lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const dinnerTotalPrice = useMemo(() => {
        return calculateTotalPrice(getTotalCheckedItems(dinnerItemList));
    }, [dinnerRiceItems, dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

    const handleDisabledMenu = async () => {
        try {
            await fetchDisableLunchCheckbox();

        } catch (error) {
            log('error', 'MenuScreen', 'handleDisabledMenu', error.message, 'MenuScreen.js');
        }
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await clearValuesAndFetchData();
        } catch (error) {
            showToast('error', 'Error fetching menus');
            log('error', 'MenuScreen', 'onRefresh', error.message, 'MenuScreen.js');
        }
        setRefreshing(false);
    };

    function addSuitabilityToItems(menuArray, suitabilityData) {
        return menuArray && menuArray.map(item => {
            const percentageItem = suitabilityData && suitabilityData.find(percentage => percentage.id.id === item.id);
            if (percentageItem) {
                return {
                    ...item,
                    percentage: percentageItem.suitability,
                };
            }
            return item;
        });
    }

    function addSuitabilityToItemsZero(menuArray) {
        return menuArray?.map(item => ({...item, percentage: 0})) || [];
    }

    useFocusEffect(
        React.useCallback(() => {
            if (!isEditMenu) {
                clearValuesAndFetchData()
                    .catch((error) => {
                        log('error', 'MenuScreen', 'useEffect 2', error.message, 'MenuScreen.js');
                    });
            }
        }, [isEditMenu])
    );

    useEffect(() => {
        const countWithoutRiceCategory = selectedItems.filter(item => item.category !== "rice").length;

        const foodIdsListWithoutRiceCategory = selectedItems
            .filter(item => item.category !== "rice")
            .map(item => item.food_id);

        if (countWithoutRiceCategory === 1) {
            if (isLunch) {
                setLunchVegetableItems(addSuitabilityToItemsZero(lunchVegetableItems));
                setLunchMeatItems(addSuitabilityToItemsZero(lunchMeatItems));
                setLunchStewItems(addSuitabilityToItemsZero(lunchStewItems));
            } else {
                setDinnerVegetableItems(addSuitabilityToItemsZero(dinnerVegetableItems));
                setDinnerMeatItems(addSuitabilityToItemsZero(dinnerMeatItems));
                setDinnerStewItems(addSuitabilityToItemsZero(dinnerStewItems));
            }
        }

        if (countWithoutRiceCategory === 2) {
            if (isLunch) {
                dispatch(fetchMenuPercentageLunchForTwoIDs({
                    id1: foodIdsListWithoutRiceCategory[0],
                    id2: foodIdsListWithoutRiceCategory[1]
                }));

                setLunchVegetableItems(addSuitabilityToItems(lunchVegetableItems, menuPercentageLunchForTwoIDs && menuPercentageLunchForTwoIDs.vegi_suitability));
                setLunchMeatItems(addSuitabilityToItems(lunchMeatItems, menuPercentageLunchForTwoIDs && menuPercentageLunchForTwoIDs.meat_suitability));
                setLunchStewItems(addSuitabilityToItems(lunchStewItems, menuPercentageLunchForTwoIDs && menuPercentageLunchForTwoIDs.stew_suitability));
            } else {
                dispatch(fetchMenuPercentageDinnerForTwoIDs({
                    id1: foodIdsListWithoutRiceCategory[0],
                    id2: foodIdsListWithoutRiceCategory[1]
                }));

                setDinnerVegetableItems(addSuitabilityToItems(dinnerVegetableItems, menuPercentageDinnerForTwoIDs && menuPercentageDinnerForTwoIDs.vegi_suitability));
                setDinnerMeatItems(addSuitabilityToItems(dinnerMeatItems, menuPercentageDinnerForTwoIDs && menuPercentageDinnerForTwoIDs.meat_suitability));
                setDinnerStewItems(addSuitabilityToItems(dinnerStewItems, menuPercentageDinnerForTwoIDs && menuPercentageDinnerForTwoIDs.stew_suitability));
            }
        }

        if (countWithoutRiceCategory === 3) {
            if (isLunch) {
                dispatch(fetchMenuPercentageLunchForThreeIDs({
                    id1: foodIdsListWithoutRiceCategory[0],
                    id2: foodIdsListWithoutRiceCategory[1],
                    id3: foodIdsListWithoutRiceCategory[2]
                }));

                setLunchVegetableItems(addSuitabilityToItems(lunchVegetableItems, menuPercentageLunchForThreeIDs && menuPercentageLunchForThreeIDs.vegi_suitability));
                setLunchMeatItems(addSuitabilityToItems(lunchMeatItems, menuPercentageLunchForThreeIDs && menuPercentageLunchForThreeIDs.meat_suitability));
                setLunchStewItems(addSuitabilityToItems(lunchStewItems, menuPercentageLunchForThreeIDs && menuPercentageLunchForThreeIDs.stew_suitability));
            } else {
                dispatch(fetchMenuPercentageDinnerForThreeIDs({
                    id1: foodIdsListWithoutRiceCategory[0],
                    id2: foodIdsListWithoutRiceCategory[1],
                    id3: foodIdsListWithoutRiceCategory[2]
                }));

                setDinnerVegetableItems(addSuitabilityToItems(dinnerVegetableItems, menuPercentageDinnerForThreeIDs && menuPercentageDinnerForThreeIDs.vegi_suitability));
                setDinnerMeatItems(addSuitabilityToItems(dinnerMeatItems, menuPercentageDinnerForThreeIDs && menuPercentageDinnerForThreeIDs.meat_suitability));
                setDinnerStewItems(addSuitabilityToItems(dinnerStewItems, menuPercentageDinnerForThreeIDs && menuPercentageDinnerForThreeIDs.stew_suitability));
            }
        }
    }, [selectedItems]);

    useEffect(() => {
        if (isEditMenu && route.params && route.params.mealId > 0) {
            setMealId(route.params.mealId);

            fetchMealById(route.params.mealId).catch(
                (error) => {
                    showToast('error', 'Error fetching menus');
                    log('error', 'EditMenuScreen', 'useEffect', error.message, 'EditMenuScreen.js');
                }
            );
        }
    }, [route.params]);

    useEffect(() => {
        handleDisabledMenu().catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'MenuScreen', 'useEffect 3', error.message, 'MenuScreen.js');
            }
        );
    }, [isLunch, isLunchDisable]);

    useEffect(() => {
    }, [specialMenu]);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.mainContainer}>
                <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                <View style={styles.bodyTopBar}>
                    <TouchableOpacity style={[styles.lunchContainer, !isLunch && styles.lunchContainerNotSelected]}
                                      onPress={() => setIsLunch(true)}>
                        <Text style={styles.lunchContainerText}>Lunch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.dinnerContainer, isLunch && styles.dinnerContainerNotSelected]}
                                      onPress={() => setIsLunch(false)}>
                        <Text style={styles.dinnerContainerText}>Dinner</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyContainer}>
                    <Timer title={isLunch ? "Lunch" : "Dinner"}
                           disableTime={isLunch ? isLunchDisable : !isLunchDisable} isLoading={false}/>
                    <Menu
                        loading={loading}
                        isLunch={isLunch}
                        setLoading={setLoading}
                        title={isLunch ? "Lunch" : "Dinner"}
                        specialMenu={isLunch ? lunchSpecialItems : dinnerSpecialItems}
                        totalCheckedSpecialItemsCount={isLunch ? totalCheckedSpecialLunchItemsCount : totalCheckedSpecialDinnerItemsCount}
                        setSpecialMenu={isLunch ? setLunchSpecialItems : setDinnerSpecialItems}
                        isVeg={isLunch ? isVegLunch : isVegDinner}
                        isVegSpecial={isLunch ? isVegLunchSpecial : isVegDinnerSpecial}
                        setIsVeg={isLunch ? setIsVegLunch : setIsVegDinner}
                        setIsVegSpecial={isLunch ? setIsVegLunchSpecial : setIsVegDinnerSpecial}
                        itemList={isLunch ? lunchItemList : dinnerItemList}
                        totalCheckedItemsCount={isLunch ? totalCheckedLunchItemsCount : totalCheckedDinnerItemsCount}
                        totalCheckedItems={isLunch ? getTotalCheckedItems(lunchItemList) : getTotalCheckedItems(dinnerItemList)}
                        totalCheckedSpecialItems={isLunch ? getTotalCheckedSpecialItems(lunchSpecialItems) : getTotalCheckedSpecialItems(dinnerSpecialItems)}
                        totalAmount={isLunch ? lunchTotalPrice : dinnerTotalPrice}
                        disableTime={isLunch ? isLunchDisable : !isLunchDisable}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        isEditMenu={isEditMenu}
                        clearAndFetchData={clearValuesAndFetchData}
                        mealId={mealId}
                        editMenu={isEditMenu}
                        lunchRiceItems={lunchRiceItems}
                        dinnerRiceItems={dinnerRiceItems}
                    />
                </View>
                {
                    isUpdateModalVisible && (
                        <UpdateAppModal isModalVisible={isUpdateModalVisible}
                                        setIsModalVisible={setIsUpdateModalVisible}/>
                    )
                }
                {
                    !isUpdateModalVisible && isPromotionModalVisible && (
                        <PromotionModal isModalVisible={isPromotionModalVisible}
                                        setIsModalVisible={setIsPromotionModalVisible}/>
                    )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    bodyTopBar: {
        backgroundColor: '#7E1F24',
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bodyContainer: {
        flex: 10,
    },
    lunchContainer: {
        flex: 1,
        borderTopColor: '#7E1F24',
        borderLeftColor: '#7E1F24',
        borderRightColor: '#7E1F24',
        borderBottomColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderTopLeftRadius: 20,
    },
    lunchContainerNotSelected: {
        paddingVertical: 20,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        flex: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 20,
    },
    dinnerContainer: {
        flex: 1,
        borderTopColor: '#7E1F24',
        borderLeftColor: '#7E1F24',
        borderRightColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderTopRightRadius: 20,
    },
    dinnerContainerNotSelected: {
        paddingVertical: 20,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        flex: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
    },
    lunchContainerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    dinnerContainerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
