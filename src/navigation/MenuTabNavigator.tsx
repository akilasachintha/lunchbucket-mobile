import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {THEME} from "@theme/theme";
import LunchScreen from "@screens/LunchScreen";
import DinnerScreen from "@screens/DinnerScreen";

const Tab = createMaterialTopTabNavigator();

export default function MenuTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingVertical: "1%",
                    backgroundColor: THEME.COLORS.primaryRed,
                },
                tabBarActiveTintColor: THEME.COLORS.white,
                tabBarIndicatorStyle: {
                    backgroundColor: THEME.COLORS.white,
                },
            })}
        >
            <Tab.Screen
                options={{
                    tabBarLabelStyle: {
                        fontSize: THEME.FONTS.SIZE.sm,
                        fontWeight: 'bold',
                    },
                }}
                name="Lunch"
                component={LunchScreen}/>
            <Tab.Screen
                options={{
                    tabBarLabelStyle: {
                        fontSize: THEME.FONTS.SIZE.sm,
                        fontWeight: 'bold',
                    },
                }}
                name="Dinner"
                component={DinnerScreen}/>
        </Tab.Navigator>
    );
}
