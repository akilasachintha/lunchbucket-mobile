import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import MenuScreen from "../screens/order/MenuScreen";
import BasketScreen from "../screens/order/BasketScreen";
import CheckoutScreen from "../screens/order/CheckoutScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import LeaveSuggestion from "../screens/chat/LeaveSuggestion";
import ContactOwner from "../screens/chat/ContactOwner";
import ProfileScreen from "../screens/ProfileScreen";
import InitialScreen from "../screens/welcome/InitialScreen";
import PromotionsScreen from "../screens/PromotionsScreen";
import PromotionDetails from "../components/promotions/PromotionDetails";
import ListOrdersScreen from "../screens/order/ListOrdersScreen";
import AuthGuard from "../helpers/authGuard/AuthGuard";
import ForgetPassword from "../screens/auth/ForgetPassword";
import CelebrationScreen from "../screens/welcome/CelebrationScreen";
import AdminScreen from "../screens/admin/AdminScreen";
import SettingsScreen from "../screens/SettingsScreen";
import OrderingDetailsScreen from "../screens/settings/OrderingDetailsScreen";
import PaymentDetailsScreen from "../screens/settings/PaymentDetailsScreen";
import DeliveryDetailsScreen from "../screens/settings/DeliveryDetailsScreen";
import FeedbackDetailsScreen from "../screens/settings/FeedbackDetailsScreen";
import PromotionsDetailsScreen from "../screens/settings/PromotionsDetailsScreen";
import ContactDetailsScreen from "../screens/settings/ContactDetailsScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import RegisterDetailsScreen from "../screens/settings/RegisterDetailsScreen";
import TricksDetailsScreen from "../screens/settings/TricksDetailsScreen";
import NotificationDetailsScreen from "../screens/settings/NotificationDetailsScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <AuthGuard>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                cardShadowEnabled: false,
                cardOverlayEnabled: false,
                gestureEnabled: false,
                animation: 'slide_from_right',
            }}>
                <Stack.Screen name="Initial" component={InitialScreen}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Admin" component={AdminScreen}/>
                <Stack.Screen name="Celebration" component={CelebrationScreen}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
                <Stack.Screen name="Menu" component={MenuScreen}/>
                <Stack.Screen name="Basket" component={BasketScreen}/>
                <Stack.Screen name="Checkout" component={CheckoutScreen}/>
                <Stack.Screen name="OrdersList" component={ListOrdersScreen}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
                <Stack.Screen name="LeaveSuggestion" component={LeaveSuggestion}/>
                <Stack.Screen name="ContactOwner" component={ContactOwner}/>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="Promotion" component={PromotionsScreen}/>
                <Stack.Screen name="PromotionDetails" component={PromotionDetails}/>
                <Stack.Screen name="OrderingDetails" component={OrderingDetailsScreen}/>
                <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen}/>
                <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen}/>
                <Stack.Screen name="FeedbackDetails" component={FeedbackDetailsScreen}/>
                <Stack.Screen name="PromotionsDetails" component={PromotionsDetailsScreen}/>
                <Stack.Screen name="ContactDetails" component={ContactDetailsScreen}/>
                <Stack.Screen name="RegisterDetails" component={RegisterDetailsScreen}/>
                <Stack.Screen name="TricksDetails" component={TricksDetailsScreen}/>
                <Stack.Screen name="NotificationDetails" component={NotificationDetailsScreen}/>
                <Stack.Screen name="Instruction" component={AboutUsScreen}/>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
            </Stack.Navigator>
        </AuthGuard>
    );
}
