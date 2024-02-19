import {
    createNewConversationController,
    getChatsController,
    sendMessageToConversation,
    setUserViewController
} from "../controllers/chatController";
import {log} from "../helpers/logs/log";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";


export async function getChatsService() {
    try {
        const result = await getChatsController();
        if (result === "error") return ERROR_STATUS.ERROR;

        return result.data.chats;

    } catch (e) {
        log("error", "service", "getChatsService", e.message, "chatService.js");
    }
}

export async function createNewConversationService(message) {
    try {
        const customerId = await getDataFromLocalStorage('customerId');
        if (!customerId) return ERROR_STATUS.ERROR;

        const result = await createNewConversationController(customerId, message);
        if (result === "error") return ERROR_STATUS.ERROR;

        return result.data;

    } catch (e) {
        log("error", "service", "createNewConversationService", e.message, "chatService.js");
    }
}

export async function sendMessageToConversationService(chatId, message) {
    try {
        const result = await sendMessageToConversation(chatId, message);
        if (result === "error") return ERROR_STATUS.ERROR;

        return result.data;
    } catch (e) {
        log("error", "service", "sendMessageToConversationService", e.message, "chatService.js");
    }
}

export async function setUserViewService(id) {
    try {
        const result = await setUserViewController(id);
        if (result === "error") return ERROR_STATUS.ERROR;

        return result.data;
    } catch (e) {
        log("error", "service", "setUserViewService", e.message, "chatService.js");
    }
}