import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from "@interfaces/navigationTypes";
import InitialScreen from "@screens/InitialScreen";
import LoginScreen from "@screens/auth/LoginScreen";
import TabNavigator from "@navigation/TabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="InitialStack" component={InitialScreen}/>
            <Stack.Screen name="LoginStack" component={LoginScreen}/>
            <Stack.Screen name="HomeStack" component={TabNavigator}/>
        </Stack.Navigator>
    );
}
