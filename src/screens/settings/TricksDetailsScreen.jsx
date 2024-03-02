import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function TricksDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Tricks for Users" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>

                        {/* Maximize Your Points Section */}
                        <Text style={styles.header}>🚀 Maximize Your Points</Text>
                        <Text style={styles.info}>
                            Earn points with every order placed.{'\n'}
                            <Text style={{fontWeight: 'bold'}}>Points double for Lunch:</Text> Place a lunch order
                            before 10 AM and receive double the points.{'\n'}
                            This is a great way to kickstart your day with extra rewards!{'\n\n'}
                            <Text style={{fontWeight: 'bold'}}>Midday Reward:</Text> If you're planning for dinner,
                            consider placing your order before 6 PM to enjoy the double points benefit.{'\n'}
                            It's our way of saying thank you for planning ahead.{'\n\n'}
                            <Text style={{fontWeight: 'bold'}}>Stay Updated:</Text> Regularly check our app or website
                            for special promotions and bonus point opportunities.{'\n\n'}
                            We often roll out exclusive offers that can help you earn more.{'\n\n'}
                            <Text style={{fontWeight: 'bold'}}>
                                Avoid placing an order and deleting it before collection, as it results in double point
                                reduction.
                            </Text>
                        </Text>

                        {/* Threat User Section */}
                        <Text style={styles.header}>⚠️ Threat User</Text>
                        <Text style={styles.info}>
                            If a user consistently misses collecting their orders, they will be marked as a 'threat
                            user' and may face <Text style={{fontStyle: "italic"}}>account restrictions</Text>.{'\n\n'}
                            Threat status will be shown in the user's profile.{'\n\n'}
                            Threat status will be taken into account in confirming or rejecting orders of the particular
                            user.
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
