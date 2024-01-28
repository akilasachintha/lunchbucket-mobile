import {FC, useCallback} from 'react';
import {Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import LinkButtonAtom from "@components/atoms/LinkButtonAtom";
import ImageWithKeyboardHide from "@components/molecules/ImageWithKeyboardHide";
import HeaderTextAtom from "@components/atoms/HeaderTextAtom";
import useLoginForm from "@hooks/useLoginForm";
import {THEME} from "@theme/theme";
import PATHS from "@constants/paths";

const LoginScreen: FC = () => {
    const {formState, handleChange, handleFocus, handleBlur, handleSubmit, isInvalid, isValid} = useLoginForm();

    const getInputWrapperStyle = useCallback((field: string) => {
        if (isInvalid(field)) {
            return [styles.inputWrapper, styles.inputError];
        } else if (isValid(field)) {
            return [styles.inputWrapper, styles.inputValid];
        } else {
            return styles.inputWrapper;
        }
    }, [isInvalid, isValid]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ImageWithKeyboardHide source={PATHS.signIn}/>
            <View style={styles.bottomContainer}>
                <HeaderTextAtom text="Welcome Back"/>
                {Object.keys(formState).map((field) => (
                    <View key={field} style={styles.inputContainer}>
                        {formState[field].isFocused && (
                            <Text
                                style={[
                                    styles.label,
                                    isInvalid(field) ? styles.labelError : isValid(field) ? styles.labelValid : null,
                                    formState[field].isFocused ? styles.labelFocused : null,
                                ]}
                            >
                                {formState[field].inputProps?.placeholder}
                            </Text>
                        )}
                        <View style={getInputWrapperStyle(field)}>
                            <TextInput
                                style={styles.input}
                                value={formState[field].value}
                                onChangeText={(text) => handleChange(field, text)}
                                onFocus={() => handleFocus(field)}
                                onBlur={() => handleBlur(field)}
                                placeholder={formState[field].isFocused ? '' : formState[field].inputProps?.placeholder ?? ''}
                                {...formState[field].inputProps}
                            />
                            {isInvalid(field) && <Text style={styles.errorIcon}>✕</Text>}
                            {isValid(field) && <Text style={styles.validIcon}>✓</Text>}
                        </View>
                        {formState[field].error && <Text style={styles.error}>{formState[field].error}</Text>}
                    </View>
                ))}
                <Button title="Submit" onPress={handleSubmit}/>
                <LinkButtonAtom
                    text="Forget Password?"
                    navigationPath={'HomeStack'}
                />
                <Text style={styles.orButton}>or</Text>
                <LinkButtonAtom
                    text="Don't have an account? Sign Up"
                    navigationPath={'HomeStack'}
                />
            </View>
            <StatusBar style="auto" backgroundColor={THEME.COLORS.primaryBackground}/>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: THEME.COLORS.primaryBackground,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    inputContainer: {
        marginBottom: 20,
        position: 'relative',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: THEME.COLORS.primaryRed,
        borderRadius: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    inputValid: {
        borderColor: 'green',
    },
    errorIcon: {
        color: 'red',
        paddingHorizontal: 10,
    },
    validIcon: {
        color: 'green',
        paddingHorizontal: 10,
    },
    label: {
        position: 'absolute',
        left: 10,
        top: 12,
        color: THEME.COLORS.primaryRed,
        fontSize: THEME.FONTS.SIZE.sm,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    labelError: {
        color: 'red',
    },
    labelValid: {
        color: 'green',
    },
    labelFocused: {
        top: -10,
        fontSize: THEME.FONTS.SIZE.sm,
    },
    error: {
        fontSize: THEME.FONTS.SIZE.xs,
        color: 'red',
        marginTop: 5,
    },
    orButton: {
        color: THEME.COLORS.primaryRed,
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingBottom: 0,
        paddingVertical: '5%',
        fontSize: THEME.FONTS.SIZE.sm,
    },
});

export default LoginScreen;
