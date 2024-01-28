import MenuMolecule from "@components/molecules/MenuMolecule";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {useMenuContext} from "@context/MenuContext";
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import PATHS from "@constants/paths";
import {THEME} from "@theme/theme";
import {useEffect} from "react";
import useMenu from "@hooks/useMenu";
import {useLoadingContext} from "@context/LoadingContext";

export default function LunchScreen() {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const {lunchMenuItems} = useMenuContext();
    const {handleMenuItems} = useMenu();
    const {hideLoading} = useLoadingContext();

    const menuType = route.params?.menuType ?? 'lunch';
    const isEdit = route.params?.isEdit ?? false;

    useEffect(() => {
        console.log('menuType', menuType);
        const handleResponse = async () => {
            const response = await handleMenuItems(menuType, isEdit).catch((error) => console.log(error));
            console.log('response', response);
            if (response) {
                hideLoading();
            }
        }

        handleResponse().catch((error) => console.log(error));
    }, []);

    return (
        <>
            <TouchableOpacity
                style={[styles.chooseTypeItemLeft]}
            >
                <Image source={PATHS.foodCup}
                       style={styles.chooseTypeIcon}/>
                <Text style={[styles.chooseTypeText]}>Today's
                    Menu</Text>
            </TouchableOpacity>
            <MenuMolecule menuType={menuType} isEdit={isEdit} menuItems={lunchMenuItems}/>
        </>
    )
}

const styles = StyleSheet.create({
    chooseTypeItemLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: "2%",
        paddingHorizontal: "2%",
        backgroundColor: THEME.COLORS.white,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    selectedMenu: {
        backgroundColor: THEME.COLORS.primaryRed,
    },
    chooseTypeIcon: {
        width: 30,
        height: 30,
        marginRight: "5%",
    },
    chooseTypeText: {
        fontSize: THEME.FONTS.SIZE.md,
        fontWeight: 'bold',
        color: THEME.COLORS.primaryRed,
    },
    selectedMenuText: {
        color: '#fff',
    },
});