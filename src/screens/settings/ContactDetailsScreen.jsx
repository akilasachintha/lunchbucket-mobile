import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function ContactDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Contact Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>

                        <Text style={styles.header}>💬 Chat with the Owner</Text>
                        <Text style={styles.info}>
                            Feel free to communicate directly with our owner for any inquiries.{'\n'}
                            If your query is about a recent order, kindly mention the order code.{'\n'}
                            We welcome your opinions and suggestions about our meals and services.
                        </Text>

                        <Text style={styles.header}>☎️ Call our Hotline</Text>
                        <Text style={styles.info}>
                            For immediate assistance, please call our hotline at{' '}
                            <Text style={{fontWeight: 'bold'}}>0777 169 791</Text>. We are here to help you with any
                            urgent matters.
                        </Text>

                        <Text style={styles.header}>✉️ Email Us</Text>
                        <Text style={styles.info}>
                            For more detailed queries, feel free to email us at{' '}
                            <Text style={{fontWeight: 'bold'}}>lunchbucketofficial@gmail.com</Text>. We strive to
                            respond to all emails within 24 hours.
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
