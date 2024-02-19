import TopHeader from "../../components/topHeader/TopHeader";
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";

export default function LeaveSuggestion() {
    const sendIcon = <MaterialCommunityIcons name="send" size={40} color='#630A10'/>

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.CHAT}/>
            <View style={styles.container}>
                <TopHeader headerText="Leave a Suggestion" backButtonPath="Chat"/>
                <View style={styles.bodyContainer}>
                </View>
                <View style={styles.chatBox}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        placeholder={"Type your message here"}
                        style={styles.chatBoxTextInput}
                    />
                    <TouchableOpacity style={styles.sendIcon}>
                        {sendIcon}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 10,
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 9,
        justifyContent: 'center',
    },
    borderButtonContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    borderButtonContainerText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
    },
    chatBox: {
        flex: 1,
        marginVertical: 20,
        marginLeft: 20,
        flexDirection: 'row',
    },
    chatBoxTextInput: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#a1a1a1',
        padding: 10,
        paddingLeft: 20,
        fontSize: 14,
        flex: 6,
    },
    sendIcon: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
});
