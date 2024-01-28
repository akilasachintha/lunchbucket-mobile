import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {THEME} from '@theme/theme';
import ToastAnimatedContainer from "@components/atoms/ToastAnimatedContainerAtom";
import ToastTextAtom from "@components/atoms/ToastTextAtom";
import {ToastProps} from "@interfaces/toastTypes";

const ToastMolecule: React.FC<ToastProps> = ({type, message}) => {
    const backgroundColor = type === 'warning' ? THEME.COLORS.toastWarning :
        type === 'error' ? THEME.COLORS.toastError :
            type === 'success' ? THEME.COLORS.toastSuccess :
                THEME.COLORS.toastInfo;

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
    }, []);

    return (
        <ToastAnimatedContainer translateY={translateY} backgroundColor={backgroundColor}>
            <ToastTextAtom message={message}/>
        </ToastAnimatedContainer>
    );
};

export default ToastMolecule;
