import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface EyeIconProps {
    onPress: () => void;
    visible: boolean;
    error?: boolean | undefined | string | false;
    onBlur?: () => void;
}

const EyeIcon: React.FC<EyeIconProps> = ({onPress, visible, error, onBlur}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={visible ? 'eye' : 'eye-off'}
                    size={24}
                    color={error && onBlur ? 'red' : '#630A10'}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    );
};

interface FormFieldProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    value: string;
    error?: boolean | undefined | string | false;
    secureTextEntry?: boolean;
    isEyeEnabled?: boolean;
    isCorrect?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 placeholder,
                                                 onChangeText,
                                                 onBlur,
                                                 value,
                                                 error,
                                                 secureTextEntry,
                                                 isEyeEnabled,
                                                 isCorrect,
                                             }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const inputStyles = [
        styles.inputContainer,
        error && onBlur ? styles.inputFieldError : undefined,
        !(error && onBlur) && isCorrect ? styles.inputFieldCorrect : undefined,
    ];

    const handleClearInput = () => {
        setInputValue('');
    };

    return (
        <View style={styles.container}>
            <View style={inputStyles}>
                <TextInput
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    style={styles.inputField}
                    placeholder={placeholder}
                    onChangeText={(text) => {
                        setInputValue(text);
                        onChangeText(text);
                    }}
                    onBlur={onBlur}
                    value={inputValue}
                />
                {secureTextEntry && isEyeEnabled && (
                    <EyeIcon
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        visible={isPasswordVisible}
                        error={error}
                        onBlur={onBlur}
                    />
                )}
                {error && onBlur ? (
                    <Ionicons onPress={handleClearInput} name="close-circle" size={24} color="red" style={styles.icon}/>
                ) : isCorrect ? (
                    <Ionicons name="checkmark-circle" size={24} color="green" style={styles.icon}/>
                ) : null}
            </View>
            {error && onBlur ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: '7%',
        paddingVertical: '2%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#630A10',
    },
    inputField: {
        color: '#630A10',
        flex: 1,
        fontSize: 14,
    },
    inputFieldError: {
        marginBottom: 0,
        borderColor: 'red',
    },
    inputFieldCorrect: {
        marginBottom: '5%',
    },
    error: {
        marginVertical: 4,
        color: 'red',
        fontSize: 12,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: '2%',
    },
});

export default FormField;
