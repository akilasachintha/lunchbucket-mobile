import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function NotificationDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Notification Details"
                       backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>

                        {/* Delivery Update Section */}
                        <Text style={styles.header}>🚚 Delivery Update</Text>
                        <Text style={styles.info}>
                            Stay informed about your meal's journey.
                            Receive a notification when your packet arrives at the designated delivery location.
                        </Text>
                        <Text style={styles.info}>
                            Your delicious meal is currently being packaged and be ready to indulge once you receive the
                            arrival notification.
                        </Text>

                        {/* Order Confirmation Alert Section */}
                        <Text style={styles.header}>🔔 Order Confirmation Alert</Text>
                        <Text style={styles.info}>
                            Upon confirmation by the admin, you will receive a notification containing your relevant
                            order ID.{'\n\n'}
                            In any unfortunate event that the admin cannot proceed with your order, or your threat
                            status is high,
                            you will be promptly notified of the order rejection.{'\n\n'}
                            Your early notification is our priority.
                        </Text>

                        {/* Special Meal Alerts Section */}
                        <Text style={styles.header}>👨‍🍳 Special Meal Alerts</Text>
                        <Text style={styles.info}>
                            Don't miss out on our new offerings!
                            Whenever we introduce a new special meal, you'll be the first to know with our try-out
                            notification.
                        </Text>

                        {/* Normal Meal Alerts Section */}
                        <Text style={styles.header}>🍴 Choice Meal Alerts</Text>
                        <Text style={styles.info}>
                            Be in the know about our regular meal updates!
                            Receive timely notifications whenever we refresh our standard lunch or dinner menu.
                        </Text>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    bodyContainer: {
        flex: 10,
        paddingHorizontal: 20,
    },
    scrollViewStyle: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 30,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
        color: '#1A202C',
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E0',
        paddingBottom: 5,
    },
    info: {
        fontSize: 16,
        marginTop: 10,
        color: '#4A5568',
        lineHeight: 24,
        marginBottom: 20,
    },
});
