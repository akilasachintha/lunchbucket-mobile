import React, {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface BorderButtonProps {
    text: string;
    onPress: () => void;
    icon?: ReactNode;
}

const BorderButton: React.FC<BorderButtonProps> = ({text, onPress, icon}) => {
    return (
        <TouchableOpacity style={styles.borderButtonContainer} onPress={onPress}>
            {icon}
            <Text style={styles.borderButtonContainerText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    borderButtonContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    borderButtonContainerText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
    },
});

export default BorderButton;
