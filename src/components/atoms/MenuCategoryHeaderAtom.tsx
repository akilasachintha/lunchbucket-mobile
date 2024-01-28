import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {THEME} from "@theme/theme";

export default function MenuCategoryHeaderAtom({title}: { title: string }) {
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: THEME.COLORS.primaryBackgroundLight,
        padding: 10,
        paddingLeft: "5%",
    },
});