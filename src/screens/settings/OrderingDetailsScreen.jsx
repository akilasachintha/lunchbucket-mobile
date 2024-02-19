import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function OrderingDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Ordering Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>

                        {/* Ordering Timing Section */}
                        <Text style={styles.header}>⏳ Ordering Timing</Text>
                        <Text style={styles.info}>
                            Place lunch orders between{' '}
                            <Text style={{fontWeight: 'bold'}}>5 pm</Text> and{' '}
                            <Text style={{fontWeight: 'bold'}}>11 am</Text>, subject to availability.
                            Dinner orders are accepted from{' '}
                            <Text style={{fontWeight: 'bold'}}>11 am</Text> to{' '}
                            <Text style={{fontWeight: 'bold'}}>5 pm</Text>, based on availability.
                        </Text>

                        {/* Meal Selection Section */}
                        <Text style={styles.header}>📝 Meal Selection</Text>
                        <Text style={styles.info}>
                            Explore our daily menu.
                            Choose either a regular meal or opt for a special.
                            For a main meal, select four food items and include one rice dish.
                        </Text>

                        {/* Adding to Basket Section */}
                        <Text style={styles.header}>🧺 Adding to Basket</Text>
                        <Text style={styles.info}>
                            Add your chosen meal items to the basket.
                            Update the basket to order multiple meals in one go.
                            Proceed to order.
                        </Text>

                        {/* Points Redemption Section */}
                        <Text style={styles.header}>💰 Points Redemption</Text>
                        <Text style={styles.info}>
                            Cash your points for money if it is more than{' '}
                            <Text style={{fontWeight: 'bold'}}>100 points</Text>.
                        </Text>

                        {/* Payment Section */}
                        <Text style={styles.header}>💳 Payment</Text>
                        <View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoSub}>
                                    Cash on Delivery: Payments are to be made in cash upon receiving your order.
                                </Text>
                            </View>
                            <View style={styles.infoSub}>
                                <Text style={styles.infoSub}>
                                    Price Confirmation: The relevant price for your order can be viewed under the 'Your
                                    Orders'
                                    section before delivery.
                                    Include payable amount, delivery time and location, packet code.
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.info}>
                            <Text style={{fontStyle: 'italic'}}>Online Payment option will be available soon.</Text>
                        </Text>

                        {/* Order Details Section */}
                        <Text style={styles.header}>⏰ Order Details </Text>
                        <Text style={styles.info}>
                            Check 'Your Orders' for: Meal type,
                            payable amount, delivery time and location, packet code.
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
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
});
