import AsyncStorage from "@react-native-async-storage/async-storage";
import {log} from "../logs/log";

const addDataToLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        log("error", "AsyncStorage", "addDataToLocalStorage", e.message, "asyncStorage.js");
    }
};

const getDataFromLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        log("error", "AsyncStorage", "getDataFromLocalStorage", e.message, "asyncStorage.js");
        return null;
    }
};

const removeDataFromLocalStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        log("error", "AsyncStorage", "removeDataFromLocalStorage", e.message, "asyncStorage.js");
    }
};

export {addDataToLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage};
