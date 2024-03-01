import React, {createContext, ReactNode, useCallback, useContext, useEffect} from 'react';
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {auth2API, projectCode} from "../apis/lunchBucketAPI";

export interface NotificationContextType {
    changeNotificationViewState: () => void;
    fetchNotificationViewState: () => void;
    notificationViewed: boolean;
    deleteNotifications: () => void;
    notifications: INotification[];
    fetchNotifications: () => void;
    setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

type INotification = {
    id: number;
    notification: string;
    state: boolean;
    timestamp: {
        date: string;
        time: string;
    };
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({children}) => {
    const [notificationViewed, setNotificationViewed] = React.useState(false);
    const [notifications, setNotifications] = React.useState<INotification[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchNotifications = useCallback(async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.get('notifications', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                const data = response && response.data && response.data.data && response.data.data.notification && response.data.data.notification.notifications;
                if (data) {
                    setNotifications(data);
                    setIsLoading(false);
                }
            }

            setIsLoading(false);

        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
        }
    }, [setIsLoading, setNotifications]);

    const changeNotificationViewState = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.put('view_notifications', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                await fetchNotifications();
                setNotificationViewed(false);
            }

            setIsLoading(false);

        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const deleteNotifications = async () => {
        try {

            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');

            const response = await auth2API.delete('notifications', {
                headers: {
                    'token': token,
                    'project_code': projectCode,
                },
            });

            if (response.status === 200) {
                setNotifications([]);
            }

            setNotifications([]);

        } catch (error: any) {
            console.log(error);
            setNotifications([]);
            setIsLoading(false);
        }
    }

    const fetchNotificationViewState = async () => {
        try {

            setIsLoading(true);
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
                if (data) {
                    setNotificationViewed(data);
                }
            }

        } catch (error: any) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchNotifications().catch((error) => console.error('Error fetching notifications:', error));
        setIsLoading(false);
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider
            value={{
                changeNotificationViewState,
                fetchNotificationViewState,
                notificationViewed,
                deleteNotifications,
                notifications,
                fetchNotifications,
                setNotifications,
                isLoading,
                setIsLoading,
            }}>
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
