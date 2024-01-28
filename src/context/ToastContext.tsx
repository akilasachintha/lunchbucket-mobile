import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import Constants from "expo-constants/src/Constants";

interface ToastMessage {
    type: 'warning' | 'error' | 'success' | string;
    message: string;
}

const ToastContext = React.createContext<{
    showToast: (message: string, type: string) => void,
    hideToast: () => void
} | undefined>(undefined);

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
    const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

    const showToast = (message: string, type: string) => {
        setToastMessage({type, message});
    };

    const hideToast = () => {
        setToastMessage(null);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                hideToast();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <ToastContext.Provider value={{showToast, hideToast}}>
            {children}
            {toastMessage && <Toast {...toastMessage} />}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast: React.FC<ToastMessage> = ({message, type}) => {
    const backgroundColor = type === 'warning'
        ? 'rgba(255, 230, 98, 1)'
        : type === 'error'
            ? '#fd4949'
            : type === 'success'
                ? '#81c784'
                : '#f06292';

    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 2000);

        return () => clearTimeout(timer);
    }, [translateY]);

    return (
        <Animated.View style={[styles.container, {backgroundColor, transform: [{translateY}]}]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Constants.statusBarHeight * 1.5,
        width: '95%',
        zIndex: 10,
        alignSelf: 'center',
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: Constants.statusBarHeight * 0.4,
    },
});
