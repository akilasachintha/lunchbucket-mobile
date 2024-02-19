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
                            <Text style={{fontWeight: 'bold'}}>5pm - 7am:</Text> Place your order, Receive at 11am or
                            12:30pm.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>7am - 9am:</Text> Place your order, Receive at
                            12:30pm.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>9am - 11am:</Text> Place your order, Receive at 2pm{' '}
                            <Text style={{fontStyle: 'italic'}}>(Extra 10% will be charged).</Text>
                        </Text>

                        {/* Dinner Delivery Schedule Section */}
                        <Text style={styles.header}>🌙 Dinner Delivery Schedule</Text>
                        <Text style={styles.info}>
                            <Text style={{fontWeight: 'bold'}}>11am - 3pm:</Text> Place your order, Receive at 7:30pm or
                            8:30pm.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>3pm - 4pm:</Text> Place your order, Receive at
                            7:30pm.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>4pm - 5pm:</Text> Place your order, Receive at
                            8:30pm{' '}
                            <Text style={{fontStyle: 'italic'}}>(Extra 10% will be charged).</Text>
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
