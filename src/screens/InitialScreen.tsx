import React, {useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import PATHS from '@constants/paths';
import {THEME} from "@theme/theme";
import {NavigationProp, useFocusEffect, useNavigation} from "@react-navigation/native";
import {useAuthContext} from "@context/AuthContext";
import {RootStackParamList} from "@interfaces/navigationTypes";

const InitialScreen = () => {
    const {isLoggedIn, role} = useAuthContext();
    const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
    const slideAnim = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            slideAnim.setValue(0);
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 6000,
                useNativeDriver: false,
            }).start();

            const timeout = setTimeout(() => {
                if (isLoggedIn && role === 'user') {
                    navigate('HomeStack');
                } else {
                    navigate('LoginStack');
                }
            }, 6000);

            return () => {
                clearTimeout(timeout);
                slideAnim.setValue(0);
            };
        }, [isLoggedIn, slideAnim, role, navigate])
    );


    return (
        <View style={styles.safeAreaContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: THEME.COLORS.primaryBackground,
        justifyContent: 'space-between',
    },
    logo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 100,
    },
    imagesContainer: {
        flex: 3,
        position: 'relative',
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
        fontSize: THEME.FONTS.SIZE.sm,
        textAlign: 'center',
        color: THEME.COLORS.primaryRed,
    },
});

export default InitialScreen;
