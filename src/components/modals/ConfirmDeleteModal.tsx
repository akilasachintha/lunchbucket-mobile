import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deleteOrderService, getOrdersService} from "../../services/ordersService";
import {log} from "../../helpers/logs/log";
import {removeMealFromBasketService} from "../../services/menuService";

interface ConfirmDeleteModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    loading?: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setOrders: React.Dispatch<React.SetStateAction<any[]>>;
    useBasket?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
                                                                   isModalVisible,
                                                                   setIsModalVisible,
                                                                   id,
                                                                   setLoading,
                                                                   setOrders,
                                                                   useBasket
                                                               }) => {
    const [isPressed, setIsPressed] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        const response = await getOrdersService();
        setOrders(response);
        setLoading(false);
    };

    const handleDeleteOrder = async (id: string) => {
        try {
            if (!useBasket) {
                setIsPressed(true);
                await deleteOrderService(id);
                setIsPressed(false);
                await fetchOrders();
            } else {
                setLoading(true);
                await removeMealFromBasketService(id);
                setLoading(false);
                setIsModalVisible(false);
            }
        } catch (error: any) {
            log('error', 'ConfirmDeleteModal', 'handleDeleteOrder', error.message, 'ConfirmDeleteModal.tsx');
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={isModalVisible} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={() => setIsModalVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.deleteModalTopContainer}>
                            <Text style={styles.deleteModalTopContainerText}>Are you sure you want to delete this
                                Meal?</Text>
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
                                onPress={() => handleDeleteOrder(id)}
                            >
                                <View style={styles.getStartedButtonConfirmTextContainer}>
                                    {isPressed ? (
                                        <ActivityIndicator size={24} color="#fff"/>
                                    ) : (
                                        <Text style={styles.buttonConfirmText}>Delete</Text>
                                    )}
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
