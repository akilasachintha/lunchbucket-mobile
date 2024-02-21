import {log} from "../helpers/logs/log";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {setOderTimeController, setOrderController} from "../controllers/checkoutController";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {isEmptyArray} from "formik";

export async function handleCheckoutService() {
    try {
        const [basket, customerId] = await Promise.all([
            getDataFromLocalStorage("basket"),
            getDataFromLocalStorage("customerId"),
        ]);

        if (!basket) {
            log("error", "checkoutService", "handleCheckoutService | basket", basket, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        if (!customerId) {
            log("error", "checkoutService", "handleCheckoutService | customerId", customerId, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        const basketItems = JSON.parse(basket);

        const checkoutMenu = {
            orders: [],
            customer_id: customerId,
            cash: basketItems.isCash,
        }

        if (basketItems && basketItems.venue) {
            checkoutMenu.type = basketItems.venue;
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.venue", basketItems.venue, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        if (basketItems && basketItems.meal && basketItems.meal.length > 0) {
            basketItems && basketItems.meal.forEach((meal) => {
                if (meal.isSpecial) {
                    checkoutMenu.orders.push({
                        order_type: "special",
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        category: meal.items[0]?.category || "",
                        type: meal.items[0]?.type || "",
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                        special_meal: meal.items[0]?.id || "",
                    });

                } else if (meal.isVeg) {
                    checkoutMenu.orders.push({
                        order_type: "vegi",
                        items: meal && meal.items && !isEmptyArray(meal.items) && meal.items.map(item => item?.type || ""),
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                    });
                } else {
                    checkoutMenu.orders.push({
                        order_type: "non_vegi",
                        items:  meal && meal.items && !isEmptyArray(meal.items) && meal.items.map(item => item?.type || ""),
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                    });
                }
            });
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.meal", basketItems.meal, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        const result = await setOrderController(checkoutMenu);
        const data = await result.data;

        if (result === ERROR_STATUS.ERROR) {
            log("error", "checkoutService", "handleCheckoutService | result", result, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else if (data.state === false) {
            log("error", "checkoutService", "handleCheckoutService", data.data, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else {
            await addDataToLocalStorage("basket", "{}");
            return data;
        }
    } catch (error) {
        log("error", "checkoutService", "handleCheckoutService", error.message, "checkoutService.js");
        throw new Error(error.message);
    }
}

export async function handleCheckoutTimeService(data) {
    try {
        const result = await setOderTimeController(data);
        const dataResult = await result.data;

        if (result === ERROR_STATUS.ERROR) {
            log("error", "checkoutService", "handleCheckoutTimeService | result", result, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else if (dataResult.state === false) {
            log("error", "checkoutService", "handleCheckoutTimeService", dataResult.data, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else {
            log("success", "checkoutService", "handleCheckoutTimeService", dataResult.data, "checkoutService.js");
            return dataResult;
        }
    } catch (error) {
        log("error", "checkoutService", "handleCheckoutTimeService", error.message, "checkoutService.js");
        return ERROR_STATUS.ERROR;
    }
}
