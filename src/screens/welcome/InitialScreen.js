import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import PATHS from '../../helpers/paths/paths';
import {StatusBar} from 'expo-status-bar';
import {addDataToLocalStorage, getDataFromLocalStorage} from '../../helpers/storage/asyncStorage';
import {validateTokenController} from "../../controllers/authController";

const InitialScreen = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const checkIfVisited = async () => {
        try {

            const validate = await validateTokenController();
            if (validate === "error") {
                await addDataToLocalStorage('token', "");
                await addDataToLocalStorage('@visited', "");
                await addDataToLocalStorage('customerId', "");
                await addDataToLocalStorage('loginStatus', "false");
                await addDataToLocalStorage('expoPushToken', "");
                await addDataToLocalStorage('basket', "");
            }

            let visited = await getDataFromLocalStorage('@visited');
            if (!visited) visited = 'false';

            let loginStatus = await getDataFromLocalStorage('loginStatus');
            if (!loginStatus) loginStatus = 'false';

            const role = await getDataFromLocalStorage('role');

            if (isFocused) {
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                }).start();

                if (visited === 'true') {
                    setTimeout(() => {
                        slideAnim.setValue(0);

                        if (loginStatus.toString() === 'true' && role && role.toString() === "user") {
                            navigation.navigate('Menu');
                        } else if (loginStatus.toString() === 'true' && role && role.toString() === "admin") {
                            navigation.navigate('Admin');
                        } else if (loginStatus.toString() === 'false') {
                            navigation.navigate('Login');
                        }
                    }, 7000);
                } else if (visited === 'false') {
                    setTimeout(() => {
                        slideAnim.setValue(0);

                        navigation.navigate('Welcome');
                    }, 5000);
                }
            }
        } catch (error) {
            await addDataToLocalStorage('@visited', 'false');
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            checkIfVisited().catch(console.error);
        }, [])
    );

    useEffect(() => {
        checkIfVisited().catch(console.error);
    }, []);


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style=""/>
            <View style={styles.titleContainer}>
                <Image source={PATHS.logo} style={styles.logo}/>
            </View>
            <View style={styles.imagesContainer}>
                <View style={styles.phoneImageContainer}>
                    <Image source={PATHS.phone} style={styles.phoneImageStyles}/>
                </View>
                <View style={styles.cupImageContainer}>
                    <Image source={PATHS.cup} style={styles.cupImageStyles}/>
                </View>
                <View style={styles.animationContainer}>
                    <Animated.Image
                        style={{
                            zIndex: 2,
                            marginTop: 150,
                            transform: [
                                {
                                    translateX: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-60, 350],
                                    }),
                                },
                            ],
                        }}
                        source={PATHS.bike}
                    />
                </View>
            </View>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>
                    Meal Supplier You Can Trust.
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FCF0C8',
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 100,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7E1F24',
    },
    imagesContainer: {
        position: 'relative',
        flex: 3,
        justifyContent: 'center',
        marginTop: 50,
    },
    animationContainer: {
        position: 'absolute',
    },
    cupImageContainer: {
        position: 'absolute',
    },
    cupImageStyles: {
        zIndex: 1,
        top: 40,
        left: 50,
    },
    phoneImageStyles: {
        zIndex: 0,
        left: 200,
        top: 12,
    },
    phoneImageContainer: {
        position: 'absolute',
    },
    bottomTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 60,
        marginBottom: 60,
        flex: 1,
    },
    bottomText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#630A10',
    },
});

export default InitialScreen;
