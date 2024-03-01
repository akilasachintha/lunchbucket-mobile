import {useCallback, useState} from "react";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {useErrorContext} from "../context/ErrorContext";

export default function useMenuHook() {
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(null);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(null);
    const [packetLimit, setPacketLimit] = useState(null);
    const [isLunchHook, setIsLunchHook] = useState(false);
    const [orderTypeHook, setOrderTypeHook] = useState("vegi");
    const {showError} = useErrorContext();

    const checkPacketLimit = useCallback(async (isLunch, isVeg, isSpecial, ids) => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setPacketLimit(false);
                return false;
            }

            const result = await lunchBucketAPI.post("checkpacketlimit", {
                    meal_type: isLunch ? "Lunch" : "Dinner",
                    order_type: isSpecial ? "special" : isVeg ? "vegi" : "nonvegi",
                    id: ids
                },
                {
                    headers: {
                        'token': token,
                    },
                },
            );

            console.log(result && result.data);
            if (result && result.data && result.data.data && result?.data?.data) {
                setPacketLimit(result && result.data && result.data.data && result?.data?.data?.state);
                console.log(result && result.data && result.data.data && result?.data?.data?.state);
                return (result && result.data && result.data.data && result?.data?.data?.state);
            }

        } catch (e) {
            showError(e && e.response && e.response.data && e.response.data.data && e?.response?.data?.data?.message);
            setPacketLimit(true);
            return true;
        }
    }, []);

    return {
        disableLunchCheckbox,
        disableDinnerCheckbox,
        checkPacketLimit,
        isLunchHook,
        setIsLunchHook,
        orderTypeHook,
        setOrderTypeHook,
        packetLimit,
    };
}
