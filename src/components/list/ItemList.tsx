import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import PercentageBar from "../precentageBar/PrecentageBar";
import toTitleCase from "../../helpers/strings/stringFormatter";

interface ListItemProps {
    itemName: string;
    url: string;
    checked: boolean;
    handleItemPress: () => void;
    percentage: number | null;
    disabled: boolean;
}

const ListItem: React.FC<ListItemProps> = ({itemName, url, checked, handleItemPress, percentage, disabled}) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.listItemContainer,
                    percentage == null && {
                        borderBottomWidth: 2,
                        borderBottomColor: 'rgba(197,194,194,0.5)',
                    },
                ]}
                onPress={handleItemPress}
                disabled={disabled}
            >
                <View style={styles.listItemLeftContainer}>
                    <Image style={styles.listItemImage} source={{uri: url}}/>
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.listItemText}>{toTitleCase(itemName)}</Text>
                        {percentage != null && percentage > 0 && (
                            <PercentageBar percentage={percentage}/>
                        )}
                    </View>
                </View>
                {!checked && !disabled && (
                    <View style={styles.listItemRightContainer}>
                        <MaterialIcons
                            name="radio-button-unchecked"
                            size={30}
                            color="rgba(57, 57, 57, 0.5)"
                        />
                    </View>
                )}
                {checked && !disabled && (
                    <View style={styles.listItemRightContainer}>
                        <AntDesign name="checkcircle" size={24} color="rgba(44, 152, 74, 1)"/>
                    </View>
                )}
                {disabled && (
                    <View style={styles.listItemRightContainer}/>
                )}
            </TouchableOpacity>
        </View>
    );
};

interface ItemListProps {
    title: string;
    items: {
        type: string;
        checked: boolean;
        url: string;
        percentage: number | null;
        vegetarian: boolean;
        foodType: string;
    }[];
    handleItemPress: (index: number) => void;
    disableCheckbox: boolean;
    isVeg: boolean;
}

const ItemList: React.FC<ItemListProps> = ({title, items, handleItemPress, disableCheckbox, isVeg}) => {
    const filteredItemObjects: { index: number; item: ItemListProps["items"][0] }[] = [];

    console.log(items);

    items.forEach((item, index) => {
        if (isVeg && !(item.vegetarian || item.foodType === "Rice")) {
            return;
        }

        filteredItemObjects.push({index, item});
    });

    return (
        <View>
            {filteredItemObjects && filteredItemObjects.length > 0 && (
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{title}</Text>
                </View>
            )}
            <View>
                {filteredItemObjects && filteredItemObjects.map(({index, item}) => (
                    <View key={index}>
                        <ListItem
                            itemName={item.type}
                            checked={item.checked}
                            url={item.url}
                            handleItemPress={() => handleItemPress(index)}
                            percentage={item.percentage}
                            disabled={disableCheckbox}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemTextContainer: {
        paddingHorizontal: 40,
        backgroundColor: 'rgba(255, 245, 0, 0.5)',
        paddingVertical: "3%",
        marginVertical: 10,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(134,36,43)',
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    listItemText: {
        paddingVertical: 18,
        fontSize: 18,
    },
    listItemLeftContainer: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: "3%",
    },
    listItemRightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    listItemImage: {
        width: 90,
        height: 60,
        borderRadius: 10,
        marginRight: 20,
    },
    listItemTextContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    }
});

export default ItemList;
