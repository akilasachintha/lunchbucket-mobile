import {Image, Keyboard, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import STRINGS from '../../helpers/strings/strings';
import PATHS from "../../helpers/paths/paths";
import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FormFields from "../../components/form/FormFields";
import LinkButton from "../../components/linkButton/LinkButton";
import {loginService} from "../../services/authService";
import {useToast} from "../../helpers/toast/Toast";
import {log} from "../../helpers/logs/log";
import PushNotificationDeviceChangeModal from "../../components/modals/PushNotificationDeviceChangeModal";
import {ERROR_STATUS} from "../../errorLogs/errorStatus";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Network from 'expo-network';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const fields = [
    {placeholder: STRINGS.email, name: 'email', required: true},
    {placeholder: STRINGS.password, name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true},
];

export default function Login({navigation}) {
    const [deviceToken, setDeviceToken] = useState(false);
    const [isDeviceTokenChanged, setIsDeviceTokenChanged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {email: '', password: ''};
    const [role, setRole] = useState("");
    const {showToast} = useToast();
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

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const networkState = await Network.getNetworkStateAsync();
            if (!networkState.isConnected) {
                showToast('error', 'Please check your internet connection');
                log("error", "Login", "handleSubmit", "Please check your internet connection", "Login.js");
                return;
            }

            const result = await loginService(values.email, values.password);

            const expoPushNotificationToken = await getDataFromLocalStorage('expoPushToken');
            console.log(expoPushNotificationToken);

            if (result && !result.device_token && result.state && expoPushNotificationToken !== undefined) {
                setDeviceToken(true);
            }

            if (result && result.type && result.type === "admin") {
                setRole("admin");
            }

            if (result && result.type && result.type === "user") {
                setRole("user");
            }

            if (result && result.device_token && result.state && result.type && result.type === "user") {
                navigation.navigate('Menu');
                showToast('success', 'You have Successfully Logged In');
                return;
            }

            if (result && !result.device_token && result.state && result.type && result.type === "user" && expoPushNotificationToken === undefined) {
                navigation.navigate('Menu');
                showToast('success', 'You have Successfully Logged In');
                return;
                }


            if (result && result.type && result.type === "admin") {
                navigation.navigate('Admin');
                showToast('success', 'You have Successfully Logged In');
                return;
            }

            if (result === ERROR_STATUS.LOGIN_API_ERROR || result === ERROR_STATUS.LOGIN_NOT_REGISTERED) {
                showToast('error', 'Email or Password is incorrect');
                log("error", "Login", "handleSubmit", "Email or Password is incorrect", "Login.js");
                return;
            }

            if (result === ERROR_STATUS.LOGIN_EMAIL_CONFIRMATION_PENDING) {
                showToast('error', 'Please check your emails and verify your email to Continue.');
                log("error", "Login", "handleSubmit", "Email confirmation pending", "Login.js");
            }

        } catch (error) {
            log("error", "Login", "handleSubmit", error.message, "Login.js");
            showToast('error', error.message);
        } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const getUserRole = async () => {
            const role = await getDataFromLocalStorage('role');
            if (role) {
                setRole(role);
            }
        }

        getUserRole().catch((error) => {
            log("error", "Login", "useEffect | getUserRole", error.message, "Login.js");
        });
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({projectId: '28d5e5c1-53f3-4c9c-abcb-2bdbc0639464'})).data;
            console.warn("Push Token", token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }

    const storeToken = async () => {
        try {
            const response = await registerForPushNotificationsAsync();

            if (response) {
                console.log("response", response);
                await addDataToLocalStorage('expoPushToken', response.toString());
            } else {
                await addDataToLocalStorage('expoPushToken', "");
            }

        } catch (error) {
            log("error", "PushNotifications", "storeToken", error.message, "PushNotifications.js");
        }
    };

    useEffect(() => {
        storeToken().catch((error) => {
            log("error", "PushNotifications", "useEffect | storeToken", error.message, "PushNotifications.js");
        });

    }, []);

    useEffect(() => {
        console.log("deviceToken", deviceToken);
        console.log("role", role);
    }, [deviceToken, role]);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={styles.mainContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                {
                    !isKeyboardVisible && (
                        <View style={styles.headerContainer}>
                            <Image
                                style={styles.headerImage}
                                source={PATHS.signIn}
                            />
                        </View>
                    )
                }
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.welcomeBackText}>Welcome Back</Text>
                    </View>
                    <View>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
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
                                        isLoading={isLoading}
                                        buttonText={"Sign In"}
                                        isValid={isValid}
                                        handleSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}/>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <LinkButton
                            text={STRINGS.forgotPassword}
                            style={styles.linkButton}
                            onPress={() => navigation.navigate('ForgetPassword')}
                        />
                        <Text style={styles.linkButton}>{STRINGS.or}</Text>
                    </View>
                    <View>
                        <LinkButton
                            text={STRINGS.dontHaveAccountText}
                            style={styles.linkButton}
                            onPress={() => navigation.navigate('SignUp')}
                        />
                    </View>
                </View>
            </View>
            {
                role && role === "user" && deviceToken  && (
                    <PushNotificationDeviceChangeModal deviceToken={deviceToken}
                                                       setDeviceToken={setDeviceToken}
                                                       isDeviceTokenChanged={isDeviceTokenChanged}
                                                       setIsDeviceTokenChanged={setIsDeviceTokenChanged}/>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FCF0C8',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcf0c8',
    },
    headerImage: {
        flex: 1,
        marginTop: '5%',
        width: '100%',
    },
    bottomContainer: {
        flex: 1.5,
        paddingHorizontal: '8%',
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
    linkButton: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingBottom: 0,
        paddingVertical: '7%',
        fontSize: 12,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
