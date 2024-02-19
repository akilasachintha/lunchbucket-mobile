import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function setOrderController(data) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.post(
            'addOrders',
            data,
            {
                headers: {
                    'token': token,
                }
            }
        );

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.log(error.response.data.data.message);
        const errorMessage = error?.response?.data?.data?.message || error.message;
        log("error", "controller", "setOrderController", errorMessage, "checkoutController.js");
        throw new Error(errorMessage);
    }
}

export async function setOderTimeController(data) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.post(
            'updateOrderDeliveryTime',
            data,
            {
                headers: {
                    'token': token,
                }
            }
        );

        if (response.status === 200) {
            return response.data;
        }
        if (response && response.data && response.data.state === false) {
            log("error", "controller", "setOderTimeController", response.data, "checkoutController.js");
            return ERROR_STATUS.ERROR;
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        log("error", "controller", "setOderTimeController", errorMessage, "checkoutController.js");
        return ERROR_STATUS.ERROR;
    }
}