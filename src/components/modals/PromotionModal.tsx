import React from 'react';
import {ActivityIndicator, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import usePromotionHook from "../../services/usePromotionHook";

interface PromotionProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromotionModal: React.FC<PromotionProps> = ({isModalVisible, setIsModalVisible}) => {
    const {fetchPromotion, promotionUrl, hidePromotion} = usePromotionHook();

    React.useEffect(() => {
        fetchPromotion().catch((error) => console.error('Error fetching update status:', error));
    }, []);

    if (!promotionUrl) {
        return null;
    }

    return (
        <Modal visible={isModalVisible} transparent>
            <View style={styles.container}>
                <TouchableOpacity style={styles.background}>
                    {!promotionUrl ? <ActivityIndicator/> : (
                        <ImageBackground
                            style={styles.imageContainer}
                            source={{uri: promotionUrl}}
                            resizeMode="contain"
                        >
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <FontAwesome name="times-circle" size={30} color="white"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hidePromoContainer} onPress={hidePromotion}>
                                <Text style={styles.hidePromoText}>HIDE PROMO</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'relative',
        top: "-38%",
        right: -160,
    },
    hidePromoContainer: {
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 20,
        right: -110,
        bottom: -110,
        borderRadius: 5,
        backgroundColor: 'white',

    },
    hidePromoText: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default PromotionModal;
