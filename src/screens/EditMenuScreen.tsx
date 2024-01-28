import MenuMolecule from "@components/molecules/MenuMolecule";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {useMenuContext} from "@context/MenuContext";
import {useEffect} from "react";
import useMenu from "@hooks/useMenu";
import {useLoadingContext} from "@context/LoadingContext";

export default function EditMenuScreen() {
    const route = useRoute<RouteProp<RootStackParamList>>();
    const {editMenuItems} = useMenuContext();
    const {handleEditMenuItems} = useMenu();
    const {hideLoading} = useLoadingContext();

    const menuId = route.params?.menuId;
    const menuType = route.params?.menuType;
    const isEdit = route.params?.isEdit;

    if (!menuId || !menuType || !isEdit) {
        return null;
    }

    useEffect(() => {
        console.log('menuId', menuId);
        console.log('menuType', menuType);
        console.log('isEdit', isEdit);
        console.log('editMenuItems', editMenuItems);

        const handleResponse = async () => {
            if (isEdit && menuId) {
                const response = await handleEditMenuItems(menuId, menuType).catch((error) => console.log(error));
                if (response) {
                    hideLoading();
                }
            }
        }

        handleResponse().catch((error) => console.log(error));

    }, []);

    return (
        <>
            <MenuMolecule menuType={menuType} isEdit={isEdit} menuItems={editMenuItems}/>
        </>
    )
}