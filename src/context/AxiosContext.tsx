import React, {createContext, useContext} from 'react';
import axios, {AxiosInstance} from 'axios';
import {LoadingContextType} from "@interfaces/loadingTypes";
import {ToastContextType} from "@interfaces/toastTypes";
import {TOAST_TYPES} from "@constants/constants";
import {AuthContextProps} from "@interfaces/authTypes";
import {useAuthContext} from "@context/AuthContext";
import {useLoadingContext} from "@context/LoadingContext";
import {useToastContext} from "@context/ToastContext";
import {getDataFromLocalStorage} from "@helpers/asyncStorage";

const I2AUTH_BASE_URL = 'https://fw2svr60sl.execute-api.ap-south-1.amazonaws.com/beta';
const LUNCHBUCKET_BASE_URL = 'https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/';

const createAxiosInstance = (
    baseUrl: string,
    authContext: AuthContextProps,
    loadingContext: LoadingContextType,
    toastContext: ToastContextType): AxiosInstance => {

    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleError = (error: any) => {
        const status = error.response ? error.response.status : 0;
        let message: string;

        switch (status) {
            case 401:
                message = 'Unauthorized access. Please login again.';
                authContext.logout();
                break;
            case 403:
                message = 'You are not authorized to perform this action.';
                authContext.logout();
                break;
            case 500:
                message = 'Server error. Please try again later.';
                break;
            default:
                message = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'An unexpected error occurred.';
                break;
        }

        if (message) {
            toastContext.showToast(TOAST_TYPES.ERROR, message);
        }
    };

    instance.interceptors.request.use(
        async config => {
            const token = await getDataFromLocalStorage('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                config.headers.token = token;
            }
            loadingContext.showLoading();
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            handleError(error);
            return Promise.reject(error);
        }
    );

    return instance;
};

const AxiosContext = createContext<{
    axiosI2AuthInstance: AxiosInstance,
    axiosLunchBucketInstance: AxiosInstance
} | undefined>(undefined);

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const authContext = useAuthContext();
    const loadingContext = useLoadingContext();
    const toastContext = useToastContext();

    const axiosI2AuthInstance = createAxiosInstance(I2AUTH_BASE_URL, authContext, loadingContext, toastContext);
    const axiosLunchBucketInstance = createAxiosInstance(LUNCHBUCKET_BASE_URL, authContext, loadingContext, toastContext);

    return (
        <AxiosContext.Provider value={{axiosI2AuthInstance, axiosLunchBucketInstance}}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxiosContext = () => {
    const context = useContext(AxiosContext);
    if (context === undefined) {
        throw new Error('useAxiosContext must be used within a AxiosProvider');
    }
    return context;
};
