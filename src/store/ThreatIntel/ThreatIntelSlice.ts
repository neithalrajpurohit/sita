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
import { initialThreatIntelStateProps } from "./ThreatIntelType";

const {
  CYBLE_MODULE_SUBSCRIPTION,
  CYBER_CRIME_PIECHART,
  ATTACK_SURFACE_PIECHART,
  DARK_WEB_PIECHART,
  BRAND_INTELLIGENCE_PIECHART,
  CYBLE_SERVICE_GRID,
  ATTACK_SURFACE_BARCHART,
  DARK_WEB_BARCHART,
  CYBER_CRIME_BARCHART,
  BRAND_INTELLIGENCE_BARCHART,
} = EndPoints;

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);
// Define initial state
const initialState: initialThreatIntelStateProps = {
  subscribedModules: [],
  headerFilters: {
    services: [],
    status: [],
    severity: [],
  },
  fromDate: fromDateArr[fromDateArr.length - 1],
  toDate: moment(new Date()).format("YYYY-MM-DD"),
  isLoading: false,
  grid: {
    gridData: [],
    gridHeader: [],
  },
  attackSurfacePieChart: {
    title: "",
    data: [],
    inner_value_1: "",
    inner_value_2: "",
  },
  attackSurfaceBarChart: {
    category: [],
    data: [],
    datalabels: false,
    title: "",
    y_axis_label: "",
  },
  darkWebPieChart: {
    title: "",
    data: [],
    inner_value_1: "",
    inner_value_2: "",
  },
  darkWebBarChart: {
    category: [],
    data: [],
    datalabels: false,
    title: "",
    y_axis_label: "",
  },
  cyberCrimePieChart: {
    title: "",
    data: [],
    inner_value_1: "",
    inner_value_2: "",
  },
  cyberCrimeBarChart: {
    category: [],
    data: [],
    datalabels: false,
    title: "",
    y_axis_label: "",
  },
  brandIntelligencePieChart: {
    title: "",
    data: [],
    inner_value_1: "",
    inner_value_2: "",
  },
  brandIntelligenceBarChart: {
    category: [],
    data: [],
    datalabels: false,
    title: "",
    y_axis_label: "",
  },
  currentActiveCharts: {
    attack_surface: "pie",
    dark_web: "pie",
    cyber_crime: "pie",
    brand_intelligence: "pie",
  },
};

// Define action

const FetchCybleModuleSubsciption = createAsyncThunk(
  "FetchCybleModuleSubsciption",
  async () => {
    const respFeeds = await axiosPrivate.post(CYBLE_MODULE_SUBSCRIPTION, {});
    return respFeeds.data.data;
  }
);

const FetchAttackSurfacePieChart = createAsyncThunk<any, any>(
  "FetchAttackSurfacePieChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(ATTACK_SURFACE_PIECHART, payload);
    return respFeeds.data.data;
  }
);

const FetchAttackSurfaceBarChart = createAsyncThunk<any, any>(
  "FetchAttackSurfaceBarChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(ATTACK_SURFACE_BARCHART, payload);
    return respFeeds.data.data;
  }
);

const FetchDarkWebPieChart = createAsyncThunk<any, any>(
  "FetchDarkWebPieChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(DARK_WEB_PIECHART, payload);
    return respFeeds.data.data;
  }
);
const FetchDarkWebBarChart = createAsyncThunk<any, any>(
  "FetchDarkWebBarChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(DARK_WEB_BARCHART, payload);
    return respFeeds.data.data;
  }
);

const FetchCyberCrimePieChart = createAsyncThunk<any, any>(
  "FetchCyberCrimePieChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(CYBER_CRIME_PIECHART, payload);
    return respFeeds.data.data;
  }
);
const FetchCyberCrimeBarChart = createAsyncThunk<any, any>(
  "FetchCyberCrimeBarChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(CYBER_CRIME_BARCHART, payload);
    return respFeeds.data.data;
  }
);

const FetchBrandIntelligencePieChart = createAsyncThunk<any, any>(
  "FetchBrandIntelligencePieChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(
      BRAND_INTELLIGENCE_PIECHART,
      payload
    );
    return respFeeds.data.data;
  }
);
const FetchBrandIntelligenceBarChart = createAsyncThunk<any, any>(
  "FetchBrandIntelligenceBarChart",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(
      BRAND_INTELLIGENCE_BARCHART,
      payload
    );
    return respFeeds.data.data;
  }
);

const FetchThreatIntelGridData = createAsyncThunk<any, any>(
  "FetchThreatIntelGridData",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(CYBLE_SERVICE_GRID, payload);
    return {
      gridData: respFeeds.data.data.gridData,
      gridHeader: respFeeds.data.data.gridHeader,
    };
  }
);

//logout Button
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const UpdateThreatIntelFilter =
  (payload: any) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(UpdateThreatIntelFilters(payload));
  };

const UpdateThreatIntelDates =
  (payload: any) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(UpdateThreatIntelDate(payload));
  };
const UpdateCurrentActiveCharts =
  (payload: any) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(updateASCType(payload));
  };

// Create slice
const ThreatIntelStore = createSlice({
  name: "ThreatIntelStore",
  initialState,
  reducers: {
    // Add reducers here
    UpdateThreatIntelFilters: (state, action) => {
      return {
        ...state,
        headerFilters: action.payload, // Set the headerFilters property with action.payload
      };
    },
    UpdateThreatIntelDate: (state, action) => {
      return {
        ...state,
        fromDate: action.payload.startDate,
        toDate: action.payload.endDate,
      };
    },
    updateASCType: (state, action) => {
      return {
        ...state,
        currentActiveCharts: action.payload,
      };
    },
    resetState: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(FetchCybleModuleSubsciption.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.subscribedModules = action.payload.subscribed_modules;
    });

    builder.addCase(FetchThreatIntelGridData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(FetchThreatIntelGridData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.grid = action.payload;
    });
    builder.addCase(FetchThreatIntelGridData.rejected, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
    });
    builder.addCase(FetchAttackSurfacePieChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.attackSurfacePieChart = action.payload;
    });
    builder.addCase(
      FetchBrandIntelligencePieChart.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.brandIntelligencePieChart = action.payload;
      }
    );
    builder.addCase(FetchCyberCrimePieChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.cyberCrimePieChart = action.payload;
    });
    builder.addCase(FetchDarkWebPieChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.darkWebPieChart = action.payload;
    });

    //Bar Chart Reducers
    builder.addCase(FetchAttackSurfaceBarChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.attackSurfaceBarChart = action.payload;
    });
    builder.addCase(
      FetchBrandIntelligenceBarChart.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.brandIntelligenceBarChart = action.payload;
      }
    );
    builder.addCase(FetchCyberCrimeBarChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.cyberCrimeBarChart = action.payload;
    });
    builder.addCase(FetchDarkWebBarChart.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.darkWebBarChart = action.payload;
    });
  },
});

// Export action creators and reducerexport
const {
  resetState,
  UpdateThreatIntelFilters,
  UpdateThreatIntelDate,
  updateASCType,
  // Add action creators here
} = ThreatIntelStore.actions;

export default ThreatIntelStore.reducer;

export const ThreatIntelStoreActionCreator = {
  UpdateCurrentActiveCharts,
  UpdateThreatIntelDates,
  UpdateThreatIntelFilter,
  FetchCybleModuleSubsciption,
  FetchAttackSurfacePieChart,
  FetchBrandIntelligencePieChart,
  FetchCyberCrimePieChart,
  FetchDarkWebPieChart,
  FetchThreatIntelGridData,
  FetchAttackSurfaceBarChart,
  FetchBrandIntelligenceBarChart,
  FetchCyberCrimeBarChart,
  FetchDarkWebBarChart,
  ResetState,
};
