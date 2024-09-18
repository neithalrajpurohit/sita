import {
    AnyAction,
    createAsyncThunk,
    createSlice,
    Dispatch,
    PayloadAction,
} from "@reduxjs/toolkit";
import { IncidentDetails } from "../../definition/InsightDetails";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { InsightDetailsState, FetchDataParams } from "./InsightType";

const initialState: InsightDetailsState = {
    insightDetailsData: {} as any,
    isLoading: false,
    isLoaded: false,
    isError: false,
    error: "",
    selectedIncidentId: "",
    id: "",
    isCloseIncident: false,
    isCloseIncidentLoading: false,
    isAddUpdateLoading: false,
    isAddUpdateResp: {} as { message: string; status: number },
    isAddUpdateError: false,
};

export const InsightDetailsStore = createSlice({
    name: "InsightDetails",
    initialState,

    reducers: {
        receiveIncidentId: (
            state: InsightDetailsState,
            action: PayloadAction<string>
        ) => {
            return {
                ...state,
                selectedIncidentId: action.payload,
            };
        },
        receiveId: (
            state: InsightDetailsState,
            action: PayloadAction<string | number>
        ) => {
            return {
                ...state,
                id: action.payload,
            };
        },
        resetAddUpdate: (state: InsightDetailsState) => {
            return {
                ...state,
                isAddUpdateLoading: false,
                isAddUpdateError: false,
                isAddUpdateResp: {} as { message: string; status: number },
            };
        },
        resetState: (state: InsightDetailsState) => {
            return {
                ...initialState,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getInsightDetailsData.pending,
                (state: InsightDetailsState) => {
                    return {
                        ...state,
                        isLoading: true,
                        isError: false,
                    };
                }
            )
            .addCase(
                getInsightDetailsData.fulfilled,
                (
                    state: InsightDetailsState,
                    action: PayloadAction<IncidentDetails>
                ) => {
                    return {
                        ...state,
                        isLoading: false,
                        isError: false,
                        isLoaded: true,
                        insightDetailsData: action.payload,
                        isCloseIncident: false,
                    };
                }
            )
            .addCase(
                getInsightDetailsData.rejected,
                (state: InsightDetailsState) => {
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                    };
                }
            )
            .addCase(closeIncident.pending, (state: InsightDetailsState) => {
                return {
                    ...state,
                    isCloseIncidentLoading: true,
                };
            })
            .addCase(
                closeIncident.fulfilled,
                (
                    state: InsightDetailsState,
                    action: PayloadAction<boolean>
                ) => {
                    return {
                        ...state,
                        isCloseIncidentLoading: false,
                        isCloseIncident: action.payload,
                    };
                }
            )
            .addCase(addUpdate.pending, (state: InsightDetailsState) => {
                return {
                    ...state,
                    isAddUpdateLoading: true,
                    isAddUpdateError: false,
                };
            })
            .addCase(
                addUpdate.fulfilled,
                (
                    state: InsightDetailsState,
                    action: PayloadAction<{ message: string; status: number }>
                ) => {
                    return {
                        ...state,
                        isAddUpdateLoading: false,
                        isAddUpdateError: false,
                        isAddUpdateResp: action.payload,
                    };
                }
            )
            .addCase(addUpdate.rejected, (state: InsightDetailsState) => {
                return {
                    ...state,
                    isAddUpdateLoading: false,
                    isAddUpdateError: true,
                };
            });
    },
});

export const { receiveIncidentId, resetAddUpdate, resetState, receiveId } =
    InsightDetailsStore.actions;
export default InsightDetailsStore.reducer;

const { ASSET_DETAILS, INCIDENT_CLOSE, ADD_UPDATE } = EndPoints;

const getInsightDetailsData = createAsyncThunk<
    IncidentDetails,
    FetchDataParams,
    CallbackfunctionType
>("getInsightDetailsData", async (params, thunkApi) => {
    const { incidentId, Id } = params;
    try {
        thunkApi.dispatch(receiveIncidentId(incidentId));
        thunkApi.dispatch(receiveId(Id));
        const resp = await axiosPrivate.post(ASSET_DETAILS, {
            incidentId: incidentId,
            id: Id,
        });
        return resp.data;
    } catch (error) {
        throw new Error();
    }
});

const closeIncident = createAsyncThunk<boolean, void, CallbackfunctionType>(
    "closeIncident",
    async (_, thunkApi) => {
        try {
            const resp = await axiosPrivate.post(INCIDENT_CLOSE, {
                incidentId:
                    thunkApi.getState().InsightDetails.selectedIncidentId,
            });
            return resp.data;
        } catch (error) {
            throw new Error();
        }
    }
);

const addUpdate = createAsyncThunk<
    { message: string; status: number },
    { incident: string; update: string; update_by: string },
    CallbackfunctionType
>("addUpdate", async (userInput) => {
    try {
        const resp = await axiosPrivate.post(ADD_UPDATE, userInput);
        return resp.data;
    } catch (error) {
        throw new Error();
    }
});

const ResetState =
    () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
        dispatch(resetState());
    };

export const InsightDetailsActionCreator = {
    getInsightDetailsData,
    closeIncident,
    addUpdate,
    ResetState,
};
