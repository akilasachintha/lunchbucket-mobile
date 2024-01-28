import React, {useCallback, useEffect} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";
import {MenuItems} from "@context/MenuContext";
import useMenu from "@hooks/useMenu";
import {capitalizeFirstLetterOfEachWord} from "@helpers/textHelpers";
import {THEME} from "@theme/theme";
import MenuItemAtom from "@components/atoms/MenuItemAtom";
import MenuCategoryHeaderAtom from "@components/atoms/MenuCategoryHeaderAtom";
import {AntDesign, FontAwesome} from "@expo/vector-icons";

export interface MenuItem {
    type?: string;
    category?: string;
    food_id?: number;
    description_nutrition?: string;
    description_goods?: string;
    price: number;
    url?: string;
    id: string;
    vegetarian?: string;
    selected?: boolean;
}

interface MenuMoleculeProps {
    menuId?: string;
    menuType: string;
    isEdit?: boolean;
    menuItems: MenuItems;
}

const MenuMolecule: React.FC<MenuMoleculeProps> = ({menuType, menuItems}) => {
    const {
        sections,
        selectedItems,
        setSections,
        setSelectedItems,
        getOrderedCategories,
        getDisplayName,
        toggleSelectItem,
        setSelectedItemCount,
        selectedItemCount,
        totalPrice,
        handleAddToBasket,
        setTotalPrice
    }
        = useMenu();


    useEffect(() => {
        const transformData = () => {
            const sectionsData = getOrderedCategories(menuType).map(category => ({
                title: getDisplayName(category),
                data: menuItems[category]?.map((item: any) => ({
                    ...item,
                    type: capitalizeFirstLetterOfEachWord(item.type),
                    selected: item.selected ? item.selected : selectedItems.includes(item.id)
                })) || []
            }));
            setSections(sectionsData);
        };

        transformData();
    }, [selectedItems, menuType, menuItems, selectedItemCount, totalPrice]);

    useFocusEffect(
        useCallback(() => {
            setSelectedItems([]);
            setTotalPrice(0);
            setSelectedItemCount(0);
        }, [setSelectedItems, setTotalPrice, setSelectedItemCount])
    );

    return (
        <>
            <SectionList
                sections={sections}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => toggleSelectItem(item.id, item.category)}
                    >
                        <MenuItemAtom item={item}/>
                        {item.selected ? <AntDesign name="checkcircle" size={22} color="rgba(44, 152, 74, 1)"/> :
                            <FontAwesome name="circle-thin" size={24} color="black"/>}
                    </TouchableOpacity>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <MenuCategoryHeaderAtom title={title}/>
                )}
                style={styles.container}
            />
            <TouchableOpacity style={styles.addToBasketButton} onPress={() => handleAddToBasket(menuType)}>
                {
                    selectedItemCount > 0 ? (
                        <Text style={styles.buttonText}>
                            Add to basket {selectedItemCount > 0 && `(${selectedItemCount})`}
                        </Text>
                    ) : (
                        <Text style={styles.buttonText}>
                            Go to basket
                        </Text>
                    )
                }
                {
                    totalPrice > 0 &&
                    <Text style={styles.buttonText}>
                        ${totalPrice.toFixed(2)}
                    </Text>
                }
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: THEME.COLORS.primaryBackgroundLight,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingHorizontal: "5%",
    },
    itemTitle: {
        flex: 1,
        fontSize: 18,
    },
    image: {
        width: 70,
        height: 50,
        borderRadius: 10,
        marginRight: "5%",
    },
    selectedIcon: {
        fontSize: 24,
        color: 'green',
    },
    addToBasketButton: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: THEME.COLORS.primaryYellow,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    buttonText: {
        justifyContent: 'center',
        color: THEME.COLORS.primaryRed,
        fontSize: THEME.FONTS.SIZE.md,
        fontWeight: 'bold',
    },
});

export default MenuMolecule;
