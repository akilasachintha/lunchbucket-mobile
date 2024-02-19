import React from 'react';
import {ActivityIndicator, ImageBackground, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'; // Import FontAwesome icon
import useAppUpdateHook from "../../services/useAppUpdateHook";

interface UpdateAppModalProps {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAppModal: React.FC<UpdateAppModalProps> = ({isModalVisible, setIsModalVisible}) => {
    const {updateUrl, fetchUpdateStatus} = useAppUpdateHook();

    React.useEffect(() => {
        fetchUpdateStatus().catch((error) => console.error('Error fetching update status:', error));
    }, []);

    if (!updateUrl) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Modal visible={isModalVisible} transparent>
                <TouchableOpacity style={styles.background}>
                    {!updateUrl ? <ActivityIndicator/> : (
                        <ImageBackground
                            style={styles.imageContainer}
                            source={{uri: updateUrl}}
                            resizeMode="contain"
                        >
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <FontAwesome name="times-circle" size={24} color="white"/>
                            </TouchableOpacity>
                        </ImageBackground>
                    )}
                </TouchableOpacity>
            </Modal>
        </View>
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
});

export default UpdateAppModal;
