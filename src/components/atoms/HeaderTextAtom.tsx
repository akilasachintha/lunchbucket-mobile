import React from 'react';
import {StyleSheet, Text} from "react-native";
import {THEME} from "@theme/theme";

type HeaderTextAtomProps = {
    text: string;
}

export default function HeaderTextAtom({text}: HeaderTextAtomProps) {
    return (
        <Text style={styles.headerText}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    headerText: {
        color: THEME.COLORS.primaryRed,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10%',
    },
});