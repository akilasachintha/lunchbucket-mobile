import {log} from "../helpers/logs/log";
import {
    menuPercentageDinnerForThreeIDsController,
    menuPercentageDinnerForTwoIDsController,
    menuPercentageLunchForThreeIDsController,
    menuPercentageLunchForTwoIDsController
} from "../controllers/menuPercentageController";
import {ERROR_STATUS} from "../errorLogs/errorStatus";

export async function menuPercentageDinnerForTwoIDsService(id1, id2) {
    try {
        if (!id1 || !id2) return ERROR_STATUS.ERROR;

        const result = await menuPercentageDinnerForTwoIDsController(id1, id2);

        if (result === "error") {
            return ERROR_STATUS.ERROR;
        } else {
            return result.data;
        }
    } catch (error) {
        log("error", "service", "menuPercentageDinnerForTwoIDsService", error.message, "menuService.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForTwoIDsService(id1, id2) {
    try {
        if (!id1 || !id2) return ERROR_STATUS.ERROR;

        const result = await menuPercentageLunchForTwoIDsController(id1, id2);

        if (result === "error") {
            return ERROR_STATUS.ERROR;
        } else {
            return result.data;
        }
    } catch (error) {
        log("error", "service", "menuPercentageLunchForTwoIDsService", error.message, "menuService.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageDinnerForThreeIDsService(id1, id2, id3) {
    try {

        if (!id1 || !id2 || !id3) return ERROR_STATUS.ERROR;

        const result = await menuPercentageDinnerForThreeIDsController(id1, id2, id3);

        if (result === "error") {
            return ERROR_STATUS.ERROR;
        } else {
            return result.data;
        }
    } catch (error) {
        log("error", "service", "menuPercentageDinnerForTwoIDsService", error.message, "menuService.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForThreeIDsService(id1, id2, id3) {
    try {

        if (!id1 || !id2 || !id3) return ERROR_STATUS.ERROR;

        const result = await menuPercentageLunchForThreeIDsController(id1, id2, id3);

        if (result === "error") {
            return ERROR_STATUS.ERROR;
        } else {
            return result.data;
        }
    } catch (error) {
        log("error", "service", "menuPercentageLunchForTwoIDsService", error.message, "menuService.js");
        return ERROR_STATUS.ERROR;
    }
}