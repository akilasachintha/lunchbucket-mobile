import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from "../topBar/DynamicTopBar";
import TopHeader from "../topHeader/TopHeader";
import PATHS from "../../helpers/paths/paths";
import PromotionAppliedModal from "../modals/PromotionAppliedModal";
import BottomButton from "../buttons/BottomButton";
import {SelectedTab} from "../../helpers/enums/enums";


type PromotionDetailsProps = {
    route: any;
};

const PromotionDetails: React.FC<PromotionDetailsProps> = ({route}) => {
    const [isVisible, setIsVisible] = useState(false);
    const {promotion} = route.params;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <View style={styles.container}>
                <TopHeader headerText={"Promotion " + promotion.id} backButtonPath="Promotion"/>
                <View style={styles.bodyContainer}>
                    <View style={styles.promotionTitle}>
                        <Text style={styles.promotionTitleText}>{promotion.title}</Text>
                    </View>
                    <View style={styles.promotionBodyContainer}>
                        <View style={styles.promotionImageContainer}>
                            <Image
                                source={PATHS.promotion}
                                style={styles.promotionImage}
                            />
                        </View>
                        {isVisible && <PromotionAppliedModal isVisible={isVisible} setIsVisible={setIsVisible}/>}
                        <View>
                            <Text style={styles.promotionDescription}>{promotion.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.validityText}>{promotion.description}</Text>
                        </View>
                    </View>
                    <BottomButton buttonText="Apply" onPress={() => setIsVisible(true)} isLoading={false}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
    promotionTitle: {
        flex: 1,
        backgroundColor: '#FDF7E3',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    promotionTitleText: {
        fontSize: 18,
        color: '#630A10',
    },
    promotionBodyContainer: {
        flex: 15,
        marginVertical: 30,
        marginHorizontal: 50,
    },
    promotionImageContainer: {
        alignItems: 'center',
    },
    promotionImage: {},
    promotionDescription: {
        fontSize: 18,
        marginVertical: 50,
        textAlign: 'center',
    },
    validityText: {
        fontSize: 16,
        marginVertical: 80,
        color: '#7C7C7C',
        textAlign: 'center',
    },
});

export default PromotionDetails;
