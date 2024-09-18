import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TDropdownData } from "../../definition/InsightGridHeaderData";

import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { SecurityPulseGrid } from "../../definition/SecurityPulseGrid";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { RootState } from "../../configureStore";
import { SecurityPulseState } from "./SecurityType";
import moment from "moment";

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const startDate: Date = moment(fromDateArr[fromDateArr.length - 1]).toDate();
const endDate: Date = new Date();

const initialState: SecurityPulseState = {
  dropdownfilters: [] as dropdownfilter[],
  startDate: startDate,
  endDate: endDate,
  gridData: {} as SecurityPulseGrid,
  isGridDataLoading: false,
  isGridDataLoaded: false,
  isGridDataError: false,
  gridDataError: "",
  dropDownData: [] as TDropdownData[],
  isDeleteSecurityPulseLoading: false,
  isDeleteSecurityPulseSuccess: false,
  isDeleteSecurityPulseError: false,
  isDeleteSecurityPulseResp: {} as { message: string; status: string },
  currentPage: 1,
};

export const SecurityPulseGridStore = createSlice({
  name: "SecurityPulsegrid",
  initialState,

  reducers: {
    receiveUpdateSelectedDate: (
      state: SecurityPulseState,
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
    setCurrentPage: (
      state: SecurityPulseState,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    resetState: (state: SecurityPulseState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getGridDataSecurityPulse.pending,
        (state: SecurityPulseState) => {
          return {
            ...state,
            isGridDataLoading: true,
            isGridDataError: false,
          };
        }
      )
      .addCase(
        getGridDataSecurityPulse.fulfilled,
        (
          state: SecurityPulseState,
          action: PayloadAction<SecurityPulseGrid>
        ) => {
          return {
            ...state,
            isGridDataLoaded: true,
            isGridDataLoading: false,
            isGridDataError: false,
            gridData: action.payload,
          };
        }
      )
      .addCase(
        getGridDataSecurityPulse.rejected,
        (state: SecurityPulseState) => {
          return {
            ...state,
            isGridDataError: true,
            isGridDataLoading: false,
          };
        }
      )

      //delete
      .addCase(deleteSecurityPulseData.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isDeleteSecurityPulseLoading: true,
          isDeleteSecurityPulseSuccess: false,
          isDeleteSecurityPulseError: false,
        };
      })
      .addCase(
        deleteSecurityPulseData.fulfilled,
        (
          state: SecurityPulseState,
          action: PayloadAction<{ message: string; status: string }>
        ) => {
          return {
            ...state,
            isDeleteSecurityPulseLoading: false,
            isDeleteSecurityPulseSuccess: true,
            isDeleteSecurityPulseError: false,
            isDeleteSecurityPulseResp: action.payload,
          };
        }
      )
      .addCase(
        deleteSecurityPulseData.rejected,
        (state: SecurityPulseState) => {
          return {
            ...state,
            isDeleteSecurityPulseLoading: false,
            isDeleteSecurityPulseSuccess: false,
            isDeleteSecurityPulseError: true,
          };
        }
      );
  },
});

export const { receiveUpdateSelectedDate, resetState, setCurrentPage } =
  SecurityPulseGridStore.actions;
export default SecurityPulseGridStore.reducer;

const { SECURITY_PULSE_GRID_DATA, SECURITY_PULSE_RECORD_DELETE } = EndPoints;

const getGridDataSecurityPulse = createAsyncThunk<
  SecurityPulseGrid,
  {
    fromDate: Date | string;
    toDate: Date | string;
  },
  CallbackfunctionType
>(
  "getGridDataSecurityPulse",
  async (selectedFilter: {
    fromDate: Date | string;
    toDate: Date | string;
  }) => {
    try {
      const resp = await axiosPrivate.post(
        SECURITY_PULSE_GRID_DATA,
        selectedFilter
      );
      return resp.data;
    } catch (error) {
      throw new Error();
    }
  }
);

const deleteSecurityPulseData = createAsyncThunk<
  { message: string; status: string },
  string,
  CallbackfunctionType
>("deleteSecurityPulseData", async (id) => {
  try {
    const resp = await axiosPrivate.post(SECURITY_PULSE_RECORD_DELETE, {
      id: id,
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

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const receiveCurrentPage =
  (Payload: number) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setCurrentPage(Payload));
  };

export const SecurityPulseGridActionCreator = {
  getGridDataSecurityPulse,
  deleteSecurityPulseData,
  updateSelectedDate,
  ResetState,
  receiveCurrentPage,
};
