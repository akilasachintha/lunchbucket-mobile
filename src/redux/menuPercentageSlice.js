import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {log} from "../helpers/logs/log";
import {
    menuPercentageDinnerForThreeIDsService,
    menuPercentageDinnerForTwoIDsService,
    menuPercentageLunchForThreeIDsService,
    menuPercentageLunchForTwoIDsService
} from "../services/menuPercentageService";

export const fetchMenuPercentageDinnerForTwoIDs = createAsyncThunk(
    'menuPercentage/fetchMenuPercentageDinnerForTwoIDs',
    async ({id1, id2}) => {
        try {
            if (!id1 || !id2) {
                log("error", "menuPercentageSlice", "fetchMenuPercentage", "id1 or id2 is null", "menuPercentageSlice.js");
            }

            const result = await menuPercentageDinnerForTwoIDsService(id1, id2);
            if (result === "error") {
                return "error";
            } else {
                return result;
            }

        } catch (e) {
            log("error", "menuPercentageSlice", "fetchMenuPercentage", e.message, "menuPercentageSlice.js");
        }
    }
);

export const fetchMenuPercentageLunchForTwoIDs = createAsyncThunk(
    'menuPercentage/fetchMenuPercentageLunchForTwoIDs',
    async ({id1, id2}) => {
        try {
            if (!id1 || !id2) {
                log("error", "menuPercentageSlice", "fetchMenuPercentage", "id1 or id2 is null", "menuPercentageSlice.js");
            }

            const result = await menuPercentageLunchForTwoIDsService(id1, id2);
            if (result === "error") {
                return "error";
            } else {
                return result;
            }
        } catch (e) {
            log("error", "menuPercentageSlice", "fetchMenuPercentage", e.message, "menuPercentageSlice.js");
        }
    }
);

export const fetchMenuPercentageDinnerForThreeIDs = createAsyncThunk(
    'menuPercentage/fetchMenuPercentageDinnerForThreeIDs',
    async ({id1, id2, id3}) => {
        try {
            if (!id1 || !id2 || !id3) {
                log("error", "menuPercentageSlice", "fetchMenuPercentage", "id1 or id2 is null", "menuPercentageSlice.js");
            }

            const result = await menuPercentageDinnerForThreeIDsService(id1, id2, id3);
            if (result === "error") {
                return "error";
            } else {
                return result;
            }
        } catch (e) {
            log("error", "menuPercentageSlice", "fetchMenuPercentage", e.message, "menuPercentageSlice.js");
        }
    }
);

export const fetchMenuPercentageLunchForThreeIDs = createAsyncThunk(
    'menuPercentage/fetchMenuPercentageLunchForThreeIDs',
    async ({id1, id2, id3}) => {
        try {
            if (!id1 || !id2 || !id3) {
                log("error", "menuPercentageSlice", "fetchMenuPercentage", "id1 or id2 or id3 is null", "menuPercentageSlice.js");
            }

            const result = await menuPercentageLunchForThreeIDsService(id1, id2, id3);
            if (result === "error") {
                return "error";
            } else {
                return result;
            }
        } catch (e) {
            log("error", "menuPercentageSlice", "fetchMenuPercentage", e.message, "menuPercentageSlice.js");
        }
    }
);

const initialState = {
    menuPercentageDinnerForTwoIDs: {},
    menuPercentageLunchForTwoIDs: {},
    menuPercentageDinnerForThreeIDs: {},
    menuPercentageLunchForThreeIDs: {},
    loading: "idle",
}

const menuPercentageSlice = createSlice({
    name: 'menuPercentage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuPercentageDinnerForTwoIDs.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchMenuPercentageDinnerForTwoIDs.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.menuPercentageDinnerForTwoIDs = action.payload;
            })
            .addCase(fetchMenuPercentageDinnerForTwoIDs.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(fetchMenuPercentageLunchForTwoIDs.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchMenuPercentageLunchForTwoIDs.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.menuPercentageLunchForTwoIDs = action.payload;
            })
            .addCase(fetchMenuPercentageLunchForTwoIDs.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(fetchMenuPercentageDinnerForThreeIDs.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchMenuPercentageDinnerForThreeIDs.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.menuPercentageDinnerForThreeIDs = action.payload;
            })
            .addCase(fetchMenuPercentageDinnerForThreeIDs.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(fetchMenuPercentageLunchForThreeIDs.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchMenuPercentageLunchForThreeIDs.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.menuPercentageLunchForThreeIDs = action.payload;
            })
            .addCase(fetchMenuPercentageLunchForThreeIDs.rejected, (state) => {
                state.loading = "failed";
            });
    }
});

export default menuPercentageSlice.reducer;