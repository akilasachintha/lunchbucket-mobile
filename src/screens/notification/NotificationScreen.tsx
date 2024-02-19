import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import TopHeader from "../../components/topHeader/TopHeader";
import useNotificationHook from "../../services/useNotificationHook";
import ConfirmDeleteNotificationModal from "../../components/modals/ConfirmDeleteNotificationModal";
import {useNotificationContext} from "../../context/NotificationContext";

type Notification = {
    id: number;
    notification: string;
    state: boolean;
    timestamp: string;
}

export default function NotificationScreen() {
    const {notifications, fetchNotifications} = useNotificationHook();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {fetchNotificationViewState, changeNotificationViewState, notificationViewed} = useNotificationContext();

    useEffect(() => {
        fetchNotifications().catch((error) => console.error('Error fetching notifications:', error));
    }, [notificationViewed]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchNotifications();
        } catch (error) {
            console.error('Error refreshing notifications:', error);
        }
        setRefreshing(false);
    }, [fetchNotifications]);

    const handleDeleteAll = () => {
        setIsModalVisible(true);
    };

    const handleNotificationPress = () => {
        changeNotificationViewState();
        fetchNotificationViewState();
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.NOTIFICATION}/>
            <TopHeader headerText="Notifications" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
                    <MaterialIcons name="delete-sweep" size={30} color="#fff"/>
                </TouchableOpacity>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {notifications.map((item: Notification, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={handleNotificationPress}
                            style={styles.notificationBox}>
                            <View style={styles.notificationItem}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons
                                        name={item.state ? 'notifications' : 'notifications-none'}
                                        size={24}
                                        color={item.state ? '#4CAF50' : '#757575'}
                                    />
                                    {item.state && <View style={styles.newNotificationDot}/>}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text
                                        style={[styles.notificationText, !item.state && styles.notificationTextSeen]}>{item.notification}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {isModalVisible && (
                    <ConfirmDeleteNotificationModal
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10,
        padding: 10,
        position: 'relative',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    notificationBox: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
        position: 'relative',
    },
    newNotificationDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#FF5722',
        position: 'absolute',
        right: -6,
        top: -2,
    },
    textContainer: {
        flex: 1,
    },
    notificationText: {
        fontSize: 16,
        color: '#212121',
        fontWeight: 'bold',
    },
    notificationTextSeen: {
        fontWeight: 'normal',
    },
    deleteAllButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#7E1F24',
        borderRadius: 20,
        padding: 10,
        zIndex: 10, // Ensure the button is above all other content
    },
});
