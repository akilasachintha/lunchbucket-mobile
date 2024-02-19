import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNotificationContext} from "../../context/NotificationContext";

interface ConfirmDeleteModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDeleteNotificationModal: React.FC<ConfirmDeleteModalProps> = ({
                                                                               setIsModalVisible,
                                                                           }) => {
    const {
        deleteNotifications,
        fetchNotifications,
        notifications,
        setNotifications,
        isLoading,
        setIsLoading,
    } = useNotificationContext();

    const handleDelete = async () => {
        deleteNotifications();
        setIsModalVisible(false);
        setNotifications([]);
        fetchNotifications();
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <Modal visible={true} transparent>
                <TouchableOpacity
                    style={styles.background}
                >
                    <View style={styles.modal}>
                        <View style={styles.deleteModalTopContainer}>
                            <Text style={styles.deleteModalTopContainerText}>Are you sure you want to delete this
                                Notifications?</Text>
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
                                onPress={handleDelete}
                            >
                                <View style={styles.getStartedButtonConfirmTextContainer}>
                                    {
                                        isLoading ? <Text style={styles.buttonConfirmText}>Loading...</Text> :
                                            <Text style={styles.buttonConfirmText}>Delete</Text>
                                    }
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

export default ConfirmDeleteNotificationModal;
