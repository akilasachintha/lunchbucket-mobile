import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function getChatsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        const customerId = await getDataFromLocalStorage('customerId');
        if (!token) return ERROR_STATUS.ERROR;
        if (!customerId) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getUserChat/${customerId}`, {
            headers: { 'token': token, }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getChatsController", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}


export async function createNewConversationController(customerId, message) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.post(`addUserMessage`, {
            customer_id: customerId,
            message: message,
        }, {
            headers: { 'token': token, }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "createNewConversationController", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function sendMessageToConversation(chatId, message) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.post(`addUserReply`, {
            chat_id: chatId,
            message: message,
        }, {
            headers: { 'token': token, }
        });


        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "sendMessageToConversation", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function setUserViewController(id) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`setUserView/${id}`, {
            headers: { 'token': token, }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "setUserViewController", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}