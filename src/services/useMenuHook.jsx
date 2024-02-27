import {useEffect, useState} from "react";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {useToast} from "../helpers/toast/Toast";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export default function useMenuHook() {
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(null);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(null);
    const [packetLimit, setPacketLimit] = useState(false);
    const [isLunchHook, setIsLunchHook] = useState(false);
    const [orderTypeHook, setOrderTypeHook] = useState("vegi");

    const {showToast} = useToast();

    useEffect(() => {

    }, [isLunchHook, setIsLunchHook, orderTypeHook, setOrderTypeHook]);


    useEffect(() => {
        fetchDisableLunchCheckbox().catch((error) => console.log(error.message));
        fetchDisableDinnerCheckbox().catch((error) => console.log(error.message));

    }, [disableLunchCheckbox, disableDinnerCheckbox]);

    const fetchDisableLunchCheckbox = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                return;
            }

            const result = await lunchBucketAPI.get("checkmealstatus/Lunch", {
                headers: {
                    'token': token,
                }
            });

            if (result && result.data && result.data.data && result.data.data.state) {
                setDisableLunchCheckbox(false);
            }

        } catch (e) {
            setDisableLunchCheckbox(true);
            console.log(e.message);
        }
    }

    const fetchDisableDinnerCheckbox = async () => {
        try {
            const token = await getDataFromLocalStorage('token')
            if (!token) {
                return;
            }

            const result = await lunchBucketAPI.get("checkmealstatus/Dinner", {
                headers: {
                    'token': token,
                }
            });

            if (result && result.data && result.data.data && result.data.data.state) {
                setDisableDinnerCheckbox(false);
            }

        } catch (e) {
            setDisableDinnerCheckbox(true);
            console.log(e.message);
        }
    }

    const checkPacketLimit = async (isLunch, isVeg, isSpecial, ids) => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setPacketLimit(true);
                return;
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

            console.log(result?.data?.data);
            if (result?.data?.data) {
                setPacketLimit(!(result?.data?.data?.state));
            }

        } catch (e) {
            console.log(e?.response?.data?.data?.message);
            showToast('error', e && e.response && e.response.data && e.response.data.data && e?.response?.data?.data?.message);
        }
    }

    return {
        disableLunchCheckbox,
        disableDinnerCheckbox,
        fetchDisableLunchCheckbox,
        fetchDisableDinnerCheckbox,
        checkPacketLimit,
        isLunchHook,
        setIsLunchHook,
        orderTypeHook,
        setOrderTypeHook,
        packetLimit,
    };
}
