export type RootStackParamList = {
    InitialStack: undefined;
    LoginStack: undefined;
    HomeStack: undefined;
    BasketStack: undefined;
    HomeTabHomeStack: undefined;
    HomeTabBasketStack: undefined;
    HomeStackHomeTabMenuStackHome: undefined;
    HomeStackHomeTabMenuStackBasket: undefined;
    HomeStackHomeTab: undefined;
    HomeStackHomeTabMenuStackEditMenu: HomeParams | undefined;
    Lunch: HomeParams | undefined;
};

export type HomeParams = {
    menuId?: string;
    menuType: string;
    isEdit?: boolean;
    id?: string;
};