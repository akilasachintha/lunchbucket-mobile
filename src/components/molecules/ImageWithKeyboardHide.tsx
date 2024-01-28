import {ImageBackground, Keyboard, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";

type ImageWithKeyboardHideProps = {
    source: any;
}

export default function ImageWithKeyboardHide({source}: ImageWithKeyboardHideProps) {
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

    return (
        <>
            {!isKeyboardVisible && (
                <ImageBackground
                    source={source}
                    style={styles.headerImage}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
});
