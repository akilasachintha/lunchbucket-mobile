import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface BottomButtonProps {
    buttonText: string;
    onPress: () => void;
    isLoading: boolean;
}

const BottomButton: React.FC<BottomButtonProps> = ({buttonText, onPress, isLoading}) => {
    useEffect(() => {
        // Your useEffect logic here
    }, [isLoading]);

    return (
        <View style={styles.viewItemContainer}>
            <TouchableOpacity
                style={styles.viewItemContainerTextContainer}
                onPress={onPress}
                disabled={isLoading}
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
        backgroundColor: 'rgba(255, 230, 98, 1)',
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
