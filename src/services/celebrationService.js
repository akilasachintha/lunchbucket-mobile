import {log} from "../helpers/logs/log";
import {getCelebrationController, setCelebrationController} from "../controllers/celebrationController";

export async function getCelebrationService() {
    try {
        const result = await getCelebrationController();

        if (result === "error") {
            return false;
        } else {
            return result && result.data && result.data.open_state;
        }
    } catch (error) {
        log("error", "service", "getCelebrationService", error.message, "celebrationService.js");
        return false;
    }
}

export async function setCelebrationService() {
    try {
        const result = await setCelebrationController();

        if (result === "error") {
            return false;
        } else {
            return result && result.data && result.data.state;
        }
    } catch (error) {
        log("error", "service", "setCelebrationService", error.message, "celebrationService.js");
        return false;
    }
}