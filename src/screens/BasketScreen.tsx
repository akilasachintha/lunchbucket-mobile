import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useBasket} from "@context/BasketContext";
import TopHeader from "@components/molecules/TopHeader";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";

const BasketScreen: React.FC = () => {
    const {basket} = useBasket();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <>
            <TopHeader headerText="Basket" backButtonPath="HomeStackHomeTabMenuStackHome"/>
            <View style={styles.container}>
                {basket.length === 0 ? (
                    <Text style={styles.emptyText}>Your basket is empty.</Text>
                ) : (
                    <FlatList
                        data={basket}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(menu) => menu.id}
                        renderItem={({item: menu}) => (
                            <View style={styles.menuContainer}>
                                <Text style={styles.menuTitle}>Menu ID: {menu.id}</Text>
                                <Text>Total Price: ${menu.totalPrice.toFixed(2)}</Text>
                                <Text>Menu Type: {menu.menuType}</Text>
                                <Button title={'Edit'}
                                        onPress={() => {
                                            navigation.navigate('HomeStackHomeTabMenuStackEditMenu', {
                                                menuId: menu.id,
                                                menuType: menu.menuType,
                                                isEdit: true,
                                            });
                                        }}/>
                                <FlatList
                                    data={menu.items}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({item}) => (
                                        <View style={styles.itemContainer}>
                                            <Text>{item.type}</Text>
                                            <Text>${item.price}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        )}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    menuContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
});

export default BasketScreen;
