import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import TopHeader from "../../components/topHeader/TopHeader";
import React from "react";

export default function FeedbackDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Feedback Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={false}
                >
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
});
