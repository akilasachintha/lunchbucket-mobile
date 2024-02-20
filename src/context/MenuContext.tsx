import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";

export interface MenuContextType {
    menuLimits: Configuration | null;
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

    useEffect(() => {
        fetchMenuLimits().catch(e => console.log(e));
        console.log('MenuProvider useEffect');
        console.log(menuLimits);
    }, []);

    const fetchMenuLimits = async () => {
        try {
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
        }
    }


    return (
        <MenuContext.Provider
            value={{menuLimits}}>
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
