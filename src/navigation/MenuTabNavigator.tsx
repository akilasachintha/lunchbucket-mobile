import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LoginScreen from "@screens/auth/LoginScreen";
import HomeStackNavigator from "@navigation/HomeStackNavigator";
import {THEME} from "@theme/theme";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: THEME.COLORS.primaryRed,
                },
                tabBarActiveTintColor: THEME.COLORS.white,
                tabBarIndicatorStyle: {
                    backgroundColor: THEME.COLORS.white,
                },
            })}
        >
            <Tab.Screen name="Lunch" component={HomeStackNavigator}/>
            <Tab.Screen name="Dinner" component={LoginScreen}/>
        </Tab.Navigator>
    );
}
