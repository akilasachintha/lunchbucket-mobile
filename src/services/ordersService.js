import {log} from "../helpers/logs/log";
import {deleteOrdersController, getOrdersController} from "../controllers/ordersController";

export async function getOrdersService() {
    try {
        const result = await getOrdersController();

        if (result === "error") {
            return [];
        } else {
            const data = await result.data.data;
            log("success", "service", "getOrdersService | data", data, "ordersService.js");
            return data;
        }
    } catch (error) {
        log("error", "service", "getLunchMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function deleteOrderService(id) {
    try {
        if (!id) return false;

        const result = await deleteOrdersController(id);

        if (result === "error") {
            return false;
        } else {
            const data = await result.data.state;
            log("success", "service", "deleteOrderService | data", data, "ordersService.js");
            return data;
        }
    } catch (error) {
        log("error", "service", "deleteOrderService", error.message, "ordersService.js");
        return false;
    }
}
