import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Entypo, MaterialIcons} from '@expo/vector-icons';
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import toTitleCase from "../../helpers/strings/stringFormatter";

interface OrderItemProps {
    mealName: string;
    count: number;
    orderType: string;
    items: string[];
    category: string;
    type: string;
    price: number;
    meal: string;
    orderCode: string;
    updateState: boolean;
    orderStatus: boolean;
    deliveryTime: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setOrders: React.Dispatch<React.SetStateAction<any>>;
    deliveryPlace: string;
    id: string;
}

const OrderItem: React.FC<OrderItemProps> = ({
                                                 mealName,
                                                 count,
                                                 orderType,
                                                 items,
                                                 category,
                                                 type,
                                                 price,
                                                 meal,
                                                 orderCode,
                                                 updateState,
                                                 orderStatus,
                                                 deliveryTime,
                                                 setLoading,
                                                 setOrders,
                                                 deliveryPlace,
                                                 id
                                             }) => {
    const [onClicked, setOnClicked] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const bucketItemContainerStyle = {
        ...styles.bucketItemContainer,
        backgroundColor: orderStatus ? styles.bucketItemContainer.backgroundColor : '#c8c9c9',
    };

    return (
        <View>
            {isModalVisible && (
                <ConfirmDeleteModal
                    id={id}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    setLoading={setLoading}
                    setOrders={setOrders}
                    loading={false}
                />
            )}
            {onClicked && (
                <TouchableOpacity
                    style={[bucketItemContainerStyle, styles.elevation, styles.shadowProp]}
                    onPress={() => setOnClicked(false)}
                >
                    <View style={styles.itemTopContainer}>
                        <View style={styles.typeContainer}>
                            <View>
                                {
                                    orderType === 'special' && (
                                        <Text style={styles.orderTypeText}>Special</Text>)
                                }
                                {
                                    orderType === 'non_vegi' && (
                                        <Text style={styles.orderTypeText}>Non-Veg</Text>)
                                }
                                {
                                    orderType === 'vegi' && (
                                        <Text style={styles.orderTypeText}>Veg</Text>)
                                }
                            </View>
                            <View>
                                {
                                    meal === 'Lunch' && (
                                        <Text style={styles.mealText}>Lunch</Text>)
                                }
                                {
                                    meal === 'Dinner' && (
                                        <Text style={styles.mealText}>Dinner</Text>)
                                }
                            </View>
                        </View>
                        <Text style={styles.itemTopPriceText}>Rs. {price}</Text>
                    </View>
                    <View style={styles.listItemMainContainer}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                            {orderType === 'special' ? (
                                <Text style={styles.bucketItemNameSubText}>{type}</Text>
                            ) : (
                                <Text style={styles.bucketItemNameSubText}>{items && items[0]}</Text>
                            )}
                        </View>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count} {count === 1 ? "Pack" : "Packs"}</Text>
                        </View>
                    </View>
                    <View style={styles.orderCodeContainer}>
                        <Text style={styles.orderCodeText}>Order Code: {orderCode} </Text>
                        {orderStatus ? (
                            <Text style={styles.orderApprovedText}>Delivery at {deliveryTime} </Text>
                        ) : (
                            <Text style={styles.orderRejectedText}> Rejected </Text>
                        )}
                        <Text style={styles.deliveryPlaceText}>{toTitleCase(deliveryPlace)} </Text>
                    </View>
                </TouchableOpacity>
            )}
            {!onClicked && (
                <View>
                    <TouchableOpacity style={styles.bucketItemExpandContainer} onPress={() => setOnClicked(true)}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                        </View>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count} {count === 1 ? "Pack" : "Packs"}</Text>
                        </View>
                        {updateState && (
                            <View style={styles.editButtonContainer}>
                                <TouchableOpacity onPress={() => setIsModalVisible(true)}
                                                  style={styles.deleteButtonTextContainer}>
                                    <MaterialIcons name="delete-forever" size={24} color="black"/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                    <View style={[styles.itemListContainer, styles.elevation, styles.shadowProp]}>
                        {orderType === 'special' && (
                            <View>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerText}>{category} | {type}</Text>
                                </View>
                            </View>
                        )}
                        {!orderStatus && (
                            <View style={styles.listItemContainerRejected}>
                                <Entypo name="emoji-sad" size={25} color="rgba(189,43,43,0.71)"/>
                                <Text style={styles.listItemContainerRejectedText}>
                                    Your order is rejected. Please chat with Admin to clarify more
                                    details.</Text>
                            </View>)}
                        {orderStatus && items && items.map((item, index) => (
                            <View style={styles.listItemContainer} key={index}>
                                <Text style={styles.listItemContainerText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 10,
        shadowColor: '#5b595b',
    },
    bucketItemContainer: {
        backgroundColor: 'rgb(255,239,196)',
        marginHorizontal: "5%",
        marginVertical: "2%",
        paddingVertical: "2%",
        paddingHorizontal: "5%",
        borderRadius: 10,
    },
    bucketItemNameContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10,
    },
    bucketItemNameText: {
        fontSize: 16,
    },
    plusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    countTextContainer: {
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontSize: 16,
    },
    minusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    editButtonContainer: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    editButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    deleteButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    bucketItemExpandContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center',
    },
    listItemContainer: {
        marginHorizontal: 40,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderColor: '#fff',
        borderBottomColor: 'rgba(197, 194, 194, 0.5)',
        borderWidth: 2,
    },
    listItemContainerText: {
        fontSize: 18,
    },
    itemListContainer: {
        marginBottom: 20,
    },
    bucketItemNameSubText: {
        fontSize: 12,
    },
    listItemMainContainer: {
        flexDirection: 'row',
    },
    itemTopContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTopPriceText: {
        fontSize: 12,
    },
    orderTypeText: {
        backgroundColor: 'rgb(250,229,121)',
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        borderRadius: 10,
        fontSize: 10,
    },
    typeContainer: {
        flexDirection: 'row',
    },
    mealText: {
        marginHorizontal: 5,
        backgroundColor: 'rgba(169,220,57,0.63)',
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        borderRadius: 10,
        fontSize: 10,
    },
    orderCodeContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    orderCodeText: {
        fontSize: 12,
    },
    orderApprovedText: {
        padding: "1%",
        paddingLeft: "2%",
        borderRadius: 5,
        backgroundColor: "rgba(166,234,160,0.52)",
        fontSize: 10,
    },
    deliveryPlaceText: {
        padding: "1%",
        paddingLeft: "2%",
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.52)",
        fontSize: 10,
    },
    orderRejectedText: {
        padding: "1%",
        borderRadius: 10,
        backgroundColor: "rgba(189,43,43,0.71)",
        fontSize: 10,
    },
    listItemContainerRejected: {
        flexDirection: "row",
        marginHorizontal: 40,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgba(196,186,186,0.71)",
    },
    listItemContainerRejectedText: {
        fontSize: 14,
        marginLeft: 10,
        color: '#630A10',
    }
});

export default OrderItem;
