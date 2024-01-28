import {Text, View} from "react-native";
import TopHeader from "@components/molecules/TopHeader";
import React from "react";

export default function OrderListScreen() {
    return (
        <>
            <TopHeader headerText="Orders" backButtonPath="HomeStackHomeTabMenuStackHome"/>
            <View>
                <Text>OrderListScreen</Text>
            </View>
        </>
    )
}