import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {log} from "../helpers/logs/log";

export async function getLunchAdminFrontNotifyController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Lunch/Front', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchAdminNotificationsController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getLunchAdminBackNotifyController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Lunch/Back', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getDinnerAdminNotificationsController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerAdminFrontNotifyController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Dinner/Front', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchReportController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerAdminBackNotifyController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Dinner/Back', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchReportController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}