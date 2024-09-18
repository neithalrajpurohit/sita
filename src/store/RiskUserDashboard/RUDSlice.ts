import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";

import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { InitialStateRUD } from "./RUDTypes";

const {
  GET_FUNCTION_DATA,
  GET_PROCESS_DATA,
  GET_HEAT_MAP_DATA,
  GET_RISK_AGGR_BAR_CHART_DATA,
  GET_RISK_AGGREGATION,
  MASTER_FILTERS,
  GET_RISK_LOCATION_DATA,
} = EndPoints;

const initialState: InitialStateRUD = {
  all_filter_options: {
    GeoLocation: [],
    Function: [],
    Process: [],
    Asset: [],
  },
  header_filters: {
    geo_location: [],
    function: [],
    process: [],
    asset: [],
  },
  isLoading: false,
  chart: {
    function_chart: {
      title: "",
      category: [],
      data: [],
      y_axis_label: "",
    },
    process_chart: {
      title: "",
      category: [],
      data: [],
      y_axis_label: "",
    },
    risk_aggr_bar_chart: {
      title: "",
      category: [],
      data: [],
      y_axis_label: "",
    },
    heat_map_data: {
      title: "",
      xCategory: [],
      yCategory: [],
      data: [],
      colorAxis: {
        min: 0,
        stops: [],
      },
    },
    inherent_risk: {
      title: "",
      inner_value_1: "",
      inner_value_2: "",
      budget_value: "",
      colors: [],
      data: [],
    },
    residual_risk: {
      title: "",
      inner_value_1: "",
      inner_value_2: "",
      budget_value: "",
      colors: [],
      data: [],
    },
    geo_locations: {
      all_entity_location: [],
      filtered_location: [],
    },
  },
  heatmap_data_point: {},
};

const setLoading = createAsyncThunk<any, boolean>(
  "setLoading",
  async (payload) => {
    return payload;
  }
);

const fetchMaterFilters = createAsyncThunk("fetchMaterFilters", async () => {
  const respFeeds = await axiosPrivate.post(MASTER_FILTERS, {});
  return respFeeds.data.data.headerFilters;
});

const fetchChartData = createAsyncThunk<any, any>(
  "fetchChartData",
  async (payload) => {
    const modifiedPayload = {
      header_filters: {
        geo_location: payload.headerFilters.GeoLocation,
        function: payload.headerFilters.Function,
        process: payload.headerFilters.Process,
        asset: [],
      },
    };

    const functionChart = await axiosPrivate.post(
      GET_FUNCTION_DATA,
      modifiedPayload
    );
    const processChart = await axiosPrivate.post(
      GET_PROCESS_DATA,
      modifiedPayload
    );
    const locationChart = await axiosPrivate.post(
      GET_RISK_LOCATION_DATA,
      modifiedPayload
    );
    const heatMap = await axiosPrivate.post(GET_HEAT_MAP_DATA, modifiedPayload);
    const riskPieChart = await axiosPrivate.post(
      GET_RISK_AGGREGATION,
      modifiedPayload
    );
    const riskBarChart = await axiosPrivate.post(
      GET_RISK_AGGR_BAR_CHART_DATA,
      modifiedPayload
    );

    return {
      header_filters: {
        geo_location: payload.headerFilters.GeoLocation,
        function: payload.headerFilters.Function,
        process: payload.headerFilters.Process,
        asset: [],
      },
      chart: {
        heat_map_data: heatMap.data.heat_map_data,
        risk_aggr_bar_chart: riskBarChart.data.risk_aggr_bar_chart,
        inherent_risk: riskPieChart.data.inherent_risk,
        residual_risk: riskPieChart.data.residual_risk,
        geo_locations: locationChart.data.data,
        function_chart: {
          title: functionChart.data.title,
          category: functionChart.data.category,
          data: functionChart.data.data,
          y_axis_label: functionChart.data.y_axis_label,
        },
        process_chart: {
          title: processChart.data.title,
          category: processChart.data.category,
          data: processChart.data.data,
          y_axis_label: processChart.data.y_axis_label,
        },
      },
    };
  }
);

export const RUDSlice = createSlice({
  name: "RUDSlice",
  initialState,
  reducers: {
    updateHeatMapData: (state, action) => {
      return {
        ...state,
        heatmap_data_point: action.payload, // Set the headerFilters property with action.payload
      };
    },
    resetState: (state: InitialStateRUD) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setLoading.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = action.payload;
    });
    builder.addCase(fetchMaterFilters.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.all_filter_options = action.payload;
    });
    builder.addCase(fetchChartData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.header_filters = action.payload.header_filters;
      state.chart = {
        ...action.payload.chart,
      };
    });
  },
});

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const UpdateHeatMapDataPoint =
  (payload: any) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(updateHeatMapData(payload));
  };

const {
  // Add action creators here
  updateHeatMapData,
  resetState,
} = RUDSlice.actions;

export default RUDSlice.reducer;

export const RUDActionCreator = {
  ResetState,
  setLoading,
  fetchChartData,
  fetchMaterFilters,
  UpdateHeatMapDataPoint,
};
