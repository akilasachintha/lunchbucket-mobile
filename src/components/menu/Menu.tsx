import React, {useState} from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ItemList from '../list/ItemList';
import BasketButton from './BasketButton';
import PATHS from "../../helpers/paths/paths";
import SpecialMenu from "./SpecialMenu";
import {useSelector} from "react-redux";
import {FontAwesome5} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {useMenuContext} from "../../context/MenuContext";

interface MenuItem {
    type: string;
    items: any[];
    handleItemPress: () => void;
}

interface MenuProps {
    specialMenu: any;
    setSpecialMenu: React.Dispatch<React.SetStateAction<any>>;
    itemList: MenuItem[];
    title: string;
    totalCheckedItemsCount?: number;
    totalAmount: number;
    totalCheckedItems: any[];
    disableTime: any;
    mealId?: number;
    isVeg: boolean;
    setIsVeg: React.Dispatch<React.SetStateAction<boolean>>;
    totalCheckedSpecialItemsCount?: number;
    totalCheckedSpecialItems: any[];
    refreshing: boolean;
    onRefresh: () => void;
    loading: boolean;
    clearAndFetchData: () => Promise<void>;
    isLunch: boolean;
    isVegSpecial: boolean;
    setIsVegSpecial: React.Dispatch<React.SetStateAction<boolean>>;
    lunchRiceItems: any[];
    dinnerRiceItems: any[];
}

const Menu: React.FC<MenuProps> = ({
                                       specialMenu,
                                       setSpecialMenu,
                                       itemList,
                                       title,
                                       totalCheckedItemsCount = 0,
                                       totalAmount,
                                       totalCheckedItems,
                                       disableTime,
                                       mealId = 0,
                                       isVegSpecial,
                                       isVeg,
                                       setIsVegSpecial,
                                       setIsVeg,
                                       totalCheckedSpecialItemsCount = 0,
                                       totalCheckedSpecialItems,
                                       refreshing,
                                       onRefresh,
                                       loading,
                                       clearAndFetchData,
                                       isLunch,
                                       lunchRiceItems,
                                       dinnerRiceItems
                                   }) => {

    const isEditMenu = useSelector((state: any) => state.menu.isEditMenu);
    const navigation = useNavigation();
    const {menuLimits} = useMenuContext();

    const [showSpecialMenu, setShowSpecialMenu] = useState(false);
    const [totalSpecialPrice, setTotalSpecialPrice] = useState(0);

    // const toggleSwitch = () => {
    //     clearAndFetchData().catch(
    //         (error) => {
    //             log('error', 'Menu', 'toggleSwitch', error.message, 'Menu.js');
    //         }
    //     );
    //     setIsVeg((previousState) => !previousState);
    // };

    if (loading) return (
        <View style={styles.bodyContentContainer}>
            {
                !isEditMenu && (
                    <View style={styles.chooseTypeContainer}>
                        {
                            totalCheckedSpecialItemsCount <= 0 && (
                                <TouchableOpacity
                                    style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                                    onPress={() => setShowSpecialMenu(false)}
                                >
                                    <Image source={PATHS.foodcup} style={styles.chooseTypeIcon}/>
                                    <Text style={[styles.chooseTypeText, !showSpecialMenu && styles.selectedMenuText]}>Choice
                                        Menu</Text>
                                </TouchableOpacity>
                            )
                        }
                        {
                            totalCheckedItemsCount <= 0 && (
                                <TouchableOpacity
                                    style={[styles.chooseTypeItemRight, showSpecialMenu && styles.selectedMenu]}
                                    onPress={() => setShowSpecialMenu(true)}
                                >
                                    <Image source={PATHS.food} style={styles.chooseTypeIcon}/>
                                    <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                        Special</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }
            <ActivityIndicator size="large" color="#630A10" style={styles.activityIndicator}/>
            <BasketButton
                totalCheckedSpecialItems={totalCheckedSpecialItems}
                totalCheckedSpecialItemsCount={totalCheckedSpecialItemsCount}
                totalCheckedItemsCount={totalCheckedItemsCount}
                totalCheckedItems={totalCheckedItems}
                totalSpecialPrice={totalSpecialPrice}
                totalAmount={totalAmount}
                venue={title}
                mealId={mealId}
                isVeg={isVeg}
                isLunch={isLunch}
                lunchRiceItems={lunchRiceItems}
                dinnerRiceItems={dinnerRiceItems}
            />
        </View>
    );

    return (
        <View style={styles.bodyContentContainer}>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
            >
                {
                    !isEditMenu && (
                        <View style={[styles.chooseTypeContainer]}>
                            {
                                totalCheckedSpecialItemsCount <= 0 && (
                                    <TouchableOpacity
                                        style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                                        onPress={() => setShowSpecialMenu(false)}
                                    >
                                        <Image source={PATHS.foodcup} style={styles.chooseTypeIcon}/>
                                        <Text
                                            style={[styles.chooseTypeText, !showSpecialMenu && styles.selectedMenuText]}>Choice
                                            Menu</Text>
                                    </TouchableOpacity>
                                )
                            }
                            {
                                totalCheckedItemsCount <= 0 && (
                                    <TouchableOpacity
                                        style={[styles.chooseTypeItemRight, showSpecialMenu && styles.selectedMenu]}
                                        onPress={() => setShowSpecialMenu(true)}
                                    >
                                        <Image source={PATHS.food} style={styles.chooseTypeIcon}/>
                                        <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                            Special</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                }

                <View style={styles.itemContainer}>
                    {!isEditMenu && showSpecialMenu && (
                        <SpecialMenu specialMenu={specialMenu}
                                     setSpecialMenu={setSpecialMenu}
                                     totalCheckedItemsCount={totalCheckedItemsCount}
                                     disableTime={disableTime}
                                     setIsVeg={setIsVegSpecial}
                                     isVeg={isVegSpecial}
                                     clearAndFetchData={clearAndFetchData}
                                     setTotalSpecialPrice={setTotalSpecialPrice}/>
                    )}
                    {(!showSpecialMenu || isEditMenu) && (
                        <View>
                            <View style={styles.normalMealContainer}>
                                <Text style={styles.pickUpDishesText}>You can pick up to 1 rice and 4 dishes.</Text>
                                {/*{*/}
                                {/*    !isEditMenu && (*/}
                                {/*        <View style={styles.descriptionContainer}>*/}
                                {/*            <View style={styles.vegSwitchContainer}>*/}
                                {/*                <Switch onValueChange={toggleSwitch} value={isVeg}*/}
                                {/*                        style={styles.vegTextSwitch}*/}
                                {/*                        trackColor={{false: '#767577', true: '#2C984A'}}*/}
                                {/*                        thumbColor={isVeg ? '#f4f3f4' : '#f4f3f4'}*/}
                                {/*                />*/}
                                {/*                <Text style={styles.vegText}>I am {!isVeg && "not "}a Vegetarian</Text>*/}
                                {/*            </View>*/}
                                {/*        </View>*/}
                                {/*    )*/}
                                {/*}*/}
                                {(totalCheckedSpecialItemsCount <= 0 || isEditMenu) &&
                                    itemList &&
                                    itemList?.length > 0 &&
                                    itemList.map((list, index) => (
                                        <ItemList key={index} title={list.type} items={list.items}
                                                  disableCheckbox={disableTime} handleItemPress={list.handleItemPress}
                                                  isVeg={isVeg}/>
                                    ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => {

                    // @ts-ignore
                    navigation.navigate('Settings');
                }}
            >
                <FontAwesome5 name="question" size={20} color="white"/>
            </TouchableOpacity>

            {/*<View>*/}
            {/*    {Object.entries(menuLimits != null && menuLimits.extra_payments).map(([count, detail]) => {*/}
            {/*        if (detail.payment > 0 && totalCheckedItemsCount === parseInt(count)) {*/}
            {/*            return (*/}
            {/*                <TouchableOpacity key={count} style={styles.extraPayment}>*/}
            {/*                    <Text style={styles.extraPaymentText}>*/}
            {/*                        If you select {count} meals, {detail.description} is Rs {detail.payment}.*/}
            {/*                    </Text>*/}
            {/*                </TouchableOpacity>*/}
            {/*            );*/}
            {/*        }*/}
            {/*        return null;*/}
            {/*    })}*/}
            {/*</View>*/}

            <BasketButton
                totalCheckedSpecialItems={totalCheckedSpecialItems}
                totalCheckedSpecialItemsCount={totalCheckedSpecialItemsCount}
                totalCheckedItemsCount={totalCheckedItemsCount}
                totalCheckedItems={totalCheckedItems}
                totalSpecialPrice={totalSpecialPrice}
                totalAmount={totalAmount}
                venue={title}
                isLunch={isLunch}
                mealId={mealId}
                isVeg={isVeg}
                lunchRiceItems={lunchRiceItems}
                dinnerRiceItems={dinnerRiceItems}
            />
        </View>
    );
};


export default Menu;

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 10,
        shadowColor: '#5b595b',
    },
    bodyContentContainer: {
        flex: 6,
    },
    scrollViewContainer: {},
    chooseTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 40,
        marginTop: 10,
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
        color: '#000',
    },
    chooseTypeIcon: {
        width: 40,
        height: 30,
        marginBottom: 10,
    },
    itemContainer: {},
    normalMealContainer: {},
    pickUpDishesText: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
        color: '#4D4D4D',
    },
    descriptionContainer: {
        paddingHorizontal: '10%',
        paddingVertical: 10,
        flexDirection: 'row',
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        zIndex: 10,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        borderRadius: 25,
        backgroundColor: '#630A10',
        elevation: 4,
    },
    extraPayment: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        alignItems: 'center',
    },
    extraPaymentText: {
        color: '#FFF',
        fontSize: 14,
    },
});
