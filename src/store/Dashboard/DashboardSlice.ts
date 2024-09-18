import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";
import { DashboardSession } from "../../definition/DashboardPage";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { Dayfilter } from "./DashboardType";
import moment from "moment";

const {
  DASHBOARD_DATA,
  CYBLEFEEDS,
  GET_LAYOUT_RESPONSE,
  UPDATE_LAYOUT,
  RESET_LAYOUT,
} = EndPoints;

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const initialState: DashboardSession = {
  session: {
    insights: {} as Dayfilter,
    oei: {} as Dayfilter,
    perspective: {} as Dayfilter,
  },
  fromDate: fromDateArr[fromDateArr.length - 1],
  toDate: moment(new Date()).format("YYYY-MM-DD"),
  data: {
    funnel: [],
    oei: [],
    perspective: {
      gridAddOn: {
        showFirstColumnAsCheckbox: false,
        showLastColumnAsAction: true,
      },
      gridHeader: [],
      gridData: [],
    },
    insight: {
      chart: {
        type: "",
        zoomType: "",
      },
      title: {
        text: "",
        align: "",
      },
      xAxis: {
        categories: [],
        crosshair: false,
      },
      yAxis: {
        min: 0,
        title: {
          text: "",
        },
      },
      colors: ["#FF0000", "#FFA500", "#FFFF00", "#00FF00"],
      credits: {
        enabled: true,
        text: "Powered By Netrum",
        href: "",
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "downloadSVG",
              "downloadCSV",
              "downloadXLS",
            ],
          },
        },
      },
      series: [],
    },
  },
  isLoading: false,
  cybledata: [],
  selectedCybleId: 0,
  layoutInfo: [],

  // pdfData: null,
};

const UpdateDashboardDate = createAsyncThunk<any, any>(
  "UpdateDashboardDate",
  async (payload) => {
    return payload;
  }
);

const FetchDashboardPageData = createAsyncThunk<any, any>(
  "FetchDashboardPageData",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(DASHBOARD_DATA, payload);
    return respFeeds.data;
  }
);
const FetchCybleFeeds = createAsyncThunk<any, string>(
  "FetchCybleFeeds",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(CYBLEFEEDS, { id: payload });
    return respFeeds.data;
  }
);

const SelectedCybleID = createAsyncThunk<any, number>(
  "SelectedCybleID",
  async (payload) => {
    return payload;
  }
);

const FetchLayout = createAsyncThunk<any, any>(
  "FetchLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(GET_LAYOUT_RESPONSE, payload);

    return response.data;
  }
);
const UpdateLayout = createAsyncThunk<any, any>(
  "UpdateLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(UPDATE_LAYOUT, payload);

    return response.data;
  }
);
const ResetLayout = createAsyncThunk<any, any>(
  "ResetLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(RESET_LAYOUT, payload);
    return response.data;
  }
);
export const DashboardPageStore = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    resetState: (state: DashboardSession) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers

    builder.addCase(UpdateDashboardDate.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.fromDate = action.payload.startDate;
      state.toDate = action.payload.endDate;
    });

    builder.addCase(FetchDashboardPageData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(FetchDashboardPageData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(FetchDashboardPageData.rejected, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
    });
    builder.addCase(SelectedCybleID.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.selectedCybleId = action.payload;
    });
    builder.addCase(FetchCybleFeeds.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.cybledata = action.payload;
    });
    builder.addCase(FetchLayout.fulfilled, (state, action) => {
      state.layoutInfo = [];
      state.layoutInfo = action.payload;
    });
    builder.addCase(ResetLayout.fulfilled, (state, action) => {});
  },
});

export const { resetState } = DashboardPageStore.actions;
export default DashboardPageStore.reducer;

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };
// future reference
// const getUserSession =
//   () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
//     try {
//       const resp = await axiosPrivate.post(PREFERENCE_FETCH, {});
//       dispatch(UserSesson(resp.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// const updateUserSessionInsights =
//   (value: string) =>
//   async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
//     const session = getState().DashboardPageStore.session;
//     const updatedSession = {
//       session: { ...session, insights: { day_filter: value } },
//     };
//     try {
//       const resp = await axiosPrivate.post(PREFERENCE_INPUT, updatedSession);
//       dispatch(UserSesson(updatedSession));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// const updateUserSessionOei =
//   (value: string) =>
//   async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
//     const session = getState().DashboardPageStore.session;
//     const updatedSession = {
//       session: { ...session, oei: { day_filter: value } },
//     };
//     try {
//       const resp = await axiosPrivate.post(PREFERENCE_INPUT, updatedSession);
//       dispatch(UserSesson(updatedSession));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// const updateUserSessionPerspective =
//   (value: string) =>
//   async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
//     const session = getState().DashboardPageStore.session;
//     const updatedSession = {
//       session: { ...session, perspective: { day_filter: value } },
//     };
//     try {
//       const resp = await axiosPrivate.post(PREFERENCE_INPUT, updatedSession);
//       dispatch(UserSesson(updatedSession));
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const DashboardActionCreator = {
  UpdateDashboardDate,
  FetchDashboardPageData,
  ResetState,
  SelectedCybleID,
  FetchCybleFeeds,
  FetchLayout,
  UpdateLayout,
  ResetLayout,
};
