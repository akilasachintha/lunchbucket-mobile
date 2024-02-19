import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import PATHS from "../../helpers/paths/paths";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";

interface ClaimPointsModalProps {
    points: number;
    isPointsApplied: boolean;
    setIsPointsApplied: React.Dispatch<React.SetStateAction<boolean>>;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    setPointsCopy: React.Dispatch<React.SetStateAction<number>>;
    totalAmount: number;
}

const ClaimPointsModal: React.FC<ClaimPointsModalProps> = ({
                                                               points,
                                                               isPointsApplied,
                                                               setIsPointsApplied,
                                                               setPoints,
                                                               setPointsCopy,
                                                               totalAmount
                                                           }) => {

    const handlePressCash = async () => {
        try {
            let basketItems: any = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            basketItems = JSON.parse(basketItems);
            basketItems.isCash = true;

            if (points >= totalAmount) {
                setPoints(points - totalAmount);
                setPointsCopy(totalAmount);
            } else {
                setPointsCopy(points);
                setPoints(0);
            }

            await addDataToLocalStorage('basket', JSON.stringify(basketItems));
            setIsPointsApplied(false);

        } catch (error: any) {
            log("error", "ClaimPointsModal", "handlePressCash", error.message, "ClaimPointsModal.js");
        }
    }

    const handlePressNo = async () => {
        try {
            let basketItems: any = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            basketItems = JSON.parse(basketItems);
            basketItems.isCash = false;

            await addDataToLocalStorage('basket', JSON.stringify(basketItems));
            setIsPointsApplied(false);

        } catch (error: any) {
            log("error", "ClaimPointsModal", "handlePressCash", error.message, "ClaimPointsModal.js");
        }
    }

    const handlePressCancel = async () => {
        try {
            setIsPointsApplied(false);
        } catch (error: any) {
            log("error", "ClaimPointsModal", "handlePressCash", error.message, "ClaimPointsModal.js");
        }
    }


    return (
        <View style={styles.container}>
            <Modal visible={isPointsApplied} transparent>
                <TouchableOpacity
                    style={styles.background}
                >
                    <View style={styles.modal}>
                        <View style={styles.cashPointTopContainer}>
                            <Text style={styles.cashPointTopTitleText}>Cash Your Points</Text>
                        </View>
                        <Image source={PATHS.cashPoints} style={styles.cashPointImage}></Image>
                        <View style={styles.cashPointTopContainer}>
                            <Text style={styles.cashPointTopTitleText}>{points} Points</Text>
                        </View>
                        {
                            points && points >= 100 && totalAmount > 0 ? (
                                <View style={styles.buttonMainContainer}>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={handlePressNo}>
                                            <View style={styles.getStartedButtonTextContainer}>
                                                <Text style={styles.buttonText}>No Thanks</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.buttonConfirmContainer}>
                                        <TouchableOpacity onPress={handlePressCash}>
                                            <View style={styles.getStartedButtonConfirmTextContainer}>
                                                <Text style={styles.buttonConfirmText}>Cash</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.insufficientPointsTextContainer}>
                                    <Text style={styles.insufficientPointsText}>
                                        You need at least 100 points to cash them.
                                    </Text>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.crossIcon} onPress={handlePressCancel}>
                                            <Entypo name="cross" size={30} color="#630A10"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cashPointTopContainer: {},
    cashPointTopTitleText: {
        fontWeight: 'bold',
        marginVertical: "3%",
        fontSize: 18,
        textAlign: 'center',
        color: '#630A10',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cashPointImage: {
        marginVertical: "1%",
    },
    getStartedButtonTextContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 3,
        marginRight: "5%",
        borderColor: '#630A10',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: "center",
        fontSize: 12,
    },
    buttonConfirmContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    getStartedButtonConfirmTextContainer: {
        paddingHorizontal: 30,
        marginVertical: "5%",
        backgroundColor: '#630A10',
        borderRadius: 30,
        paddingVertical: 10,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#630A10',
    },
    buttonConfirmText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",
        fontSize: 12,
    },
    defaultDeviceText: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        textAlign: 'center',
        color: '#630A10',
        fontSize: 14,
    },
    buttonMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    insufficientPointsTextContainer: {
        justifyContent: 'center',
    },
    insufficientPointsText: {
        textAlign: 'center',
        color: '#630A10',
        fontSize: 14,
        paddingHorizontal: "5%",
    },
    crossIcon: {
        marginTop: "5%",
    }
});

export default ClaimPointsModal;
