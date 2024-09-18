import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { RosiTypes } from "./RosiDashboardTypes";

const {
  GET_DROPDOWN_FILTERS,
  GET_ROSI_CHART,
  GET_INVESTMENT_OPTIMIZATION_CHART,
  GET_FUNCTION_CHART,
  GET_ASSET_CHART,
  GET_LOCATION_CHART,
  GET_TOTAL_INVESTMENT_CHART,
  GET_ROSI_STATUS,
  GET_LAYOUT_RESPONSE,
  UPDATE_LAYOUT,
  RESET_LAYOUT,
} = EndPoints;

const initialState: RosiTypes = {
  all_filter_options: {
    GeoLocation: [],
    Function: [],
    Process: [],
    Asset: [],
  },

  header_filters: {
    function: [],
    process: [],
    geo_location: [],
    asset_category: [],
  },

  chart: {
    rosiChart: {},
    functionChart: {},
    geoLocationChart: {
      all_entity_location: [],
      filtered_location: [],
    },
    investmentOptimizationChart: {},
    assetChart: {},
    totalInvestment: {},
  },

  rosiChartData: [],
  error: "",
  rosiStatus: false,
  isInitial: true,
  isLoading: false,
  layoutInfo: [],
};

export const GetDropdownFilters = createAsyncThunk(
  "GetDropdownFilters",
  async () => {
    const respFeeds = await axiosPrivate.post(GET_DROPDOWN_FILTERS);
    return respFeeds.data.data;
  }
);

const fetchRosiChartData = createAsyncThunk<any, any>(
  "fetchRosiChartData",
  async (payload) => {
    const modifiedPayload = {
      header_filters: {
        function: payload.headerFilters.Function,
        process: payload.headerFilters.Process,
        geo_location: payload.headerFilters.GeoLocation,
        asset_category: payload.headerFilters.Asset,
      },
    };

    const rosiChartData = await axiosPrivate.post(
      GET_ROSI_CHART,
      modifiedPayload
    );

    const functionChartData = await axiosPrivate.post(
      GET_FUNCTION_CHART,
      modifiedPayload
    );

    const geoLocationChartData = await axiosPrivate.post(
      GET_LOCATION_CHART,
      modifiedPayload
    );

    const optimalizationChartData = await axiosPrivate.post(
      GET_INVESTMENT_OPTIMIZATION_CHART,
      modifiedPayload
    );

    const assetChartData = await axiosPrivate.post(
      GET_ASSET_CHART,
      modifiedPayload
    );

    const totalInvestmentData = await axiosPrivate.post(
      GET_TOTAL_INVESTMENT_CHART,
      modifiedPayload
    );

    return {
      header_filters: {
        function: payload.headerFilters.Function,
        process: payload.headerFilters.Process,
        geo_location: payload.headerFilters.GeoLocation,
        asset_category: payload.headerFilters.Asset,
      },

      chart: {
        rosiChart: rosiChartData.data,
        functionChart: functionChartData?.data?.pie_chart_data?.data,
        geoLocationChart: geoLocationChartData.data?.data,
        investmentOptimizationChart: optimalizationChartData.data,
        assetChart: assetChartData.data?.pie_chart_data?.data,
        totalInvestment: totalInvestmentData.data?.response?.data,
      },
    };
  }
);

export const GetRosi = createAsyncThunk("GetRosi", async (data: any) => {
  const respFeeds = await axiosPrivate.post(GET_ROSI_CHART, { ...data });

  return respFeeds.data;
});

export const GetRosiStatus = createAsyncThunk("GetRosiStatus", async () => {
  const respFeeds = await axiosPrivate.post(GET_ROSI_STATUS);
  if (respFeeds.data.status === 200) {
    return true;
  }
  return false;
});
const FetchLayout = createAsyncThunk<any, any>(
  "FetchRosiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(GET_LAYOUT_RESPONSE, payload);
    return response.data;
  }
);
const UpdateLayout = createAsyncThunk<any, any>(
  "UpdateRosiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(UPDATE_LAYOUT, payload);

    return response.data;
  }
);
const ResetLayout = createAsyncThunk<any, any>(
  "ResetRosiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(RESET_LAYOUT, payload);
    return response.data;
  }
);

export const RosiDashboardStore = createSlice({
  name: "RosiDashboardStore",
  initialState,
  reducers: {
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetDropdownFilters.pending, (state, action) => {});
    builder.addCase(GetDropdownFilters.fulfilled, (state, action) => {
      state.all_filter_options = action.payload.headerFilters;
    });
    builder.addCase(GetDropdownFilters.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    builder.addCase(fetchRosiChartData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(fetchRosiChartData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.header_filters = action.payload.header_filters;
      state.chart = {
        ...action.payload.chart,
      };
    });

    //legacy remove this
    builder.addCase(GetRosi.fulfilled, (state, action) => {
      state.rosiChartData = action.payload;
    });

    // Update The Status Of ROSI Journey
    builder.addCase(GetRosiStatus.fulfilled, (state, action) => {
      state.rosiStatus = action.payload as any;
      state.isInitial = false;
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
export const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const { resetState } = RosiDashboardStore.actions;
export default RosiDashboardStore.reducer;
export const RosiActionCreator = {
  fetchRosiChartData,
  GetDropdownFilters,
  FetchLayout,
  UpdateLayout,
  ResetState,
  ResetLayout,
};
