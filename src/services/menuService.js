import {getDinnerMenuController, getLunchMenuController,} from "../controllers/menuController";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";

export async function getLunchMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return result.data.data;
        }
    } catch (error) {
        log("error", "service", "getLunchMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return result.data.data;
        }
    } catch (error) {
        log("error", "service", "getDinnerMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchMeetMenuService(lunchMenu) {
    try {
        const result = lunchMenu;
        if (!result) {
            return [];
        } else {
            return await result.meat_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Meat',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getLunchMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchSpecialMenuService(lunchMenu) {
    try {
        const result = lunchMenu;
        if (!result) {
            return [];
        } else {
            return result.special_menu_lunch.map((item) => {
                const categoryWithChecked = item.category.map((categoryItem) => ({
                    ...categoryItem,
                    checked: false,
                }));

                return {
                    ...item,
                    category: categoryWithChecked,
                    disableCheckbox: true,
                    foodType: 'Special',
                    percentage: 0,
                };
            });
        }
    } catch (error) {
        log("error", "service", "getLunchSpecialMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchRiceMenuService(lunchMenu) {
    try {
        const result = lunchMenu;
        if (!result) {
            return [];
        } else {
            return await result.rice_menu_lunch.map((item) => ({
                ...item,
                type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                checked: false,
                disableCheckbox: true,
                foodType: 'Rice',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getLunchRiceMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchVegetableMenuService(lunchMenu) {
    try {
        const result = lunchMenu;
        if (!result) {
            return [];
        } else {
            return await result.vege_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Vegetable',
                percentage: 0,
            }));
        }


    } catch (error) {
        log("error", "service", "getLunchVegetableMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchStewMenuService(lunchMenu) {
    try {
        const result = lunchMenu;
        if (!result) {
            return [];
        } else {
            return await result.stew_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Condiments',
                percentage: 0,
            }));
        }

    } catch (error) {
        log("error", "service", "getLunchStewMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerMeetMenuService(dinnerMenu) {
    try {
        const result = dinnerMenu;
        if (!result) {
            return [];
        } else {
            return await result.meat_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Meat',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerSpecialMenuService(dinnerMenu) {
    try {
        const result = dinnerMenu;

        if (!result) {
            return [];
        } else {
            return await result.special_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Special',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerRiceMenuService(dinnerMenu) {
    try {
        const result = dinnerMenu;

        if (!result) {
            return [];
        } else {
            return await result.rice_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Rice',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerVegetableMenuService(dinnerMenu) {
    try {
        const result = dinnerMenu;

        if (!result) {
            return [];
        } else {
            return await result.vege_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Vegetable',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerVegetableMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerStewMenuService(dinnerMenu) {
    try {
        const result = dinnerMenu;

        if (!result) {
            return [];
        } else {
            return await result.stew_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Condiments',
                percentage: 0,
            }));
        }

    } catch (error) {
        log("error", "service", "getDinnerStewMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function setMenuBasketService(totalCheckedItems, totalAmount, venue, isVeg, isSpecial) {
    try {

        let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');
        console.log("existingBasket", existingBasket);

        if (totalCheckedItems.length > 0) {
            let mealNumber = existingBasket.meal?.length > 0 ? existingBasket.meal.length + 1 : 1;

            if (isSpecial) {
                totalCheckedItems.forEach((item) => {
                    const id = new Date().getTime().toString();

                    const meal = {
                        id: id + item.id,
                        name: 'Special Meal',
                        items: [item],
                        date: Date.now(),
                        count: 1,
                        unitPrice: item.price,
                        totalPrice: item.price,
                        venue: venue,
                        isVeg: isVeg,
                        isSpecial: isSpecial,
                    };

                    existingBasket.meal = existingBasket.meal || [];
                    existingBasket.meal.push(meal);
                    mealNumber++;
                });
            } else {
                const id = new Date().getTime().toString();

                const meal = {
                    id: id,
                    name: isVeg ? 'Veg Meal' : 'Non-Veg Meal',
                    items: totalCheckedItems,
                    date: Date.now(),
                    count: 1,
                    unitPrice: totalAmount,
                    totalPrice: totalAmount,
                    venue: venue,
                    isVeg: isVeg,
                    isSpecial: isSpecial,
                };

                existingBasket.meal = existingBasket.meal || [];
                existingBasket.meal.push(meal);
            }

            existingBasket.venue = venue;
        }

        const jsonValue = JSON.stringify(existingBasket);
        await addDataToLocalStorage('basket', jsonValue);

        log('info', 'service', 'setMenuBasketService', SUCCESS_STATUS.SUCCESS, 'menuService.js');
        return SUCCESS_STATUS.SUCCESS;

    } catch (error) {
        log('error', 'service', 'setMenuBasketService' + error.message, 'menuService.js');
        return ERROR_STATUS.ERROR;
    }
}

export async function removeMealFromBasketService(mealId) {
    try {
        let existingBasket = await getDataFromLocalStorage('basket');
        existingBasket = JSON.parse(existingBasket || '{}');

        const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

        if (mealIndex !== -1) {
            existingBasket.meal.splice(mealIndex, 1);

            const jsonValue = JSON.stringify(existingBasket);
            await addDataToLocalStorage('basket', jsonValue);

            log('info', 'service', 'removeMealFromBasketService', SUCCESS_STATUS.SUCCESS, 'menuService.js');
        }
    } catch (error) {
        log("error", "service", "removeMealFromBasketService", error.message, "menuService.js");
        return [];
    }
}

export async function getByMealIdFromBasketService(mealId) {
    try {
        let existingBasket = await getDataFromLocalStorage('basket');
        existingBasket = JSON.parse(existingBasket || '{}');

        const meal = existingBasket.meal.find((meal) => meal.id.toString() === mealId);

        if (meal) {
            return meal;
        } else {
            log('info', 'service', 'getByMealIdFromBasketService', 'Meal not found', 'menuService.js');
            return null;
        }
    } catch (error) {
        log('error', 'service', 'getByMealIdFromBasketService', error.message, 'menuService.js');
        return null;
    }
}

export async function updateBasketFromId(mealId, updatedMeal) {
    try {
        let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');
        console.log("existingBasket", existingBasket);

        if (existingBasket.meal && existingBasket.meal.length > 0) {
            const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

            if (mealIndex !== -1) {
                existingBasket.meal[mealIndex].items = [...updatedMeal];
                existingBasket.meal[mealIndex].unitPrice = updatedMeal.reduce((acc, item) => acc + item.price, 0);
                existingBasket.meal[mealIndex].totalPrice = existingBasket.meal[mealIndex].unitPrice * existingBasket.meal[mealIndex].count;

                const jsonValue = JSON.stringify(existingBasket);
                await addDataToLocalStorage('basket', jsonValue);

                log('info', 'service', 'updateBasketFromId', SUCCESS_STATUS.SUCCESS, 'menuService.js');
                return SUCCESS_STATUS.SUCCESS;
            }
        }

        return ERROR_STATUS.ERROR;

    } catch (error) {
        log('error', 'service', 'updateBasketFromId' + error.message, 'menuService.js');
        return ERROR_STATUS.ERROR;
    }
}

export async function fetchMenuData(lunchMenu, dinnerMenu) {
    try {
        const [
            specialMenuLunch,
            riceMenuLunch,
            meetMenuLunch,
            stewMenuLunch,
            vegetableMenuLunch,

            specialMenuDinner,
            riceMenuDinner,
            meetMenuDinner,
            stewMenuDinner,
            vegetableMenuDinner,
        ] = await Promise.all([
            getLunchSpecialMenuService(lunchMenu),
            getLunchRiceMenuService(lunchMenu),
            getLunchMeetMenuService(lunchMenu),
            getLunchStewMenuService(lunchMenu),
            getLunchVegetableMenuService(lunchMenu),

            getDinnerSpecialMenuService(dinnerMenu),
            getDinnerRiceMenuService(dinnerMenu),
            getDinnerMeetMenuService(dinnerMenu),
            getDinnerStewMenuService(dinnerMenu),
            getDinnerVegetableMenuService(dinnerMenu),
        ]);

        return {
            specialMenuLunch,
            riceMenuLunch,
            meetMenuLunch,
            stewMenuLunch,
            vegetableMenuLunch,
            specialMenuDinner,
            riceMenuDinner,
            meetMenuDinner,
            stewMenuDinner,
            vegetableMenuDinner,
        };
    } catch (error) {
        throw new Error("Error fetching menus");
    }
}

export async function fetchBasket(mealId, setCount, setBasket) {
    try {
        let basketItems = await getDataFromLocalStorage('basket');
        basketItems = JSON.parse(basketItems);

        if (basketItems?.meal?.length > 0) {
            basketItems.meal = basketItems.meal.map((item) => {
                if (item.id === mealId) {
                    setCount(item.count);
                }
                return item;
            });
        }

        setBasket(basketItems);
    } catch (error) {
        log("error", "Error :: BasketScreen :: fetchBasket :: ", "fetchBasket", error.message, "BasketItem.tsx");
    }
}


