import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {auth2API, projectCode} from "../apis/lunchBucketAPI";
import {log} from "../helpers/logs/log";

export async function getCelebrationController() {
    try {
        const response = await auth2API.get('getOpenState', {
            headers: {
                project_code: projectCode,
            }
        });

        if (response.status === 200) return response.data;
        else return ERROR_STATUS.ERROR;

    } catch (error) {
        log("error", "controller", "getCelebrationController", error.message, "celebrationController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function setCelebrationController() {
    try {
        const response = await auth2API.get('openProjectSend', {
            headers: {
                project_code: projectCode,
            }
        });

        if (response.status === 200) return response.data;
        else return ERROR_STATUS.ERROR;

    } catch (error) {
        log("error", "controller", "setCelebrationController", error.message, "celebrationController.js");
        return ERROR_STATUS.ERROR;
    }
}