import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {useErrorContext} from "./ErrorContext";

export interface MenuContextType {
    menuLimits: Configuration | null;
    disableLunchCheckbox: boolean | null;
    disableDinnerCheckbox: boolean | null;
    isLunch: boolean | null;
    fetchDisableLunchCheckbox: () => Promise<void>;
    fetchDisableDinnerCheckbox: () => Promise<void>;
    getDisableLunchCheckbox: () => Promise<boolean | null>;
    getDisableDinnerCheckbox: () => Promise<boolean | null>;
    isLoading: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
    children: ReactNode;
}

export interface ExtraPayment {
    payment: number;
    description: string;
}

export interface Limits {
    min: number;
    max: number;
}

export interface Configuration {
    state: boolean;
    limits: Limits;
    extra_payments: {
        [key: string]: ExtraPayment;
    };
}

export const MenuProvider: React.FC<MenuProviderProps> = ({children}) => {
    const [menuLimits, setMenuLimits] = useState<Configuration | null>(null);
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState<boolean | null>(null);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState<boolean | null>(null);
    const [isLunch, setIsLunch] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {showError} = useErrorContext();

    useEffect(() => {
        fetchMenuLimits().catch(e => console.log(e));
        fetchDisableLunchCheckbox().catch(e => console.log(e));
        fetchDisableDinnerCheckbox().catch(e => console.log(e));
        showError('Error fetching menu limits');

        if (disableLunchCheckbox === false) {
            setIsLunch(true);
        } else {
            setIsLunch(false);
        }

        console.log("disableLunchCheckbox", disableLunchCheckbox);
        console.log("disableDinnerCheckbox", disableDinnerCheckbox);
        console.log("isLunch", isLunch);

    }, [isLunch, disableLunchCheckbox, disableDinnerCheckbox]);

    const fetchMenuLimits = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');
            if (!token) return;

            const response = await lunchBucketAPI.get('/choicelimit_extrapayment', {
                headers: {
                    token: token,
                }
            });

            if (response.status === 200) {
                console.log(response.data.data, null, 2);
                setMenuLimits(response && response.data && response.data.data);
            }

        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }


    const fetchDisableLunchCheckbox = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                return;
            }

            const result = await lunchBucketAPI.get("checkmealstatus/Lunch", {
                headers: {
                    'token': token,
                }
            });

            console.log(result.data);
            if (result && result.data && result.data.data && result.data.data) {
                setDisableLunchCheckbox(!(result && result.data && result.data.data && result.data.data.state));
            }

        } catch (e: any) {
            setDisableLunchCheckbox(true);
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchDisableDinnerCheckbox = async () => {
        try {
            setIsLoading(true);
            const token = await getDataFromLocalStorage('token')
            if (!token) {
                return;
            }

            const result = await lunchBucketAPI.get("checkmealstatus/Dinner", {
                headers: {
                    'token': token,
                }
            });

            console.log(result.data);
            if (result && result.data && result.data.data && result.data.data) {
                setDisableDinnerCheckbox(!(result && result.data && result.data.data && result.data.data.state));
            }

        } catch (e: any) {
            setDisableDinnerCheckbox(true);
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    }


    const getDisableLunchCheckbox = async () => {
        return disableLunchCheckbox;
    }

    const getDisableDinnerCheckbox = async () => {
        return disableDinnerCheckbox;
    }


    return (
        <MenuContext.Provider
            value={{
                menuLimits,
                disableLunchCheckbox,
                disableDinnerCheckbox,
                isLunch,
                isLoading,
                fetchDisableLunchCheckbox,
                fetchDisableDinnerCheckbox,
                getDisableLunchCheckbox,
                getDisableDinnerCheckbox,
            }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = (): MenuContextType => {
    const context = useContext(MenuContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
