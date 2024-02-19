import {configureStore} from '@reduxjs/toolkit';
import menuPercentageReducer from './menuPercentageSlice';
import menuReducer from './menuSlice';

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        menuPercentage: menuPercentageReducer,
    },
})