import React from 'react';
import {Animated, StyleSheet, ViewStyle} from 'react-native';

interface AnimatedContainerAtomProps {
    children: React.ReactNode;
    translateY: Animated.Value;
    backgroundColor: string;
}

const ToastAnimatedContainerAtom: React.FC<AnimatedContainerAtomProps> = ({children, translateY, backgroundColor}) => {
    return (
        <Animated.View style={[styles.container, {backgroundColor, transform: [{translateY}]}]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 9999,
    } as ViewStyle,
});

export default ToastAnimatedContainerAtom;