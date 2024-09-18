import {
  createAsyncThunk,
  createSlice,
  AnyAction,
  Dispatch,
} from "@reduxjs/toolkit";
import moment from "moment";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { initialStateProps } from "./OeiType";

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const initialState: initialStateProps = {
  headerFilters: {
    GeoLocation: [],
    Function: [],
    Process: [],
    Asset: [],
  },
  fromDate: fromDateArr[fromDateArr.length - 1],
  toDate: moment(new Date()).format("YYYY-MM-DD"),
  data: {
    FunnelData: [],
    FillIndicator: [],
    BarChart1: {
      chart: {
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      xAxis: [
        {
          categories: [],
          crosshair: false,
        },
      ],
      yAxis: [
        {
          labels: {
            format: "",
          },
          title: {
            text: "",
          },
        },
        {
          title: {
            text: "",
          },
          labels: {
            format: "",
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: [
        {
          enabled: true,
          align: "",
          verticalAlign: "",
          layout: "",
        },
      ],

      colors: [],
      credits: {
        enabled: true,
        text: "",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [],
          },
        },
      },
      series: [],
    },
    BarChart2: {
      chart: {
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      xAxis: [
        {
          categories: [],
          crosshair: false,
        },
      ],
      yAxis: [
        {
          labels: {
            format: "",
          },
          title: {
            text: "",
          },
        },
        {
          title: {
            text: "",
          },
          labels: {
            format: "",
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: [
        {
          enabled: true,
          align: "",
          verticalAlign: "",
          layout: "",
        },
      ],

      colors: [],
      credits: {
        enabled: true,
        text: "",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [],
          },
        },
      },
      series: [],
    },

    LineChart1: {
      chart: {
        type: "",
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      yAxis: {
        title: {
          text: "",
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: "",
        },
      },
      colors: [],
      credits: {
        enabled: true,
        text: "",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [],
          },
        },
      },
      series: [],
    },
    LineChart2: {
      chart: {
        type: "",
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      yAxis: {
        title: {
          text: "",
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: "",
        },
      },
      colors: [],
      credits: {
        enabled: true,
        text: "",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [],
          },
        },
      },
      series: [],
    },
    LineChart3: {
      chart: {
        type: "",
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      yAxis: {
        title: {
          text: "",
        },
      },
      xAxis: {
        accessibility: {
          rangeDescription: "",
        },
      },
      colors: [],
      credits: {
        enabled: true,
        text: "",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [],
          },
        },
      },
      series: [],
    },
  },
  isLoading: false,
  layoutInfo: [],
};

const { OEI_PAGE_DATA, GET_LAYOUT_RESPONSE, UPDATE_LAYOUT, RESET_LAYOUT } =
  EndPoints;

// Define action

const UpdateOEIFilter = createAsyncThunk<any, any>(
  "UpdateOEIFilter",
  async (payload) => {
    return payload;
  }
);
const UpdateOEIDate = createAsyncThunk<any, any>(
  "UpdateOEIDate",
  async (payload) => {
    return payload;
  }
);

const FetchOEIPageData = createAsyncThunk<any, any>(
  "FetchOEIPageData",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(OEI_PAGE_DATA, payload);
    return respFeeds.data.data;
  }
);

const FetchLayout = createAsyncThunk<any, any>(
  "FetchOeiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(GET_LAYOUT_RESPONSE, payload);

    return response.data;
  }
);
const UpdateLayout = createAsyncThunk<any, any>(
  "UpdateOeiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(UPDATE_LAYOUT, payload);
    return response.data;
  }
);
const ResetLayout = createAsyncThunk<any, any>(
  "ResetOeiLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(RESET_LAYOUT, payload);
    return response.data;
  }
);
//logout Button
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

// Create slice
const OEIStoreNew = createSlice({
  name: "OEIStoreNew",
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
    builder.addCase(UpdateOEIFilter.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.headerFilters = action.payload;
    });
    builder.addCase(UpdateOEIDate.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.fromDate = action.payload.startDate;
      state.toDate = action.payload.endDate;
    });
    builder.addCase(FetchOEIPageData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(FetchOEIPageData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(FetchOEIPageData.rejected, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
    });
    // builder.addCase(fetchEntityCreation.rejected, (state, action) => {
    //   // Handle error here
    // });
    builder.addCase(FetchLayout.fulfilled, (state, action) => {
      state.layoutInfo = action.payload;
    });
    builder.addCase(ResetLayout.fulfilled, (state, action) => {
      state.layoutInfo = action.payload;
    });
  },
});

// Export action creators and reducerexport
const {
  resetState,
  // Add action creators here
} = OEIStoreNew.actions;

export default OEIStoreNew.reducer;

export const OEIStoreNewActionCreator = {
  UpdateOEIFilter,
  UpdateOEIDate,
  FetchOEIPageData,
  FetchLayout,
  UpdateLayout,
  ResetState,
  ResetLayout,
};
