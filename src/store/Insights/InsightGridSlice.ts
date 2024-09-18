import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { RootState } from "../../configureStore";

import { IGrid } from "../../definition/GridData";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import {
  dropdownfilter,
  TRequestPayloadOfGrid,
} from "../../definition/InsightGridStoreProps";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { InsightsState } from "./InsightType";
import moment from "moment";

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const startDate: Date = moment(fromDateArr[fromDateArr.length - 1]).toDate();
const endDate: Date = new Date();

const initialState: InsightsState = {
  isGridDataLoading: false,
  isGridDataLoaded: false,
  GridData: {} as IGrid,
  isGridDataError: false,
  startDate: startDate,
  endDate: endDate,
  dropdownfilters: [] as dropdownfilter[],

  isRequestResolutionLoading: false,
  isRequestResolutionLoaded: false,
  requestResoluationResponse: null,
  isRequestResolutionError: false,
  requestResoluationStatus: false,

  isRequestUserCommentLoading: false,
  isRequestUserCommentLoaded: false,
  requestUserCommentResponse: null,
  isRequestUserCommentError: false,
  requestUserCommentStatus: false,

  dropDownData: [] as TDropdownData[],
  currentPage: 1,
};

export const InsightsStore = createSlice({
  name: "InsightGrid",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    receiveUpdateSelectedDate: (
      state: InsightsState,
      action: PayloadAction<{
        startDate: Date;
        endDate: Date;
      }>
    ) => {
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    },
    receiveUpdateSelectedDropdownFilters: (
      state: InsightsState,
      action: PayloadAction<dropdownfilter[]>
    ) => {
      return {
        ...state,
        dropdownfilters: action.payload,
      };
    },
    setCurrentPage: (state: InsightsState, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    resetState: (state: InsightsState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInsightGridDetails.pending, (state: InsightsState) => {
        return {
          ...state,
          isGridDataLoading: true,
          isGridDataLoaded: false,
          isGridDataError: false,
        };
      })
      .addCase(
        getInsightGridDetails.fulfilled,
        (state: InsightsState, action: PayloadAction<IGrid>) => {
          return {
            ...state,
            isGridDataLoading: false,
            isGridDataError: false,
            isGridDataLoaded: true,
            GridData: action.payload,
          };
        }
      )
      .addCase(getInsightGridDetails.rejected, (state: InsightsState) => {
        return {
          ...state,
          isGridDataLoading: false,
          isGridDataError: true,
          isGridDataLoaded: false,
        };
      })
      .addCase(requestResolutionRequest.pending, (state: InsightsState) => {
        return {
          ...state,
          isRequestResolutionLoading: true,
          isRequestResolutionLoaded: false,
          isRequestResolutionError: false,
        };
      })
      .addCase(
        requestResolutionRequest.fulfilled,
        (
          state: InsightsState,
          action: PayloadAction<{ msg: string; status: boolean }>
        ) => {
          return {
            ...state,
            isRequestResolutionLoading: false,
            isRequestResolutionLoaded: true,
            requestResoluationResponse: action.payload.msg,
            requestResoluationStatus: action.payload.status,
            isRequestResolutionError: false,
          };
        }
      )
      .addCase(requestResolutionRequest.rejected, (state: InsightsState) => {
        return {
          ...state,
          isRequestResolutionLoading: false,
          isRequestResolutionLoaded: false,
          isRequestResolutionError: true,
          requestResoluationStatus: false,
        };
      })
      .addCase(requestUserCommentRequest.pending, (state: InsightsState) => {
        return {
          ...state,
          isRequestUserCommentLoading: true,
          isRequestUserCommentLoaded: false,
          isRequestUserCommentError: false,
        };
      })
      .addCase(
        requestUserCommentRequest.fulfilled,
        (
          state: InsightsState,
          action: PayloadAction<{ msg: string; status: boolean }>
        ) => {
          //   return {
          //     ...state,
          //     isRequestUserCommentLoading: false,
          //     isRequestUserCommentLoaded: true,
          //     requestUserCommentResponse: action.payload.msg,
          //     requestUserCommentStatus: action.payload.status,
          //     isRequestUserCommentError: false,
          //   };
          state.isRequestUserCommentLoading = false;
          state.isRequestUserCommentLoaded = true;
          state.requestUserCommentResponse = action.payload.msg;
          state.isRequestUserCommentError = false;
          state.requestUserCommentStatus = action.payload.status;
        }
      )
      .addCase(requestUserCommentRequest.rejected, (state: InsightsState) => {
        // return {
        //     ...state,
        //     isRequestUserCommentLoading: false,
        //     isRequestUserCommentLoaded: false,
        //     isRequestUserCommentError: true,
        //     requestUserCommentStatus: false,
        // };
        state.isRequestUserCommentLoading = false;
        state.isRequestUserCommentLoaded = false;
        state.isRequestUserCommentError = true;
        state.requestUserCommentStatus = false;
      })
      .addCase(
        getInsightDropDownData.fulfilled,
        (state: InsightsState, action: PayloadAction<TDropdownData[]>) => {
          return {
            ...state,
            dropDownData: action.payload,
            // dropdownfilters: [],
          };
        }
      );
  },
});

export const {
  receiveUpdateSelectedDate,
  receiveUpdateSelectedDropdownFilters,
  resetState,
  setCurrentPage,
} = InsightsStore.actions;

export default InsightsStore.reducer;

const {
  INSIGHT_TICKETS,
  ASSIGN_TASK,
  INSIGHT_INCIDENT_COMMENT,
  INSIGHT_GRID_MASTER_DROPDOWNS,
} = EndPoints;

const getInsightGridDetails = createAsyncThunk<
  IGrid,
  TRequestPayloadOfGrid,
  CallbackfunctionType
>("getInsightGridDetails", async (filters) => {
  try {
    const resp = await axiosPrivate.post(INSIGHT_TICKETS, filters);
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const requestResolutionRequest = createAsyncThunk<
  { msg: string; status: boolean },
  any,
  CallbackfunctionType
>("requestResolutionRequest", async (resolutionPayload) => {
  try {
    const resp = await axiosPrivate.post(ASSIGN_TASK, resolutionPayload);
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const requestUserCommentRequest = createAsyncThunk<
  { msg: string; status: boolean },
  any,
  CallbackfunctionType
>("requestUserCommentRequest", async (resolutionPayload) => {
  try {
    const resp = await axiosPrivate.post(
      INSIGHT_INCIDENT_COMMENT,
      resolutionPayload
    );
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const getInsightDropDownData = createAsyncThunk<
  TDropdownData[],
  string,
  CallbackfunctionType
>("getInsightDropDownData", async (selectedOption) => {
  try {
    const resp = await axiosPrivate.post(INSIGHT_GRID_MASTER_DROPDOWNS, {
      selectedOption: selectedOption,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const updateSelectedDate =
  (selectedDates: { startDate: Date; endDate: Date }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receiveUpdateSelectedDate(selectedDates));
  };

const updateSelectedDropdownFilters =
  (selectedOption: dropdownfilter[]) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receiveUpdateSelectedDropdownFilters(selectedOption));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const receiveCurrentPage =
  (Payload: number) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setCurrentPage(Payload));
  };

export const InsightGridActionCreators = {
  // getInsightDetails,
  getInsightGridDetails,
  updateSelectedDate,
  updateSelectedDropdownFilters,
  requestResolutionRequest,
  getInsightDropDownData,
  requestUserCommentRequest,
  receiveCurrentPage,
  ResetState,
};
