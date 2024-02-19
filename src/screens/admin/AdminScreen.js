import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomButton from "../../components/buttons/BottomButton";
import React, {useState} from "react";
import {logoutService} from "../../services/authService";
import {useNavigation} from "@react-navigation/native";
import {
    getDinnerAdminBackNotifyController,
    getDinnerAdminFrontNotifyController,
    getLunchAdminBackNotifyController,
    getLunchAdminFrontNotifyController
} from "../../controllers/adminController";
import {useToast} from "../../helpers/toast/Toast";
import {addDataToLocalStorage, removeDataFromLocalStorage} from "../../helpers/storage/asyncStorage";

export default function AdminScreen() {
    const navigation = useNavigation();
    const {showToast} = useToast();
    const [loading, setLoading] = useState({
        lunchNotification: false,
        dinnerNotification: false,
        lunchReport: false,
        dinnerReport: false,
    });

    const [responseData, setResponseData] = useState(null);

    const handleLogout = async () => {
        await logoutService();

        await addDataToLocalStorage('token', "");
        await addDataToLocalStorage('@visited', "");
        await addDataToLocalStorage('customerId', "");
        await addDataToLocalStorage('loginStatus', "false");
        await addDataToLocalStorage('expoPushToken', "");
        await addDataToLocalStorage('basket', "");

        await removeDataFromLocalStorage('token');
        await removeDataFromLocalStorage('@visited');
        await removeDataFromLocalStorage('customerId');
        await removeDataFromLocalStorage('loginStatus');
        await removeDataFromLocalStorage('expoPushToken');
        await removeDataFromLocalStorage('basket');

        navigation.navigate('Initial');
    };

    const handleNotification = async (notificationFunction, buttonKey) => {
        setLoading({...loading, [buttonKey]: true});
        const response = await notificationFunction();
        const res = response.message;
        setResponseData(response);
        showToast('success', JSON.stringify(res));
        setLoading({...loading, [buttonKey]: false});
    };

    const renderButton = (text, onPress, buttonKey) => {
        return (
            <TouchableOpacity onPress={() => handleNotification(onPress, buttonKey)} style={styles.button}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>{text}</Text>
                    {loading[buttonKey] && <ActivityIndicator size="small" color="#fff"/>}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex: 1, marginVertical: "12%", marginHorizontal: "8%"}}>
            <Text style={styles.titleText}>Admin Panel</Text>
            <Text style={styles.subtitleText}>Lunch</Text>
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>
            {renderButton("Notify Lunch Front Gate", getLunchAdminFrontNotifyController, "lunchFront")}
            {renderButton("Notify Lunch Back Gate", getLunchAdminBackNotifyController, "lunchBack")}
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>

            <Text style={styles.subtitleText}>Dinner</Text>
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>
            {renderButton("Notify Dinner Front Gate", getDinnerAdminFrontNotifyController, "dinnerFront")}
            {renderButton("Notify Dinner Back Gate", getDinnerAdminBackNotifyController, "dinnerBack")}
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>

            <View style={styles.container}>
                <BottomButton onPress={handleLogout} buttonText="Logout"/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: 'center',
    },
    container: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    button: {
        backgroundColor: '#630A10',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        marginRight: 10,
    },
    subtitleText: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: 'left',
    }
});
