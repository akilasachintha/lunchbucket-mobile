import React from 'react';
import useAppReady from '@hooks/useAppReady';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigator from '@navigation/StackNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExpoPushNotificationConfig from '@config/ExpoPushNotificationConfig';
import {THEME} from "@theme/theme";
import LoadingScreen from "@screens/LoadingScreen";
import {LoadingProvider} from "@context/LoadingContext";
import {ToastProvider} from "@context/ToastContext";
import {AuthProvider} from "@context/AuthContext";
import {AxiosProvider} from "@context/AxiosContext";
import {BasketProvider} from "@context/BasketContext";
import {MenuProvider} from "@context/MenuContext";

const navTheme = DefaultTheme;
navTheme.colors.background = THEME.COLORS.white;

const App: React.FC = () => {
    const {isAppReady, onLayoutRootView} = useAppReady();

    if (!isAppReady) {
        return null;
    }

    return (
        <SafeAreaView onLayout={onLayoutRootView} style={{flex: 1}}>
            <ExpoPushNotificationConfig/>
            <ToastProvider>
                <LoadingProvider>
                    <AuthProvider>
                        <AxiosProvider>
                            <NavigationContainer theme={navTheme}>
                               <MenuProvider>
                                   <BasketProvider>
                                       <StackNavigator/>
                                   </BasketProvider>
                               </MenuProvider>
                                <LoadingScreen/>
                            </NavigationContainer>
                        </AxiosProvider>
                    </AuthProvider>
                </LoadingProvider>
            </ToastProvider>
        </SafeAreaView>
    );
};

export default App;
