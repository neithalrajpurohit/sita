import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dropdownfilter } from "../../definition/InsightGridStoreProps";
import { AnalysisGrid } from "../../definition/AnalysisGrid";
import { TDropdownData } from "../../definition/InsightGridHeaderData";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { PerspectiveState } from "./PerspectiveType";
import moment from "moment";

const fromDateArr = Array.from({ length: 30 }, (_, i) =>
  moment().subtract(i, "days").format("YYYY-MM-DD")
);

const startDate: Date = moment(fromDateArr[fromDateArr.length - 1]).toDate();
const endDate: Date = new Date();

const initialState: PerspectiveState = {
  dropdownfilters: [] as dropdownfilter[],
  startDate: startDate,
  endDate: endDate,
  gridData: {} as AnalysisGrid,
  isGridDataLoading: false,
  isGridDataLoaded: false,
  isGridDataError: false,
  gridDataError: "",
  dropDownData: [] as TDropdownData[],

  isDeletePerspectiveLoading: false,
  isDeletePerspectiveSuccess: false,
  isDeletePerspectiveError: false,
  isDeletePerspectiveResp: {} as { message: string; status: string },
  currentPage: 1,
};

export const PerspectiveStore = createSlice({
  name: "analysis",
  initialState,

  reducers: {
    receiveSelectedDropdownFilters: (
      state: PerspectiveState,
      action: PayloadAction<dropdownfilter[]>
    ) => {
      return {
        ...state,
        dropdownfilters: action.payload,
      };
    },
    receiveUpdateSelectedDate: (
      state: PerspectiveState,
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
      state: PerspectiveState,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    resetState: (state: PerspectiveState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPerspectiveGridData.pending, (state: PerspectiveState) => {
        return {
          ...state,
          isGridDataLoading: true,
          isGridDataError: false,
        };
      })
      .addCase(
        getPerspectiveGridData.fulfilled,
        (state: PerspectiveState, action: PayloadAction<AnalysisGrid>) => {
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
        getPerspectiveGridData.rejected,
        (state: PerspectiveState, action) => {
          return {
            ...state,
            isGridDataError: true,
            isGridDataLoading: false,
          };
        }
      )
      //*Master Dropdown Data
      .addCase(getAnalysiMasterDropDownData.pending, (state, action) => {
        return {
          ...state,
          isGridDataLoading: true,
        };
      })
      .addCase(
        getAnalysiMasterDropDownData.fulfilled,
        (state: PerspectiveState, action: PayloadAction<TDropdownData[]>) => {
          return {
            ...state,
            dropDownData: action.payload,
            isGridDataLoading: false,
          };
        }
      )
      //*Delete Perspective Record
      .addCase(deletePerspectiveData.pending, (state: PerspectiveState) => {
        return {
          ...state,
          isDeletePerspectiveLoading: true,
          isDeletePerspectiveSuccess: false,
          isDeletePerspectiveError: false,
        };
      })
      .addCase(
        deletePerspectiveData.fulfilled,
        (
          state: PerspectiveState,
          action: PayloadAction<{ message: string; status: string }>
        ) => {
          return {
            ...state,
            isDeletePerspectiveLoading: false,
            isDeletePerspectiveSuccess: true,
            isDeletePerspectiveError: false,
            isDeletePerspectiveResp: action.payload,
          };
        }
      )
      .addCase(
        deletePerspectiveData.rejected,
        (state: PerspectiveState, action) => {
          return {
            ...state,
            isDeletePerspectiveLoading: false,
            isDeletePerspectiveSuccess: false,
            isDeletePerspectiveError: true,
          };
        }
      );
  },
});

export const {
  receiveSelectedDropdownFilters,
  receiveUpdateSelectedDate,
  setCurrentPage,
  resetState,
} = PerspectiveStore.actions;
export default PerspectiveStore.reducer;

const {
  PERSPECTIVE_GRID_DATA,
  PERSPECTIVE_MASTER_DROPDOWN,
  PERSPECTIVE_RECORD_DELETE,
} = EndPoints;

const getPerspectiveGridData = createAsyncThunk<
  AnalysisGrid,
  {
    fromDate: Date | string;
    toDate: Date | string;
    dropdownFilters: dropdownfilter[];
  },
  CallbackfunctionType
>("getPerspectiveGridData", async (selectedFilter) => {
  try {
    const resp = await axiosPrivate.post(PERSPECTIVE_GRID_DATA, selectedFilter);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
});

const getAnalysiMasterDropDownData = createAsyncThunk<
  TDropdownData[],
  void,
  CallbackfunctionType
>("getAnalysiMasterDropDownData", async () => {
  try {
    const resp = await axiosPrivate.post(PERSPECTIVE_MASTER_DROPDOWN, {});
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const deletePerspectiveData = createAsyncThunk<
  { message: string; status: string }, //*type Of response
  string, //*type of request payload
  CallbackfunctionType //*type of callback function
>("deletePerspectiveData", async (id) => {
  try {
    const resp = await axiosPrivate.post(PERSPECTIVE_RECORD_DELETE, {
      id: id,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const updateSelectedDropdownFilters =
  (selectedFilter: dropdownfilter[]) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receiveSelectedDropdownFilters(selectedFilter));
  };

const updateSelectedDate =
  (selectedDates: { startDate: Date; endDate: Date }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receiveUpdateSelectedDate(selectedDates));
  };

const receiveCurrentPage =
  (Payload: number) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setCurrentPage(Payload));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const PerspectiveActionCreator = {
  updateSelectedDropdownFilters,
  updateSelectedDate,
  getPerspectiveGridData,
  getAnalysiMasterDropDownData,
  deletePerspectiveData,
  receiveCurrentPage,
  ResetState,
};
