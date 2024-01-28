import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LunchScreen from "@screens/LunchScreen";
import {RootStackParamList} from "@interfaces/navigationTypes";
import LoginScreen from "@screens/auth/LoginScreen";
import BasketScreen from "@screens/BasketScreen";
import InitialScreen from "@screens/InitialScreen";
import MenuTabNavigator from "@navigation/MenuTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="HomeTabHomeStack" component={LunchScreen}/>
            <Stack.Screen name="HomeTabBasketStack" component={BasketScreen}/>
        </Stack.Navigator>
    );
}
