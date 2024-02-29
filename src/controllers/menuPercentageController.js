import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import axios from "axios";

export async function menuPercentageDinnerForTwoIDsController(id1, id2) {
    if (!id1 || !id2) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`https://lunchbucket.xyz/dev/dinner/suitability_for_two/${id1}/${id2}`,
            {
                headers: {"Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"}
            });

        if (response.status === 200) return response.data;

    } catch (error) {
        console.log(error.data);
        log("error", "controller", "menuPercentageDinnerForTwoIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForTwoIDsController(id1, id2) {
    if (!id1 || !id2) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`https://lunchbucket.xyz/dev/lunch/suitability_for_two/${id1.toString()}/${id2.toString()}`, {
            headers: {"Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"},
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "menuPercentageLunchForTwoIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageDinnerForThreeIDsController(id1, id2, id3) {
    if (!id1 || !id2 || !id3) {
        return;
    }

    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://lunchbucket.xyz/dev/lunch/suitability_for_three/${id1}/${id2}/${id3}`);

        if (response.status === 200) return response.data;

    } catch (error) {
        console.log(error);
        log("error", "controller", "menuPercentageDinnerForThreeIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForThreeIDsController(id1, id2, id3) {
    if (!id1 || !id2 || !id3) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`https://lunchbucket.xyz/dev/lunch/suitability_for_three/${id1}/${id2}/${id3}`);

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "menuPercentageLunchForThreeIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

