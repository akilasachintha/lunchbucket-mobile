import {useState} from "react";
import {log} from "../helpers/logs/log";
import {APP_VERSION, lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";

export default function usePromotionHook() {
    const [isPromotionModalVisible, setIsPromotionModalVisible] = useState(false);
    const [promotionUrl, setPromotionUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchPromotion = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');

            if (!token) {
                return ERROR_STATUS.ERROR;
            }

            console.log(APP_VERSION);
            const response = await lunchBucketAPI.get('update_promotionstate/""', {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            console.log(response.data.data);
            if (response.status === 200) {
                const data = response && response.data && response.data.data;
                if (data && data.state) {
                    console.log(data.state);
                    setIsPromotionModalVisible(true);
                    setPromotionUrl(data.url);
                    setIsLoading(false);
                }
            }

        } catch (error: any) {
            log("error", "usePromotionHook", "fetchPromotion", error.message, "useAppUpdateHook.ts");
            setIsLoading(false);
        }
    }

    const hidePromotion = async () => {
        try {
            const token = await getDataFromLocalStorage('token');

            if (!token) {
                return ERROR_STATUS.ERROR;
            }

            const response = await lunchBucketAPI.put('hidepromotion', {}, {
                headers: {
                    'token': token,
                },
            });

            console.log(response.data.data);

            setIsPromotionModalVisible(false);
            setIsLoading(false);

        } catch (error: any) {
            console.log(error);
            log("error", "usePromotionHook", "hidePromotion", error.message, "useAppUpdateHook.ts");
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        promotionUrl,
        isPromotionModalVisible,
        setIsPromotionModalVisible,
        fetchPromotion,
        hidePromotion
    }
}
