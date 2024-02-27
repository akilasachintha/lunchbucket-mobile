import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import React from "react";
import {store} from "./src/redux/store";
import {Provider} from 'react-redux'
import {StyleSheet, Text, View} from "react-native";
import * as Notifications from "expo-notifications";
import {NotificationProvider} from "./src/context/NotificationContext";
import {MenuProvider} from "./src/context/MenuContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    return (
        <Provider store={store}>
            <ToastProvider>
                <NotificationProvider>
                    <MenuProvider>
                    <NavigationContainer>
                        <StackNavigator/>
                    </NavigationContainer>
                    </MenuProvider>
                </NotificationProvider>
            </ToastProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    environmentTextContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        backgroundColor: 'rgba(189,43,43,0.71)',
        padding: 5,
        borderRadius: 5,
        zIndex: 10,
    },
    environmentText: {
        color: 'white',
        fontSize: 7,
    },
});

