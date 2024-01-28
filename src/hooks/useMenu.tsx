import {useAxiosContext} from "@context/AxiosContext";
import {MenuItems, useMenuContext} from "@context/MenuContext";
import {MenuItem} from "@components/molecules/MenuMolecule";
import {useEffect, useState} from "react";
import {useBasket} from "@context/BasketContext";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {useToastContext} from "@context/ToastContext";

const useMenu = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedItemCount, setSelectedItemCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const {basket, addMenuToBasket} = useBasket();
    const {showToast} = useToastContext();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {axiosLunchBucketInstance} = useAxiosContext();
    const {setLunchMenuItems, setDinnerMenuItems, setEditMenuItems, lunchMenuItems} = useMenuContext();

    const handleLunchMenu = async () => {
        try {
            const response = await axiosLunchBucketInstance.get('/lunch/getMenus');
            if (response && response.data && response.data.data && response.data.data.data) {
                setLunchMenuItems(response && response.data && response.data.data && response.data.data.data);
                return true;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const handleDinnerMenu = async () => {
        try {
            const response = await axiosLunchBucketInstance.get('/dinner/getMenus');
            if (response && response.data && response.data.data && response.data.data.data) {
                setDinnerMenuItems(response && response.data && response.data.data && response.data.data.data);
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const handleEditMenuItems = async (menuId: string, menuType: string): Promise<boolean> => {
        try {
            if (menuType === 'lunch') {
                const selectedMenu = basket.find(menu => menu.id === menuId && menu.menuType === menuType);
                if (selectedMenu) {
                    const updatedLunchMenuItems: MenuItems = Object.keys(lunchMenuItems).reduce<MenuItems>((acc, key) => {
                        acc[key] = lunchMenuItems[key].map(item => ({
                            ...item,
                            selected: selectedMenu.items.some(basketItem => basketItem.id === item.id)
                        }));
                        return acc;
                    }, {});

                    setEditMenuItems(updatedLunchMenuItems);
                    setSelectedItems(selectedMenu.items.map(item => item.id));
                    setTotalPrice(selectedMenu.totalPrice);
                    setSelectedItemCount(selectedMenu.items.length);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    const handleMenuItems = (menuType: string, isEdit?: boolean) => {
        if (!isEdit && menuType === 'lunch') {
            return handleLunchMenu();
        } else if (!isEdit && menuType === 'dinner') {
            return handleDinnerMenu();
        } else {
            return handleDinnerMenu();
        }
    }

    const handleAddToBasket = (menuType: string) => {
        if (selectedItems.length === 5) {
            const selectedItemsData: MenuItem[] = sections
                .map(section => section.data.filter((item: any) => selectedItems.includes(item.id)))
                .flat();
            addMenuToBasket(menuType, selectedItemsData);

            navigation.navigate('HomeStackHomeTabMenuStackBasket');
        } else if (selectedItems.length <= 0) {
            navigation.navigate('HomeStackHomeTabMenuStackBasket');
        } else {
            showToast('You need to select 1 rice item and 4 other items.', 'error');
        }
    };

    const toggleSelectItem = (id: string, category: string) => {
        setSelectedItems(prevItems => {
            const isAlreadySelected = prevItems.includes(id);
            let newTotalPrice = totalPrice;

            if (isAlreadySelected) {
                const itemPrice = sections.flatMap(section => section.data)
                    .find((item: MenuItem) => item.id === id)?.price ?? 0;
                newTotalPrice -= itemPrice;
                setTotalPrice(newTotalPrice);
                return prevItems.filter(item => item !== id);

            } else {
                const selectedRiceCount = sections.find(section => section.title === 'Rice')
                    ?.data.filter((item: MenuItem) => prevItems.includes(item.id) && item.category === 'rice').length || 0;
                const selectedOtherCount = prevItems.length - selectedRiceCount;

                if ((category === 'rice' && selectedRiceCount < 1) ||
                    (category !== 'rice' && selectedOtherCount < 4)) {
                    const itemPrice = sections.flatMap(section => section.data)
                        .find((item: MenuItem) => item.id === id)?.price ?? 0;
                    newTotalPrice += itemPrice;
                    setTotalPrice(newTotalPrice);
                    return [...prevItems, id];
                } else {
                    showToast('You can only select 1 rice item and 4 meal items.', 'error');
                    return prevItems;
                }
            }
        });
    };

    useEffect(() => {
        setSelectedItemCount(selectedItems.length);
    }, [selectedItems]);

    const categoryDisplayNames: { [key: string]: string } = {
        "vege": "Vegetables",
        "meat": "Meats",
        "stew": "Stews",
        "rice": "Rice",
    };

    function getDisplayName(category: string): string {
        const parts = category.split('_menu_');
        if (parts.length !== 2) {
            return "Unknown";
        }

        const [categoryKey, mealTime] = parts;
        const categoryName = categoryDisplayNames[categoryKey];

        if (categoryName && (mealTime === 'lunch' || mealTime === 'dinner')) {
            return `${categoryName}`;
        }

        return "Unknown";
    }

    const getOrderedCategories = (menuType: string) => {
        const baseCategories = ['rice', 'vege', 'stew', 'meat'];
        return baseCategories.map(category => `${category}_menu_${menuType}`);
    };

    return {
        handleMenuItems,
        handleAddToBasket,
        toggleSelectItem,
        selectedItemCount,
        setSelectedItemCount,
        sections,
        selectedItems,
        totalPrice,
        setTotalPrice,
        getOrderedCategories,
        setSections,
        setSelectedItems,
        getDisplayName,
        handleEditMenuItems,
    }
}

export default useMenu;