import MenuMolecule from "@components/molecules/MenuMolecule";
import {RouteProp, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";

export default function HomeScreen() {
    const route = useRoute<RouteProp<RootStackParamList>>();

    const menuType = route.params?.menuType ?? 'lunch';
    const isEdit = route.params?.isEdit ?? false;

    return (
        <>
            <MenuMolecule menuType={menuType} isEdit={isEdit}/>
        </>
    )
}