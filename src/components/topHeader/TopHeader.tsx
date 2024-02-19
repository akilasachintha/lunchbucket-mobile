import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsEditMenuFalseReducer} from '../../redux/menuSlice';

interface TopHeaderProps {
    headerText: string;
    backButtonPath: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({headerText, backButtonPath}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleBackButton = () => {
        if (backButtonPath === 'Menu') {
            dispatch(setIsEditMenuFalseReducer());
        }

        // @ts-ignore
        navigation.navigate(backButtonPath);
    };

    return (
        <View style={styles.bodyTopBar}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={handleBackButton}>
                <Ionicons name="chevron-back-outline" size={30} color="#fff"/>
            </TouchableOpacity>
            <View style={styles.topTextContainer}>
                <Text style={styles.topText}>{headerText}</Text>
            </View>
            <View style={styles.backButtonContainer}>
                <Text style={styles.backButtonIcon}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bodyTopBar: {
        backgroundColor: '#7E1F24',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
    },
    backButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    backButtonIcon: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    topTextContainer: {
        flex: 5,
        paddingVertical: 20,
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
});

export default TopHeader;
