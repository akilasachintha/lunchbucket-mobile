import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {THEME} from "@theme/theme";

interface LinkButtonProps {
    text: string;
    navigationPath: keyof RootStackParamList;
}

const LinkButtonAtom: React.FC<LinkButtonProps> = ({text, navigationPath}) => {
    const [isPressed, setIsPressed] = useState(false);
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const onPress = () => {
        navigation.navigate(navigationPath);
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.linkButton, isPressed && styles.underline]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
    linkButton: {
        color: THEME.COLORS.primaryRed,
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingBottom: 0,
        paddingVertical: '5%',
        fontSize: 12,
    },
});

export default LinkButtonAtom;
