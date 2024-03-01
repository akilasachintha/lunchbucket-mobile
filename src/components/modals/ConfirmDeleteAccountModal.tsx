import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {log} from "../../helpers/logs/log";
import {auth2API, lunchBucketAPI} from "../../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {logoutService} from "../../services/authService";
import {useNavigation} from "@react-navigation/native";

interface ConfirmDeleteModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
                                                                   isModalVisible,
                                                                   setIsModalVisible,
                                                               }) => {
    const [isPressed] = useState(false);
    const navigation = useNavigation();

    const handleDeleteOrder = async () => {
        try {
            const token = await getDataFromLocalStorage('token');

            const response = await lunchBucketAPI.delete('customer', {
                headers: {
                    token: token,
                }
            });

            console.log(response.data);
            await logoutService();

            setIsModalVisible(false);
            // @ts-ignore
            navigation.navigate('Initial');

        } catch (error: any) {
            log('error', 'ConfirmDeleteModal', 'handleDeleteOrder', error.message, 'ConfirmDeleteModal.tsx');
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={true} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={() => setIsModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.deleteModalTopContainer}>
                            <Text style={styles.deleteModalTopContainerText}>Are you sure you want to delete your
                                account?</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => setIsModalVisible(false)}
                            >
                                <View style={styles.getStartedButtonTextContainer}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonConfirmContainer}>
                            <TouchableOpacity
                                onPress={handleDeleteOrder}
                            >
                                <View style={styles.getStartedButtonConfirmTextContainer}>
                                    <Text style={styles.buttonConfirmText}>Delete</Text>
                                </View>
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
        fontSize: 14,
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
    }
});

export default ConfirmDeleteModal;
