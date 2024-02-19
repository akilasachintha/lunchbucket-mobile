import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function PaymentDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Payment Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>💳 Payment Methods</Text>
                        <Text style={styles.info}>- Cash on Delivery: Payments are to be made in cash upon receiving
                            your
                            order.</Text>
                        <Text style={styles.info}>- Online Payments: Secure online payment options are available for
                            your
                            convenience.</Text>

                        <Text style={styles.header}>🔍 Price Confirmation</Text>
                        <Text style={styles.info}>The relevant price for your order can be viewed under the 'Order
                            History' section before delivery.</Text>
                    </View>
                </ScrollView>
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
        flex: 10
    },
    scrollViewStyle: {
        marginHorizontal: 20,
    },
    contentContainer: {
        marginVertical: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    info: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
        marginBottom: 10,
    },
});
