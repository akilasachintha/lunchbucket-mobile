import React, {createContext, ReactNode, useContext} from 'react';
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {auth2API, projectCode} from "../apis/lunchBucketAPI";

export interface NotificationContextType {
    changeNotificationViewState: () => void;
    fetchNotificationViewState: () => void;
    notificationViewed: boolean;
    deleteNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children}) => {
    const [notificationViewed, setNotificationViewed] = React.useState(false);

    const changeNotificationViewState = async () => {
        try {
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.put('view_notifications', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                setNotificationViewed(false);
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    const deleteNotifications = async () => {
        try {
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.delete('notifications', {
                headers: {
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                setNotificationViewed(false);
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    const fetchNotificationViewState = async () => {
        try {
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.get('notifications', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                const data = response && response.data && response.data.data && response.data.data.notification && response.data.data.notification.new_state;
                console.log(data);
                if (data) {
                    setNotificationViewed(data);

                    console.log(data);
                }
            }


        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <NotificationContext.Provider
            value={{changeNotificationViewState, fetchNotificationViewState, notificationViewed, deleteNotifications}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = (): NotificationContextType => {
    const context = useContext(NotificationContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
