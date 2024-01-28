import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from "@interfaces/navigationTypes";
import BasketScreen from "@screens/BasketScreen";
import MenuTabNavigator from "@navigation/MenuTabNavigator";
import EditMenuScreen from "@screens/EditMenuScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MenuStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="HomeStackHomeTabMenuStackHome" component={MenuTabNavigator}/>
            <Stack.Screen name="HomeStackHomeTabMenuStackBasket" component={BasketScreen}/>
            <Stack.Screen name="HomeStackHomeTabMenuStackEditMenu" component={EditMenuScreen}/>
        </Stack.Navigator>
    );
}
