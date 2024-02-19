import {useState} from "react";
import {auth2API, projectCode} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";

type Notification = {
    id: number;
    notification: string;
    state: boolean;
    timestamp: string;
}

export default function useNotificationHook() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
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
                const data = response && response.data && response.data.data && response.data.data.notification && response.data.data.notification.notifications;
                console.log(data);
                if (data) {
                    setNotifications(data);

                    console.log(data);
                }
            }


        } catch (error: any) {
            console.log(error);
        }
    }

    return {
        notifications,
        fetchNotifications
    }
}
