import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function getUserFullDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getCustomer`, {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserFullDetailsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getUserPointsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getCustomerPoints`, {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserPointsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}