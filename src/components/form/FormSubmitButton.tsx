import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface FormSubmitButtonProps {
    handleSubmit: () => void;
    buttonText: string;
    isValid: boolean;
    isLoading: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({handleSubmit, buttonText, isValid, isLoading}) => {
    const inputStyles = [
        styles.signInText,
        !isValid ? styles.signInTextError : undefined,
    ];

    return (
        <View style={styles.signInButtonContainer}>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                {!isLoading && (
                    <Text style={inputStyles}>
                        {buttonText}
                    </Text>
                )}
                {isLoading && (
                    <View style={styles.signInTextError}>
                        <ActivityIndicator style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}
                                           size={25} color="#630A10"/>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
    signInButtonContainer: {
        paddingTop: '2%',
    },
    signInText: {
        width: "100%",
        flexDirection: 'row',
        textAlign: 'center',
        fontWeight: "bold",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        backgroundColor: '#FFE662',
        borderRadius: 30,
        color: '#630A10',
    },
    signInTextError: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        backgroundColor: '#fae579',
        borderRadius: 30,
    },
});
