import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {THEME} from "@theme/theme";

type TopHeaderProps = {
    headerText: string;
    backButtonPath: keyof RootStackParamList;
};

export default function TopHeader({headerText, backButtonPath}: TopHeaderProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleBackButton = () => {
        navigation.navigate(backButtonPath);
    }

    return (
        <View style={styles.bodyTopBar}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={handleBackButton}>
                <Ionicons style={styles.backButtonIcon} name="ios-chevron-back-outline" size={30} color="#fff"/>
            </TouchableOpacity>
            <View style={styles.topTextContainer}>
                <Text style={styles.topText}>{headerText}</Text>
            </View>
            <View style={styles.backButtonContainer}>
                <Text style={styles.backButtonIcon}></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bodyTopBar: {
        backgroundColor: THEME.COLORS.primaryRed,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
    },
    backButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    backButtonIcon: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    topTextContainer: {
        flex: 5,
        paddingVertical: "4%",
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: THEME.FONTS.SIZE.md,
        color: '#fff',
    },
});
