import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {THEME} from "@theme/theme";
import {LoadingTextAtomProps} from "@interfaces/loadingTypes";

const LoadingTextAtom: React.FC<LoadingTextAtomProps> = ({text}) => {
    return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        marginTop: 10,
        color: THEME.COLORS.black,
        fontSize: 16,
    },
});

export default LoadingTextAtom;
