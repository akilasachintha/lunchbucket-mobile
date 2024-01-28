import React, {createContext, useContext, useState} from 'react';
import {MenuItem} from "@components/molecules/MenuMolecule";

export interface Menu {
    id: string;
    items: MenuItem[];
    totalPrice: number;
    menuType: string;
}

interface BasketContextType {
    basket: Menu[];
    addMenuToBasket: (menuType: string, menuItem: MenuItem[]) => void;
    removeMenuFromBasket: (menuId: string) => void;
    editMenuInBasket: (menuId: string, updatedMenu: MenuItem[]) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [basket, setBasket] = useState<Menu[]>([]);

    const addMenuToBasket = (menuType: string, menuItem: MenuItem[]) => {
        const uniqueId = `menu_${Date.now()}`;
        const totalPrice = menuItem.reduce((acc, item) => acc + item.price, 0);

        const menuWithId: Menu = {id: uniqueId, items: menuItem, totalPrice: totalPrice, menuType: menuType};
        setBasket((prevBasket) => [...prevBasket, menuWithId]);
    };

    const removeMenuFromBasket = (menuId: string) => {
        setBasket((prevBasket) => prevBasket.filter((menu) => menu.id !== menuId));
    };

    const editMenuInBasket = (menuId: string, updatedMenu: MenuItem[]) => {
        setBasket((prevBasket) =>
            prevBasket.map((menu) => (menu.id === menuId ? {...menu, items: updatedMenu} : menu))
        );
    };

    return (
        <BasketContext.Provider value={{basket, addMenuToBasket, removeMenuFromBasket, editMenuInBasket}}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};
