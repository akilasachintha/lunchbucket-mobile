import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import TopHeader from "../../components/topHeader/TopHeader";
import React, {useCallback, useState} from "react";
import {getOrdersService} from "../../services/ordersService";
import {log} from "../../helpers/logs/log";
import OrderItem from "../../components/orderItem/OrderItem";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import {useFocusEffect} from "@react-navigation/native";
import {isEmptyArray} from "formik";

export default function ListOrdersScreen() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchOrders();
        } catch (error) {
            log('error', 'ListOrdersScreen', 'handleRefresh', error.message, 'ListOrdersScreen.jsx');
        }
        setRefreshing(false);
    }, []);


    const fetchOrders = async () => {
        setLoading(true);
        const response = await getOrdersService();
        setOrders(response);
        setLoading(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchOrders().catch((error) => {
                log("error", "ListOrdersScreen", "useFocusEffect", error.message, "ListOrdersScreen.jsx");
            });
        }, [])
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
                <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
                <View style={styles.bodyContainerLoading}>
                    <ActivityIndicator size="large" color="#630A10" style={styles.activityIndicator}/>
                </View>
            </SafeAreaView>
        );
    }

    if (orders && orders.length === 0) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
                <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <ScrollView contentContainerStyle={styles.noOrdersContainer}>
                        <Text style={styles.noOrdersText}>No orders found.</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
            <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#630A10']}
                        />
                    }
                >
                    {orders && !isEmptyArray(orders) && orders.length > 0 && orders.map((order) => (
                        <OrderItem key={order.id}
                                   mealName={order.order_type === "non_vegi" || order.order_type === "vegi" ? "Choice Meal" : "Special Meal"}
                                   items={order.items}
                                   id={order.id}
                                   orderCode={order.order_code}
                                   updateState={order.update_status}
                                   orderStatus={order.order_status}
                                   price={order.price}
                                   count={order.packet_amount} category={order.category} type={order.type}
                                   orderType={order.order_type}
                                   meal={order.meal}
                                   deliveryTime={order.delivery_time}
                                   deliveryPlace={order.delivery_place}
                                   setLoading={setLoading}
                                   setOrders={setOrders}
                        />
                    ))}
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
        flex: 10,
    },
    bodyContainerLoading: {
        paddingTop: 5,
        flex: 10,
    },
    addAnotherMealContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 40,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    addAnotherMealText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
        fontWeight: 'bold',
    },
    noOrdersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrdersText: {
        fontSize: 14,
        color: '#000',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
