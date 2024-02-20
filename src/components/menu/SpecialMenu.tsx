import React from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import toTitleCase from "../../helpers/strings/stringFormatter";
import {log} from "../../helpers/logs/log";

interface MenuItem {
    type: string;
    price: number;
    checked: boolean;
    items?: string[];
    url?: string;
    vegetarian: boolean;
}

interface MenuCategory {
    category_name: string;
    category: MenuItem[];
}

interface SpecialMenuProps {
    specialMenu: MenuCategory[];
    setSpecialMenu: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
    totalCheckedItemsCount: number;
    disableTime: boolean;
    setTotalSpecialPrice: React.Dispatch<React.SetStateAction<number>>;
    isVeg: boolean;
    setIsVeg: React.Dispatch<React.SetStateAction<boolean>>;
    clearAndFetchData: () => Promise<void>;
}

const SpecialMenu: React.FC<SpecialMenuProps> = ({
                                                     specialMenu,
                                                     setSpecialMenu,
                                                     totalCheckedItemsCount,
                                                     disableTime,
                                                     setTotalSpecialPrice,
                                                     isVeg,
                                                     setIsVeg,
                                                     clearAndFetchData
                                                 }) => {

    const [vegMenu, setVegMenu] = React.useState<MenuCategory[]>([]);
    const [nonVegMenu, setNonVegMenu] = React.useState<MenuCategory[]>([]);

    React.useEffect(() => {
        const vegMenu = specialMenu.map(category => ({
            ...category,
            category: category.category.filter((item: any) => item.vegetarian)
        })).filter(category => category.category.length > 0);
        setVegMenu(vegMenu);

        const nonVegMenu = specialMenu.map(category => ({
            ...category,
            category: category.category.filter((item: any) => !item.vegetarian)
        })).filter(category => category.category.length > 0);
        setNonVegMenu(nonVegMenu);
    }, [specialMenu]);

    const handleItemPress = (mainIndex: number, subIndex: number) => {
        const menuToUpdate = isVeg ? [...vegMenu] : [...nonVegMenu];

        menuToUpdate[mainIndex].category[subIndex].checked = !menuToUpdate[mainIndex].category[subIndex].checked;

        if (isVeg) {
            setVegMenu(menuToUpdate);
        } else {
            setNonVegMenu(menuToUpdate);
        }

        const updatedSpecialMenu = specialMenu.map((category, idx) => {
            if (isVeg ? category.category.some(item => item.vegetarian) : category.category.some(item => !item.vegetarian)) {
                if (idx === mainIndex) {
                    return {
                        ...category,
                        category: category.category.map((item, itemIdx) => {
                            if (itemIdx === subIndex) {
                                return {
                                    ...item,
                                    checked: menuToUpdate[mainIndex].category[subIndex].checked,
                                };
                            }
                            return item;
                        }),
                    };
                }
            }
            return category;
        });

        setSpecialMenu(updatedSpecialMenu);

        const totalSpecialItems = calculateSpecialMenuPrice();
        setTotalSpecialPrice(totalSpecialItems);
    };

    const calculateSpecialMenuPrice = () => {
        let totalPrice = 0;

        specialMenu.forEach((menuCategory) => {
            menuCategory.category.forEach((menuItem) => {
                if (menuItem.checked) {
                    totalPrice += menuItem.price;
                }
            });
        });

        return totalPrice;
    };

    const toggleSwitch = () => {
        clearAndFetchData().catch(
            (error) => {
                log('error', 'Menu', 'toggleSwitch', error.message, 'Menu.tsx');
            }
        );

        setIsVeg((previousState) => !previousState);
    };

    return (
        <View>
            <View style={styles.specialMenu}>
                {
                    <View style={styles.descriptionContainer}>
                        <View style={styles.vegSwitchContainer}>
                            <Switch onValueChange={toggleSwitch} value={isVeg}
                                    style={styles.vegTextSwitch}
                                    trackColor={{false: '#767577', true: '#2C984A'}}
                                    thumbColor={isVeg ? '#f4f3f4' : '#f4f3f4'}
                            />
                            <Text style={styles.vegText}>I am {!isVeg && "not "}a Vegetarian</Text>
                        </View>
                    </View>
                }
                {totalCheckedItemsCount <= 0 && isVeg && vegMenu && vegMenu.length > 0 && vegMenu.map((item, index) => (
                    <View key={index} style={styles.specialMenuItemContainer}>
                        <View style={styles.specialItemLeftContainer}>
                            <View style={styles.specialMenuItem}>
                                <View style={styles.mainSpecialItemTextContainer}>
                                    <Text
                                        style={styles.specialMenuText}>{item && item.category && item.category.length > 0 && toTitleCase(item.category_name)}</Text>
                                </View>
                                {item && item.category && item.category.length > 0 && item.category.map((subItem, subIndex) => (
                                    <View key={subIndex} style={styles.specialMenuCategoryContainer}>
                                        <View style={styles.specialMenuSubItemLeftContainer}>
                                            <View style={styles.specialMenuItemTitle}>
                                                <View style={styles.subItemMainText}>
                                                    <View
                                                        style={styles.specialMenuSubItemTextContainer}>
                                                        <Text
                                                            style={styles.subItemText}>{subItem ? toTitleCase(subItem.type) : ''}</Text>
                                                        <Text
                                                            style={styles.subItemPriceText}>Rs. {subItem ? subItem.price : ''}.00</Text>
                                                    </View>
                                                    {subItem && !subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <MaterialIcons
                                                                name="radio-button-unchecked"
                                                                size={30}
                                                                color="rgba(57, 57, 57, 0.5)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                    {subItem && subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <AntDesign
                                                                name="checkcircle"
                                                                size={24}
                                                                color="rgba(44, 152, 74, 1)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={styles.specialSubMenuContainer}>
                                                <View style={styles.specialSubMenuLeftContainer}>
                                                    {subItem && Array.isArray(subItem.items) && subItem.items && subItem.items.length && subItem.items.length > 0 ? subItem.items.map((subSubItem, subSubIndex) => (
                                                        <View key={subSubIndex}
                                                              style={styles.subSubItemsContainer}>
                                                            <Text
                                                                style={styles.subSubItemsTextContainer}
                                                                key={subSubIndex}>
                                                                {toTitleCase(subSubItem)}
                                                            </Text>
                                                        </View>
                                                    )) : null}
                                                </View>
                                                <View
                                                    style={styles.specialSubMenuRightContainer}>
                                                    {subItem && subItem.url ? (
                                                        <Image
                                                            source={{uri: subItem && subItem.url.toString() ? subItem.url.toString() : ''}}
                                                            style={styles.specialSubMenuImage}
                                                        />
                                                    ) : null}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                {
                                    item && item.category && item.category_name === 'Lunch Bucket Authentic' && (
                                        <Text style={styles.descriptionText}>
                                            🚨 Delivery time for this category will be automatically selected based on your
                                            ordering time, with options available at 3:30 PM, 4:30 PM, and 5:30 PM.
                                        </Text>
                                    )
                                }
                                {
                                    item.category.length <= 0 && (
                                        <View style={styles.descriptionText}>
                                            <Text
                                                style={styles.descriptionText}>No {toTitleCase(item.category_name)} available</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                ))}

                {totalCheckedItemsCount <= 0 && !isVeg && nonVegMenu && nonVegMenu.length > 0 && nonVegMenu.map((item, index) => (
                    <View key={index} style={styles.specialMenuItemContainer}>
                        <View style={styles.specialItemLeftContainer}>
                            <View style={styles.specialMenuItem}>
                                <View style={styles.mainSpecialItemTextContainer}>
                                    <Text
                                        style={styles.specialMenuText}>{item && item.category && item.category.length > 0 && toTitleCase(item.category_name)}</Text>
                                </View>
                                {item && item.category && item.category.length > 0 && item.category.map((subItem, subIndex) => (
                                    <View key={subIndex} style={styles.specialMenuCategoryContainer}>
                                        <View style={styles.specialMenuSubItemLeftContainer}>
                                            <View style={styles.specialMenuItemTitle}>
                                                <View style={styles.subItemMainText}>
                                                    <View
                                                        style={styles.specialMenuSubItemTextContainer}>
                                                        <Text
                                                            style={styles.subItemText}>{subItem ? toTitleCase(subItem.type) : ''}</Text>
                                                        <Text
                                                            style={styles.subItemPriceText}>Rs. {subItem ? subItem.price : ''}.00</Text>
                                                    </View>
                                                    {subItem && !subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <MaterialIcons
                                                                name="radio-button-unchecked"
                                                                size={30}
                                                                color="rgba(57, 57, 57, 0.5)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                    {subItem && subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <AntDesign
                                                                name="checkcircle"
                                                                size={24}
                                                                color="rgba(44, 152, 74, 1)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={styles.specialSubMenuContainer}>
                                                <View style={styles.specialSubMenuLeftContainer}>
                                                    {subItem && Array.isArray(subItem.items) && subItem.items && subItem.items.length && subItem.items.length > 0 ? subItem.items.map((subSubItem, subSubIndex) => (
                                                        <View key={subSubIndex}
                                                              style={styles.subSubItemsContainer}>
                                                            <Text
                                                                style={styles.subSubItemsTextContainer}
                                                                key={subSubIndex}>
                                                                {toTitleCase(subSubItem)}
                                                            </Text>
                                                        </View>
                                                    )) : null}
                                                </View>
                                                <View
                                                    style={styles.specialSubMenuRightContainer}>
                                                    {subItem && subItem.url ? (
                                                        <Image
                                                            source={{uri: subItem && subItem.url.toString() ? subItem.url.toString() : ''}}
                                                            style={styles.specialSubMenuImage}
                                                        />
                                                    ) : null}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                                {
                                    item && item.category && item.category_name === 'Lunch Bucket Authentic' && (
                                        <Text style={styles.descriptionText}>
                                            🚨 Delivery time for this category will be automatically selected based on your
                                            ordering time, with options available at 3:30 PM, 4:30 PM, and 5:30 PM.
                                        </Text>
                                    )
                                }
                                {
                                    item.category.length <= 0 && (
                                        <View style={styles.descriptionText}>
                                            <Text
                                                style={styles.descriptionText}>No {toTitleCase(item.category_name)} available</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    specialMenu: {},
    specialMenuItemContainer: {},
    specialItemLeftContainer: {},
    specialMenuItem: {},
    mainSpecialItemTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: "3%",
        backgroundColor: 'rgba(255, 245, 0, 0.5)',
    },
    specialMenuCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    specialMenuSubItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    specialMenuItemTitle: {
        paddingVertical: "2%",
    },
    subItemMainText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: "10%",
        width: '100%',
    },
    subItemText: {
        fontSize: 18,
        flex: 5,
    },
    bodyContentContainer: {
        flex: 6,
    },
    itemContainer: {},
    scrollViewContainer: {},
    pickUpDishesText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
        color: '#4D4D4D',
    },
    descriptionContainer: {
        paddingHorizontal: '10%',
        flexDirection: 'row',
    },
    subSubItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: "2%",
    },
    specialMenuMainTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: "2%",
        paddingHorizontal: '10%',
    },
    specialMenuMainText: {
        fontSize: 18,
        marginRight: 10,
        textAlign: 'center',
    },
    specialMenuContainer: {},
    itemTextContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
    },
    itemText: {
        fontSize: 18,
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    listItemText: {
        paddingTop: 18,
        fontSize: 18,
    },
    listItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    subMenuText: {
        fontSize: 12,
    },
    subItemIcon: {
        marginRight: 10,
    },
    specialMenuText: {
        fontSize: 18,
        paddingHorizontal: 40,
        textAlign: 'left',
        color: 'rgb(138,27,27)',
        fontWeight: 'bold',
    },
    specialMenuSubItemTextContainer: {
        flex: 1,
    },
    subItemPriceText: {
        fontSize: 14,
    },
    listItemRightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },


    specialMenuRightContainer: {},

    subSubItemsTextContainer: {
        fontSize: 12,
        color: 'rgba(14,12,12,0.95)',
    },
    normalMealContainer: {},
    specialMenuSubItemContainer: {},
    specialMenuSubItem: {},
    specialMenuSubItemText: {},
    chooseTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 40,
        marginTop: 10,
    },
    chooseTypeIcon: {
        width: 40,
        height: 30,
        marginBottom: 10,
    },
    chooseTypeItemLeft: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#FFF1F1',
        borderWidth: 2,
        marginRight: 10,
        alignItems: 'center',
    },
    chooseTypeItemRight: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#FFF1F1',
        borderWidth: 2,
        borderRadius: 10,
    },
    chooseTypeText: {
        fontSize: 14,
        textAlign: 'center',
    },
    selectedMenu: {
        borderWidth: 2,
        borderColor: 'rgb(134,36,43)',
    },
    selectedMenuText: {
        color: 'black',
    },
    specialSubMenuContainer: {
        flexDirection: 'row',
        paddingVertical: "4%",
        paddingHorizontal: "10%",
        alignItems: 'center',
    },
    specialSubMenuLeftContainer: {
        flex: 4,
    },
    specialSubMenuRightContainer: {
        flex: 1,
        paddingRight: "10%",
    },
    specialSubMenuImage: {
        width: 100,
        height: 80,
        borderRadius: 10,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vegSwitchContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    vegText: {
        fontSize: 14,
        paddingLeft: 10,
        fontStyle: 'italic',
    },
    vegTextSwitch: {},
    descriptionText: {
        fontSize: 12,
        fontStyle: 'italic',
        marginHorizontal: "8%",
        marginBottom: "2%",
        color: 'rgb(178,8,8)',
        paddingVertical: "2%",
    },
});

export default SpecialMenu;
