import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isEditMenu: false,
    selectedDinnerMenu: [],
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setIsEditMenuTrueReducer: (state) => {
            state.isEditMenu = true;
        },
        setIsEditMenuFalseReducer: (state) => {
            state.isEditMenu = false;
        },
        setSelectedDinnerMenuReducer: (state, action) => {
            state.selectedDinnerMenu.push(action.payload);
        }
    },
});


export const {setIsEditMenuTrueReducer, setIsEditMenuFalseReducer} = menuSlice.actions;
export default menuSlice.reducer;