import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {THEME} from "@theme/theme";
import {AntDesign, Entypo, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import MenuStackNavigator from "@navigation/MenuStackNavigator";
import OrderListScreen from "@screens/OrderListScreen";
import ChatScreen from "@screens/ChatScreen";
import ProfileScreen from "@screens/ProfileScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({}) => ({
                tabBarStyle: {
                    backgroundColor: THEME.COLORS.white,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: THEME.COLORS.white,
                },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5
                            name="home" size={24}
                            color={focused ? THEME.COLORS.primaryDarkYellow : THEME.COLORS.primaryRed}/>
                    ),
                }}
                name="HomeStackHomeTab"
                component={MenuStackNavigator}/>
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => (
                        <AntDesign
                            name="clockcircle"
                            size={24}
                            color={focused ? THEME.COLORS.primaryDarkYellow : THEME.COLORS.primaryRed}/>
                    ),
                }}
                name="HomeStackOrdersTab"
                component={OrderListScreen}/>
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => (
                        <Entypo
                            name="chat"
                            size={24}
                            color={focused ? THEME.COLORS.primaryDarkYellow : THEME.COLORS.primaryRed}/>
                    ),
                }}
                name="HomeStackChatTab"
                component={ChatScreen}/>
            <Tab.Screen
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color={focused ? THEME.COLORS.primaryDarkYellow : THEME.COLORS.primaryRed}/>
                    ),
                }}
                name={"HomeStackProfileTab"}
                component={ProfileScreen}/>
        </Tab.Navigator>
    );
}
