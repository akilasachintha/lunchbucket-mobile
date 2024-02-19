import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';

interface ToastContextType {
    showToast: (type: string, message: string) => void;
    hideToast: () => void;
}

interface ToastProviderProps {
    children: React.ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
    const [toastMessage, setToastMessage] = useState<{ type: string; message: string } | null>(null);

    const showToast = (type: string, message: string) => {
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
            {toastMessage ? <Toast {...toastMessage} /> : null}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast: React.FC<{ type: string; message: string }> = ({type, message}) => {
    const backgroundColor =
        type === 'warning'
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
        top: Constants.statusBarHeight || 0,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 9999,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: Constants.statusBarHeight || 0,
        paddingBottom: '4%',
    },
});
