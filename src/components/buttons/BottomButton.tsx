import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface BottomButtonProps {
    buttonText: string;
    onPress: () => void;
    isLoading: boolean;
    isButtonDisabled: boolean;
}

const BottomButton: React.FC<BottomButtonProps> = ({buttonText, onPress, isLoading, isButtonDisabled}) => {
    return (
        <View style={styles.viewItemContainer}>
            <TouchableOpacity
                style={styles.viewItemContainerTextContainer}
                onPress={onPress}
                disabled={isLoading || isButtonDisabled}
            >
                {isLoading ? (
                    <ActivityIndicator size={28} color="#630A10"/>
                ) : (
                    <Text style={styles.viewItemContainerText}>{buttonText}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewItemContainer: {
        backgroundColor: '#ffd564',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    viewItemContainerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    viewItemContainerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});

export default BottomButton;
