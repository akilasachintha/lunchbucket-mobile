import {Text, TouchableOpacity, View} from "react-native";
import TopHeader from "@components/molecules/TopHeader";
import React from "react";
import useAuth from "@hooks/useAuth";

export default function ProfileScreen() {
    const {handleLogout} = useAuth();

    return (
        <>
            <TopHeader headerText="Profile and Settings" backButtonPath="HomeStackHomeTabMenuStackHome"/>
            <View>
                <Text>ProfileScreen</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}