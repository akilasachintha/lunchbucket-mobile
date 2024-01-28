import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import {THEME} from "@theme/theme";
import {ToastTextAtomProps} from "@interfaces/toastTypes";

const ToastTextAtom: React.FC<ToastTextAtomProps> = ({message}) => {
    return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: THEME.FONTS.SIZE.sm,
        textAlign: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: '4%',
        marginTop: 20,
    },
});

export default ToastTextAtom;
