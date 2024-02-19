import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CheckoutItemProps {
    mealName: string;
    count: number;
    price: number;
    isSpecial: boolean;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({mealName, count, price, isSpecial}) => {
    return (
        <View>
            <TouchableOpacity style={[styles.checkoutItemContainer, styles.elevation, styles.shadowProp]}>
                <View style={styles.checkoutItemNameContainer}>
                    <Text style={styles.checkoutItemNameText}>{isSpecial ? mealName : 'Choice Meal'}</Text>
                </View>
                <TouchableOpacity style={styles.circleCountTextContainer}>
                    <Text style={styles.countText}> {count} </Text>
                </TouchableOpacity>
                <View style={styles.priceTextContainer}>
                    <Text style={styles.priceText}> Rs {price} </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

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
    checkoutItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 1)',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    checkoutItemNameContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    checkoutItemNameText: {
        fontSize: 18,
    },
    priceTextContainer: {
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    priceText: {
        fontSize: 18,
    },
    countText: {
        fontSize: 18,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    circleCountTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CheckoutItem;
