import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import TopHeader from "../components/topHeader/TopHeader";
import PromotionCard from "../components/promotions/PromotionCard";
import DynamicTopBar from "../components/topBar/DynamicTopBar";
import {SelectedTab} from "../helpers/enums/enums";

const promotions = [
    {
        id: 1,
        title: '20% Off on all products',
        description: 'Get 20% off on all products for a limited time',
        price: '$50',
        details: 'Use code SAVE20 at checkout to redeem this offer'
    },
    {
        id: 2,
        title: 'Free Shipping on orders over $100',
        description: 'Get free shipping on orders over $100',
        price: '$100',
        details: 'No code required. Free shipping will be automatically applied at checkout'
    },
    {
        id: 3,
        title: 'Buy one get one free',
        description: 'Buy one product and get another product for free',
        price: '$75',
        details: 'Add two products to your cart and the discount will be applied at checkout'
    }
];
export default function PromotionsScreen() {
    const renderItem = ({item}) => {
        return <PromotionCard promotion={item}/>;
    };

    const halfLength = Math.ceil(promotions.length / 2);
    const leftData = promotions.slice(0, halfLength);
    const rightData = promotions.slice(halfLength);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
            <TopHeader headerText="Promotions" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <View style={styles.cardContainer}>
                    <FlatList
                        data={leftData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        style={styles.column}
                    />
                    <FlatList
                        data={rightData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        style={styles.column}
                    />
                </View>
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
        paddingTop: 20,
        flex: 10,
    },
    cardContainer: {
        flexDirection: 'row',
    },
});
