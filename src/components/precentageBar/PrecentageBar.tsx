import React from 'react';
import {StyleSheet, Text, View} from "react-native";

interface PercentageBarProps {
    percentage: number;
}

const PercentageBar: React.FC<PercentageBarProps> = ({percentage}) => {
    const greenContainerFlex = percentage;
    const darkContainerFlex = 100 - percentage;

    return (
        <View style={styles.percentageContainer}>
            <View style={[styles.percentageGreenContainer, {flex: greenContainerFlex}]}/>
            <View style={[styles.percentageDarkContainer, {flex: darkContainerFlex}]}/>
            <View style={[styles.textContainer, {width: `${percentage}%`}]}>
                <Text style={styles.text}>{percentage} %</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    percentageContainer: {
        flex: 1,
        height: 8,
        flexDirection: 'row',
        marginRight: "15%",
    },
    percentageGreenContainer: {
        backgroundColor: 'rgba(44, 152, 74, 0.82)',
        borderRadius: 20,
    },
    percentageDarkContainer: {
        backgroundColor: '#EAEAEA',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        position: 'absolute',
        color: '#fff',
        fontSize: 8,
        justifyContent: 'center',
        textAlign: 'center',
    },
    textContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PercentageBar;
