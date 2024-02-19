import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

interface PromotionAppliedModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromotionAppliedModal: React.FC<PromotionAppliedModalProps> = ({isVisible, setIsVisible}) => {
    return (
        <View style={styles.container}>
            <Modal visible={isVisible} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={() => setIsVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalIconContainer}>
                            <AntDesign name="checkcircle" size={80} color="rgba(56, 207, 98, 1)"/>
                        </View>
                        <View style={styles.modalTopTextContainer}>
                            <Text style={styles.modalTopText}>Promotion Applied</Text>
                        </View>
                        <View style={styles.modalBottomTextContainer}>
                            <Text style={styles.modalBottomText}>20% off for orders above Rs. 800.00</Text>
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
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingVertical: 35,
        alignItems: 'center',
    },
    modalIconContainer: {},
    modalTopTextContainer: {
        marginTop: 20,
    },
    modalTopText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'rgba(68, 68, 68, 1)',
    },
    modalBottomTextContainer: {
        marginTop: 30,
    },
    modalBottomText: {
        color: 'rgba(68, 68, 68, 1)',
        fontSize: 14,
    },
});

export default PromotionAppliedModal;
