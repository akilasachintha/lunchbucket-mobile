import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function DeliveryDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Delivery Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>

                        {/* Delivery Locations Section */}
                        <Text style={styles.header}>📍 Delivery Locations</Text>
                        <Text style={styles.infoSub}>
                            We currently offer delivery services to two locations:
                        </Text>
                        <Text style={styles.infoSub}>
                            <Text style={{fontWeight: 'bold'}}>- The Back Gate</Text>
                        </Text>
                        <Text style={styles.infoSub}>
                            <Text style={{fontWeight: 'bold'}}>- The Front Gate.</Text>
                        </Text>
                        <Text style={styles.infoSub}>
                            Your order will be delivered to the specified location and at the selected time.
                        </Text>
                        <Text style={styles.infoSub}>
                            Each packet has a <Text style={{fontWeight: 'bold'}}>unique order code</Text>; please verify
                            it during order collection.
                        </Text>
                        <Text style={{...styles.info, fontWeight: 'bold'}}>
                            Remember, every user has a unique user code; keep it handy when collecting your order.
                        </Text>

                        {/* Lunch Delivery Schedule Section */}
                        <Text style={styles.header}>☀️ Lunch Delivery Schedule</Text>
                        <Text style={styles.info}>
                            <Text style={{fontWeight: 'bold'}}>9 PM - 10 AM:</Text> Place your order, Receive at 11
                            AM or 12.30 PM{'\n'}
                            <Text style={{fontWeight: 'bold'}}>10 AM - 10.30 AM:</Text> Lunch orders will freeze (place
                            just after 10:30 AM){'\n'}
                            <Text style={{fontWeight: 'bold'}}>10.30 AM - 12 PM:</Text> Place your order, Receive at
                            12.30 PM, 1 PM, 1.30 PM or 2 PM{'\n'}
                            <Text style={{fontWeight: 'bold'}}>12 PM - 12.30 PM:</Text> Place your order, Receive at
                            1 PM, 1.30 PM or 2 PM{' '} (based on ordered time, can receive the order within 30
                            minutes){'\n'}
                            <Text style={{fontWeight: 'bold'}}>12.30 PM - 1 PM:</Text> Place your order, Receive at
                            1.30 PM or 2 PM{' '} (based on ordered time, can receive the order within 30 minutes){'\n'}
                            <Text style={{fontWeight: 'bold'}}>1 PM - 1.30 PM:</Text> Place your order, Receive at
                            2 PM{' '} (based on ordered time, can receive the order within 30 minutes)
                        </Text>

                        {/* Authentic Delivery Schedule Section */}
                        <Text style={styles.header}>🌥️ Authentic Delivery Schedule</Text>
                        <Text style={styles.info}>
                            <Text style={{fontWeight: 'bold'}}>1.30 PM - 2.30 PM:</Text> Place your order, Receive at
                            3.30 PM.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>2.30 PM - 3.30pm:</Text> Place your order, Receive at
                            4:30 PM{'\n'}
                            <Text style={{fontWeight: 'bold'}}>3.30 PM - 4.30 PM:</Text> Place your order, Receive at
                            5:30 PM{' '}
                        </Text>

                        {/* Dinner Delivery Schedule Section */}
                        <Text style={styles.header}>🌙 Dinner Delivery Schedule</Text>
                        <Text style={styles.info}>
                            <Text style={{fontWeight: 'bold'}}>1.30 PM - 6 PM:</Text> Place your order, Receive at
                            7:30 PM. or 8.30 PM.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>6 PM - 6.30 PM:</Text> Dinner orders will freeze (place
                            just after 6:30 PM){'\n'}
                            <Text style={{fontWeight: 'bold'}}>6.30 PM - 8 PM:</Text> Place your order, Receive at
                            8.30 PM, 9 PM, or 9.30 PM. (Based on ordered time, can receive the order within 30
                            minutes){'\n'}
                            <Text style={{fontWeight: 'bold'}}>8 PM - 8.30 PM:</Text> Place your order, Receive at
                            9 PM or 9.30 PM. (Based on ordered time, can receive the order within 30 minutes){'\n'}
                            <Text style={{fontWeight: 'bold'}}>8.30 PM - 9 PM:</Text> Place your order, Receive at
                            9.30 PM. (Based on ordered time, can receive the order within 30 minutes){'\n'}
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
    infoSub: {
        fontSize: 16,
        marginTop: 5,
        color: '#4A5568',
        lineHeight: 24,
    },
});
