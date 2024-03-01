import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";

export interface MenuContextType {
    menuLimits: Configuration | null;
    isLunchDisable: boolean | null;
    fetchDisableLunchCheckbox: () => Promise<void>;
    isLoading: boolean;
    getIsLunchEnable: () => Promise<boolean | null>;
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
    const [isLunchDisable, setIsLunchDisable] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchMenuLimits = useCallback(async () => {
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
    }, []);


    const fetchDisableLunchCheckbox = useCallback(async () => {
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
                setIsLunchDisable(!(result && result.data && result.data.data && result.data.data.state));
            }

        } catch (e: any) {
            setIsLunchDisable(true);
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getIsLunchEnable = useCallback(async () => {
        return isLunchDisable;
    }, [isLunchDisable]);

    useEffect(() => {
        fetchMenuLimits().catch(e => console.log(e));
        fetchDisableLunchCheckbox().catch(e => console.log(e));
        getIsLunchEnable().catch(e => console.log(e));

        console.log('fetching menu limits');
        console.log(isLunchDisable);

    }, [fetchMenuLimits, fetchDisableLunchCheckbox, getIsLunchEnable]);

    return (
        <MenuContext.Provider
            value={{
                menuLimits,
                isLunchDisable,
                isLoading,
                fetchDisableLunchCheckbox,
                getIsLunchEnable,
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
