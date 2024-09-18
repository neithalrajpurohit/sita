import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate, sharePdfAxios } from "../../helpers/ApiClient";
import { AdvisoryGrid } from "../../definition/AnalysisGrid";
// import { Dayfilter } from "./DashboardType";

import { AnalysisGrid } from "../../definition/AnalysisGrid";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import moment from "moment";

const { GET_ADVISORY_DETAILS, GET_ADVISORY_PDF } = EndPoints;

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const startDate: Date = moment(fromDateArr[fromDateArr.length - 1]).toDate();
const endDate: Date = new Date();

const initialState: AdvisoryGrid = {
  fromDate: startDate,
  toDate: endDate,
  gridData: [],
  isGridDataLoading: false,
  isGridDataLoaded: false,
  isGridDataError: false,
  gridDataError: "",
  data: [],
  isLoading: false,
  pdfId: 0,
  pdfData: null,
  gridAddOn: {},
  gridHeader: [],
  dropdownfilters: [] as dropdownfilter[],
  dropDownData: [] as TDropdownData[],
  isDeleteSecurityPulseLoading: false,
  isDeleteSecurityPulseSuccess: false,
  isDeleteSecurityPulseError: false,
  isDeleteSecurityPulseResp: {} as { message: string; status: string },
  currentPage: 1,
};

const FetchAdvisoryData = createAsyncThunk<
  AnalysisGrid,
  {
    start_date: Date | string;
    end_date: Date | string;
  }
>("FetchAdvisoryData", async (payload) => {
  const response = await axiosPrivate.post(GET_ADVISORY_DETAILS, payload);
  return response.data;
});
const GeAdvisoryPdf = createAsyncThunk<any, any>(
  "GetAdvisoryPdf",
  async (payload) => {
    const response = await sharePdfAxios.post(GET_ADVISORY_PDF, payload);
    return response.data.data;
  }
);

const UpdateAvisoryDateRange =
  (payload: any) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(UpdateAvisoryDateRanges(payload));
  };

export const AdvisoryPageStore = createSlice({
  name: "Advisory",
  initialState,
  reducers: {
    UpdateAvisoryDateRanges: (state, action) => {
      return {
        ...state,
        fromDate: action.payload.startDate,
        toDate: action.payload.endDate,
      };
    },
    resetState: (state: AdvisoryGrid) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(FetchAdvisoryData.pending, (state, action) => {
      return {
        ...state,
        isGridDataLoading: true,
        isGridDataError: false,
      };
    });
    builder.addCase(FetchAdvisoryData.fulfilled, (state, action) => {
      state.gridData = action.payload.gridData;
      state.gridAddOn = action.payload.gridAddOn;
      state.gridHeader = action.payload.gridHeader;
      state.isGridDataLoading = false;
      state.isGridDataLoaded = true;
    });
    builder.addCase(GeAdvisoryPdf.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(GeAdvisoryPdf.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pdfData = action.payload;
    });
  },
});
export const { resetState, UpdateAvisoryDateRanges } =
  AdvisoryPageStore.actions;
export default AdvisoryPageStore.reducer;

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };
export const AdvisoryActionCreator = {
  FetchAdvisoryData,
  ResetState,
  GeAdvisoryPdf,
  UpdateAvisoryDateRange,
};
