import Swiper from 'react-native-swiper';
import React from 'react';
import {StyleSheet} from 'react-native';
import STRINGS from "../../helpers/strings/strings";
import PATHS from "../../helpers/paths/paths";
import WelcomeSlide from "../../components/welcomeSlide/WelcomeSlide";
import {addDataToLocalStorage} from '../../helpers/storage/asyncStorage';
import {useFocusEffect} from '@react-navigation/native';

const slides = [
    {
        imagePath: PATHS.welcome1,
        headerText: STRINGS.welcome1Text,
        contentText: STRINGS.welcome1content,
    },
    {
        imagePath: PATHS.welcome2,
        headerText: STRINGS.welcome2Text,
        contentText: STRINGS.welcome2Content,
    },
    {
        imagePath: PATHS.welcome3,
        headerText: STRINGS.welcome3Text,
        contentText: STRINGS.welcome3Content,
        buttonText: "Get Started",
        onPress: async (navigation) => {
            await addDataToLocalStorage('@visited', 'true');
            navigation.replace('Login');
        },
    },
];

const WelcomeScreen = ({ navigation }) => {
    const [, setRefreshed] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setRefreshed(prevState => !prevState);
        }, [setRefreshed])
    );

    return (
        <Swiper
            loop={false}
            showsPagination={true}
            index={0}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
        >
            {slides && slides.map((slide, index) => (
                <WelcomeSlide
                    key={index}
                    imagePath={slide.imagePath}
                    headerText={slide.headerText}
                    contentText={slide.contentText}
                    buttonText={slide.buttonText}
                    onPress={slide.onPress ? () => slide.onPress(navigation) : null}
                />
            ))}
        </Swiper>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: '#630A10',
        width: 8,
        height: 8,
        borderRadius: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDotStyle: {
        backgroundColor: '#630A10',
        width: 12,
        height: 12,
        borderRadius: 12,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
});
