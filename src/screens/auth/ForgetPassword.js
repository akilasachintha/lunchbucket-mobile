import React, {useEffect, useState} from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import STRINGS from '../../helpers/strings/strings';
import PATHS from '../../helpers/paths/paths';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import FormFields from '../../components/form/FormFields';
import {forgetPasswordService} from '../../services/authService';
import {useToast} from '../../helpers/toast/Toast';
import {log} from '../../helpers/logs/log';
import {StatusBar} from 'expo-status-bar';
import LinkButton from '../../components/linkButton/LinkButton';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const fields = [
    { placeholder: STRINGS.email, name: 'email', required: true },
    { placeholder: 'New Password', name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true },
    {
        placeholder: 'Confirm New Password',
        name: 'confirmPassword',
        required: true,
        secureTextEntry: true,
        isEyeEnabled: true,
    },
];

export default function ForgetPassword({ navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setToastMessage] = useState(null);
    const { showToast } = useToast();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values, actions) => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const result = await forgetPasswordService(values.email, values.password);
            if (result === 'success') {
                showToast('success', 'Please Check your Emails within 5 minutes and verify it.');
                actions.resetForm();
                navigation.navigate('Login');
            } else {
                showToast('error', 'Password Change Error');
                log('error', 'Login', 'handleSubmit', 'Password Change Error.', 'ForgetPassword.js');
            }
        } catch (error) {
            setToastMessage('Login Failed');
            log('error', 'Login', 'handleSubmit', error.message, 'ForgetPassword.js');
        } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.mainContainer}>
                {
                    !isKeyboardVisible && (
                        <View style={styles.headerContainer}>
                            <Image style={styles.headerImage} source={PATHS.forget}/>
                        </View>
                    )
                }
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.welcomeBackText}>Forget Password</Text>
                    </View>
                    <View>
                        <Formik initialValues={initialValues} validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                                <View>
                                    <View>
                                        <FormFields
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            fields={fields}
                                        />
                                    </View>

                                    <FormSubmitButton
                                        buttonText={'Change Password'}
                                        isValid={isValid}
                                        handleSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}
                                        isLoading={isLoading}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <LinkButton
                            text="Cancel"
                            style={styles.linkButton}
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#7E1F24',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    headerImage: {
        flex: 1,
        marginTop: 15,
        width: '100%',
    },
    bottomContainer: {
        flex: 2,
        paddingHorizontal: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    welcomeBackText: {
        color: '#7E1F24',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '10%',
    },
    dontHaveAccountText: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingBottom: 0,
        paddingVertical: 15,
        marginBottom: 5,
        fontSize: 12,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    linkButton: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingBottom: 0,
        paddingVertical: '7%',
        fontSize: 12,
    },
});
