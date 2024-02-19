import React, {useState} from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';

interface LinkButtonProps {
    text: string;
    onPress: () => void;
    style?: TextStyle;
}

const LinkButton: React.FC<LinkButtonProps> = ({text, onPress, style}) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[style, isPressed && styles.underline]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
});

export default LinkButton;
