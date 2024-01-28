import React, {createContext, useContext, useState} from 'react';
import {MenuItem} from "@components/molecules/MenuMolecule";

interface SpecialMenuItem {
    category_name: string;
    category: specialMenuCategory[]
}

interface specialMenuCategory {
    type: string;
    category: string,
    items: string[]
    price: number
    url: string
    vegetarian: string
    id: string
}

export interface MenuItems {
    [key: string]: MenuItem[];
}

interface MenuContextType {
    lunchMenuItems: MenuItems;
    dinnerMenuItems: MenuItems;
    editMenuItems: MenuItems;
    setLunchMenuItems: (menuItems: MenuItems) => void;
    setDinnerMenuItems: (menuItems: MenuItems) => void;
    setEditMenuItems: (menuItems: MenuItems) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [lunchMenuItems, setLunchMenuItems] = useState<MenuItems>({});
    const [dinnerMenuItems, setDinnerMenuItems] = useState<MenuItems>({});
    const [editMenuItems, setEditMenuItems] = useState<MenuItems>({});

    return (
        <MenuContext.Provider value={{
            lunchMenuItems,
            dinnerMenuItems,
            editMenuItems,
            setLunchMenuItems,
            setDinnerMenuItems,
            setEditMenuItems
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
