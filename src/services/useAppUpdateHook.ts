import {useState} from "react";
import {log} from "../helpers/logs/log";
import {APP_VERSION, lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";

export default function useAppUpdateHook() {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [updateUrl, setUpdateUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUpdateStatus = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');

            if (!token) {
                return ERROR_STATUS.ERROR;
            }

            if (APP_VERSION === undefined || APP_VERSION === null) {
                return ERROR_STATUS.ERROR;
            }

            const response = await lunchBucketAPI.get('update_promotionstate/' + APP_VERSION, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            if (response && response.status === 200) {
                const data = response && response.data && response.data.data;
                if (data && data.state === false) {
                    setIsUpdateModalVisible(true);
                    setUpdateUrl(data && data.url);
                    setIsLoading(false);
                }
            }

        } catch (error: any) {
            log("error", "useAppUpdateHook", "fetchUpdateStatus", error.message, "useAppUpdateHook.ts");
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        updateUrl,
        isUpdateModalVisible,
        setIsUpdateModalVisible,
        fetchUpdateStatus
    }
}
