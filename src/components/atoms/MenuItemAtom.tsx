import {Image, StyleSheet, Text} from "react-native";
import React from "react";

export default function MenuItemAtom({item}: any) {
    return (
        <>
            <Image source={{uri: item.url}} style={styles.image}/>
            <Text style={styles.itemTitle}>{item.type}</Text>
        </>
    );
}

const styles = StyleSheet.create({
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
});