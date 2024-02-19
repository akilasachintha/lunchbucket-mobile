import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useToast} from "../../helpers/toast/Toast";
import {validatePushNotificationTokenChange} from "../../controllers/authController";
import {log} from "../../helpers/logs/log";

interface PushNotificationDeviceChangeModalProps {
    deviceToken: boolean;
    setDeviceToken: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeviceTokenChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const PushNotificationDeviceChangeModal: React.FC<PushNotificationDeviceChangeModalProps> = ({
                                                                                                 deviceToken,
                                                                                                 setDeviceToken,
                                                                                                 setIsDeviceTokenChanged,
                                                                                             }) => {
    const navigation = useNavigation();
    const {showToast} = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCancel = () => {
        setIsDeviceTokenChanged(false);
        setDeviceToken(false);

        // @ts-ignore
        navigation.navigate('Menu');
        showToast('success', 'You have Successfully Logged In');
    }

    const handleChange = async () => {
        try {
            setIsLoading(true);
            const result: any = await validatePushNotificationTokenChange();
            console.log("result", result);

            if (result && result.state) {
                setIsDeviceTokenChanged(true);
                setDeviceToken(false);

                // @ts-ignore
                navigation.navigate('Menu');
                showToast('success', 'You have Successfully Logged In');
            }

        } catch (e: any) {
            log("error", "PushNotificationDeviceChangeModal", "handleChange", e.message, "PushNotificationDeviceChangeModal.js");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Modal visible={deviceToken} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={() => setDeviceToken(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.deleteModalTopContainer}>
                            <Text style={styles.deleteModalTopContainerText}>We recognized a new device</Text>
                            <Text style={styles.defaultDeviceText}>Do you wish to change the default device
                                for receiving the notifications ?</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={handleCancel}
                            >
                                <View style={styles.getStartedButtonTextContainer}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonConfirmContainer}>
                            <TouchableOpacity onPress={handleChange}>
                                {!isLoading ? (
                                    <View style={styles.getStartedButtonConfirmTextContainer}>
                                        <Text style={styles.buttonConfirmText}>Change</Text>
                                    </View>
                                ) : (
                                    <View style={styles.getStartedButtonConfirmTextContainer}>
                                        <ActivityIndicator size={25} color="#fff"/>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    deleteModalTopContainer: {
        width: '80%',
    },
    deleteModalTopContainerText: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        textAlign: 'center',
        color: '#630A10',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    getStartedButtonTextContainer: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#630A10',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: "center",
        fontSize: 12,
    },
    buttonConfirmContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    getStartedButtonConfirmTextContainer: {
        paddingHorizontal: 60,
        marginVertical: "10%",
        backgroundColor: '#630A10',
        borderRadius: 30,
        paddingVertical: 10,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#630A10',
    },
    buttonConfirmText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",
        fontSize: 12,
    },
    defaultDeviceText: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        textAlign: 'center',
        color: '#630A10',
        fontSize: 14,
    }
});

export default PushNotificationDeviceChangeModal;
