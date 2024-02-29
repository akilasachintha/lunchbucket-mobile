import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useErrorContext} from '../context/ErrorContext';
import Icon from '@expo/vector-icons/AntDesign';
import PATHS from "../helpers/paths/paths";

const ErrorScreen: React.FC = () => {
    const {isError, errorMessage, hideError} = useErrorContext();

    if (!isError) return null;

    const handleClose = () => {
        hideError();
        console.log('Error closed');
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.loading}>
                <TouchableOpacity onPress={handleClose}
                                  style={styles.closeButton}>
                    <Icon name="close" size={24} color="#630A10"/>
                </TouchableOpacity>
                <ImageBackground source={PATHS.error}
                                 imageStyle={styles.image}
                                 style={styles.imageContainer}>
                    <Text style={styles.title}>Oops!</Text>
                    <Text style={styles.text}>{errorMessage}</Text>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    loading: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '70%',
        height: '30%',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        opacity: 0.5,
    },
    text: {
        marginTop: 10,
        color: '#630A10',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    title: {
        color: '#630A10',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default ErrorScreen;
