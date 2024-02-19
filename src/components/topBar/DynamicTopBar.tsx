import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {SelectedTab} from '../../helpers/enums/enums';
import {useDispatch, useSelector} from 'react-redux';
import {useNotificationContext} from "../../context/NotificationContext";

const iconsData = [
    {
        name: 'home',
        tabName: SelectedTab.MAIN,
        screenName: 'Menu',
    },
    {
        name: 'clock',
        tabName: SelectedTab.PREVIOUS,
        screenName: 'OrdersList',
    },
    {
        name: 'comment',
        tabName: SelectedTab.CHAT,
        screenName: 'Chat',
    },
    {
        name: 'bell',
        tabName: SelectedTab.NOTIFICATION,
        screenName: 'Notification',
    },
    {
        name: 'user',
        tabName: SelectedTab.PROFILE,
        screenName: 'Profile',
    },
];

interface TabIconProps {
    name: string;
    tabName: string;
    screenName: string;
    selectedTab: string;
    onPress?: () => void;
}

function TabIcon({name, tabName, screenName, selectedTab, onPress}: TabIconProps) {
    useSelector((state: any) => state.menu.isEditMenu);
    const dispatch = useDispatch();
    const {fetchNotificationViewState, changeNotificationViewState, notificationViewed} = useNotificationContext();

    const navigation = useNavigation();

    useEffect(() => {
        fetchNotificationViewState();
    }, []);

    const color = selectedTab === tabName ? '#FFC42D' : '#7E1F24';

    const handlePress = () => {
        if (tabName === SelectedTab.MAIN) {
            dispatch({type: 'menu/setIsEditMenuFalseReducer'});
        }
        if (screenName) {
            // @ts-ignore
            navigation.navigate(screenName);
        }
        onPress && onPress();
    };

    return (
        <TouchableOpacity style={styles.icons} onPress={handlePress}>
            {
                screenName === 'Notification' && notificationViewed && (
                    <View style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'red',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Icon name="circle" size={10} color="#fff"/>
                    </View>
                )
            }

            <TouchableOpacity
                onPress={async () => {
                    handlePress();
                }}
            >
                <Icon name={name} size={30} color={color} solid/>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

interface DynamicTopBarProps {
    selectedTab: string;
}

export default function DynamicTopBar({selectedTab}: DynamicTopBarProps) {
    return (
        <View style={styles.topBarContainer}>
            <View style={styles.container}>
                {iconsData.map((iconData, index) => (
                    <TabIcon
                        key={index}
                        name={iconData.name}
                        tabName={iconData.tabName}
                        screenName={iconData.screenName}
                        selectedTab={selectedTab}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    container: {
        marginTop: 2,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
    },
    icons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
