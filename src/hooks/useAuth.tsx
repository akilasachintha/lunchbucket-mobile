import {getDataFromLocalStorage} from "@helpers/asyncStorage";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@interfaces/navigationTypes";
import {useAxiosContext} from "@context/AxiosContext";
import {useToastContext} from "@context/ToastContext";
import {useAuthContext} from "@context/AuthContext";
import {CONFIGURATION} from "@config/configuration";
import {useLoadingContext} from "@context/LoadingContext";
import {capitalizeFirstLetterOfEachWord} from "@helpers/textHelpers";

export default function useAuth() {
    const {axiosI2AuthInstance} = useAxiosContext();
    const {showToast} = useToastContext();
    const {login, logout} = useAuthContext();
    const {hideLoading} = useLoadingContext();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAPIError = (error: any) => {
        showToast(capitalizeFirstLetterOfEachWord(error), 'error');
        hideLoading();
        return false;
    };

    const authenticate = async (email: string, password: string, deviceToken: string | null) => {
        const body = {email, password, project_code: CONFIGURATION.PROJECT_CODE, device_token: deviceToken ?? ''};
        try {
            const response = await axiosI2AuthInstance.post('/userLogin', body);
            return response.data?.data ?? null;
        } catch (error) {
            return handleAPIError(error);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        const deviceToken = await getDataFromLocalStorage('deviceToken');
        if (!deviceToken) showToast('Please allow push notifications to receive updates', 'error');

        const authData = await authenticate(email, password, deviceToken);
        if (!authData) return false;
        if (!authData?.state) return handleAPIError(authData?.response);

        const {token, type} = authData;
        if (!token || !type) return handleAPIError('Token or type missing');

        if (await login(token, type)) {
            showToast('Login successful', 'success')
            navigation.navigate('HomeStackHomeTab');

            return true;
        } else {
            return handleAPIError('Storage error');
        }
    };

    const handleLogout = () => {
        logout();
        navigation.navigate('LoginStack');
    }

    return {
        handleLogin,
        handleLogout,
    };
}
