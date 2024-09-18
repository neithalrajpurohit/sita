import {
  AnyAction,
  Dispatch,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import moment from "moment";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { internalFilterArray } from "../../utils/InsightDataCal";
import { isEqual, cloneDeep } from "lodash";
import { initialStateProps } from "./InsightType";
const { GET_LAYOUT_RESPONSE, UPDATE_LAYOUT, RESET_LAYOUT } = EndPoints;
// interface TOEIProps {
//   FunnelData: { color: string; text: string; value: number }[];
//   FillIndicator: { color: string; title: string; val: number }[];
//   BarChart1: TBarChartDataProps;
//   BarChart2: TBarChartDataProps;
//   BarChart3: TBarChartDataProps;
//   LineChart: TLineChartDataProps;
// }
// Define the payload type for the action

// Define the type for the response from the API

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);
// Define initial state
const initialState: initialStateProps = {
  headerFilters: {
    GeoLocation: [],
    Function: [],
    Process: [],
    Asset: [],
  },
  fromDate: fromDateArr[fromDateArr.length - 1],
  toDate: moment(new Date()).format("YYYY-MM-DD"),
  data: [],
  isLoading: false,
  internalFilters: [],
  layoutInfo: [],
};

const { INSIGHT_PAGE_DATA } = EndPoints;

// Define action

const UpdateInsightFilters = createAsyncThunk<any, any>(
  "UpdateInsightFilters",
  async (payload) => {
    return payload;
  }
);

const UpdateInsightDate = createAsyncThunk<any, any>(
  "UpdateInsightDate",
  async (payload) => {
    return payload;
  }
);
const UpdatedInternalFilters = createAsyncThunk<any, any>(
  "UpdatedInternalFilters",
  async (payload) => {
    const filteredArr = internalFilterArray(payload);
    return filteredArr;
  }
);

const FetchInsightPageData = createAsyncThunk<any, any>(
  "FetchInsightPageData",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(INSIGHT_PAGE_DATA, payload);
    return respFeeds.data.data;
  }
);

//logout Button
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const FetchLayout = createAsyncThunk<any, any>(
  "FetchInsightLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(GET_LAYOUT_RESPONSE, payload);

    return response.data;
  }
);
const UpdateLayout = createAsyncThunk<any, any>(
  "UpdateInsightLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(UPDATE_LAYOUT, payload);
    return response.data;
  }
);
const ResetLayout = createAsyncThunk<any, any>(
  "ResetInsightLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(RESET_LAYOUT, payload);
    return response.data;
  }
);
// Create slice
const InsightStoreNew = createSlice({
  name: "InsightStoreNew",
  initialState,
  reducers: {
    // Add reducers here
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(UpdateInsightFilters.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.headerFilters = action.payload;
    });
    builder.addCase(UpdatedInternalFilters.fulfilled, (state, action) => {
      // Update state with fetched data on success
      let newArr: { key: string; value: string }[];
      const prvState = cloneDeep([...state.internalFilters]);
      const payload = cloneDeep([...action.payload]);
      const merged = internalFilterArray([...prvState, ...payload]);
      if (isEqual(prvState, merged)) {
        newArr = [];
      } else {
        newArr = merged;
      }
      state.internalFilters = newArr;
    });

    builder.addCase(UpdateInsightDate.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.fromDate = action.payload.startDate;
      state.toDate = action.payload.endDate;
    });

    builder.addCase(FetchInsightPageData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(FetchInsightPageData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.internalFilters = [];
      state.data = action.payload;
    });
    builder.addCase(FetchInsightPageData.rejected, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
    });
    builder.addCase(FetchLayout.fulfilled, (state, action) => {
      state.layoutInfo = [];
      state.layoutInfo = action.payload;
    });
    builder.addCase(ResetLayout.fulfilled, (state, action) => {
      // state.layoutInfo = [];
      // state.layoutInfo = action.payload;
    });
  },
});

// Export action creators and reducerexport
const {
  resetState,
  // Add action creators here
} = InsightStoreNew.actions;

export default InsightStoreNew.reducer;

export const InsightStoreNewActionCreator = {
  UpdateInsightDate,
  UpdateInsightFilters,
  FetchInsightPageData,
  UpdatedInternalFilters,
  ResetState,
  FetchLayout,
  UpdateLayout,
  ResetLayout,
};
