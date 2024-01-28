import MenuMolecule from "@components/molecules/MenuMolecule";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {useMenuContext} from "@context/MenuContext";
import {useEffect} from "react";
import {useLoadingContext} from "@context/LoadingContext";
import useMenu from "@hooks/useMenu";

export default function DinnerScreen() {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const {dinnerMenuItems} = useMenuContext();
    const {handleMenuItems} = useMenu();
    const {hideLoading} = useLoadingContext();

    const menuType = route.params?.menuType ?? 'dinner';
    const isEdit = route.params?.isEdit ?? false;

    useEffect(() => {
        const handleResponse = async () => {
            const response = await handleMenuItems(menuType, isEdit).catch((error) => console.log(error));
            if (response) {
                hideLoading();
            }
        }

        handleResponse().catch((error) => console.log(error));
    }, [menuType, isEdit]);

    return (
        <>
            <MenuMolecule menuType={menuType} isEdit={isEdit} menuItems={dinnerMenuItems}/>
        </>
    )
}