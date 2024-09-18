import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { UpdateEntityFilledStatusPayload } from "./EntityType";

const { FETCH_ENTITY_STATUS, UPDATE_ENTITY_STATUS } = EndPoints;

const initialState = {
    page: 0,
};

// Define action

const updateEntityFilledStatus = createAsyncThunk<
    UpdateEntityFilledStatusPayload,
    UpdateEntityFilledStatusPayload
>("updateEntityFilledStatus", async (payload) => {
    // Send update request to API
    const resp = await axiosPrivate.post(UPDATE_ENTITY_STATUS, payload);
    return { page: resp.data.page };
});

const fetchEntityFilledStatus = createAsyncThunk(
    "fetchEntityFilledStatus",
    async (payload) => {
        const resp = await axiosPrivate.post(FETCH_ENTITY_STATUS, {});
        return resp.data.page;
    }
);

// Create slice
const EntityFilledStatusSlice = createSlice({
    name: "EntityFilledStatus",
    initialState,
    reducers: {
        // Add reducers here
    },
    extraReducers: (builder) => {
        // Use builder.addCase() to define extra reducers
        builder.addCase(fetchEntityFilledStatus.fulfilled, (state, action) => {
            // Update state with fetched data on success
            state.page = action.payload;
        });
        builder.addCase(fetchEntityFilledStatus.rejected, (state, action) => {
            // Handle error here
        });
        builder.addCase(updateEntityFilledStatus.fulfilled, (state, action) => {
            // Update state with updated data on success
            state.page = action.payload.page;
        });
        builder.addCase(updateEntityFilledStatus.rejected, (state, action) => {
            // Handle error here
        });
    },
});

// Export action creators and reducerexport
const {
    // Add action creators here
} = EntityFilledStatusSlice.actions;

export default EntityFilledStatusSlice.reducer;

export const entityFilledStatusActionCreator = {
    fetchEntityFilledStatus,
    updateEntityFilledStatus,
};
