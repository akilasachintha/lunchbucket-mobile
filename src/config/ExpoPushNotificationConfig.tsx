import {useEffect} from 'react';
import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {addDataToLocalStorage} from "@helpers/asyncStorage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({projectId: "28d5e5c1-53f3-4c9c-abcb-2bdbc0639464"})).data;
        console.log("Push Token", token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

export default function ExpoPushNotificationConfig() {
    const storeToken = async () => {
        try {
            const response = await registerForPushNotificationsAsync();
            if (response) {
                await addDataToLocalStorage('deviceToken', response);
            } else {
                await addDataToLocalStorage('deviceToken', '');
            }
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    useEffect(() => {
        storeToken().catch((error) => {
            console.error('Error storing token:', error);
        });

    }, []);

    return null;
}
