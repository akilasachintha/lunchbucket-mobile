import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import Constants from 'expo-constants';

interface TextAtomProps {
    message: string;
}

const ToastText: React.FC<TextAtomProps> = ({message}) => {
    return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: '4%',
    } as TextStyle,
});

export default ToastText;
