import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

interface TextInputFieldProps {
    label: string;
    placeholder?: string;
    placeholderTextColor?: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    touched?: boolean;
    error?: string;
    editable?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
                                                           label,
                                                           placeholder,
                                                           placeholderTextColor,
                                                           value,
                                                           onChangeText,
                                                           onBlur,
                                                           touched,
                                                           error,
                                                           editable,
                                                       }) => {
    return (
        <View>
            <View style={styles.inputFieldContainer}>
                <View style={styles.inputLabel}>
                    <Text style={styles.inputLabelText}>{label}</Text>
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        style={styles.inputFieldText}
                        value={value}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                        editable={editable}
                        scrollEnabled={true}
                    />
                </View>
            </View>
            <View style={styles.errorContainer}>
                {touched && error && (
                    <Text style={{color: 'red'}}>{error}</Text>
                )}
            </View>
        </View>
    );
};

export default TextInputField;

const styles = StyleSheet.create({
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "8%",
        marginVertical: 10,
    },
    inputLabel: {
        flex: 1,
    },
    inputLabelText: {
        fontSize: 18,
        color: '#630A10',
    },
    inputField: {
        flex: 2,
        borderWidth: 2,
        borderColor: '#630A10',
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    inputFieldText: {
        fontSize: 18,
        color: '#630A10',
    },
    errorContainer: {
        marginHorizontal: "8%",
        alignItems: 'flex-end',
    },
});
