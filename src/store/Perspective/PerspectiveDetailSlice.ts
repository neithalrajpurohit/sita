import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { PerspectiveDetailResp } from "../../definition/PerspectiveDetail";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { RootState } from "../../configureStore";
import { AnalysisDetailsState } from "./PerspectiveType";

const initialState: AnalysisDetailsState = {
  analysisDetailsData: {} as PerspectiveDetailResp,
  isLoading: false,
  isLoaded: false,
  isError: false,
  error: "",
  selectedIncidentId: "",
  isPreview: false,
};

export const AnalysisDetailStore = createSlice({
  name: "AnalysisDetails",
  initialState,

  reducers: {
    receivePerspectiveDetailData: (
      state: AnalysisDetailsState,
      action: PayloadAction<PerspectiveDetailResp>
    ) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoaded: true,
        analysisDetailsData: action.payload,
      };
    },

    receiveIncidentId: (
      state: AnalysisDetailsState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedIncidentId: action.payload,
      };
    },
    setIsPreview: (
      state: AnalysisDetailsState,
      action: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        isPreview: action.payload,
      };
    },
    resetState: (state: AnalysisDetailsState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAnalysisDetailsData.pending,
        (state: AnalysisDetailsState) => {
          return {
            ...state,
            isLoading: true,
            isError: false,
          };
        }
      )
      .addCase(
        getAnalysisDetailsData.fulfilled,
        (
          state: AnalysisDetailsState,
          action: PayloadAction<PerspectiveDetailResp>
        ) => {
          return {
            ...state,
            isLoading: false,
            isError: false,
            isLoaded: true,
            analysisDetailsData: action.payload,
            isCloseIncident: false,
          };
        }
      )
      .addCase(
        getAnalysisDetailsData.rejected,
        (state: AnalysisDetailsState) => {
          return {
            ...state,
            isLoading: false,
            isError: true,
          };
        }
      );
  },
});

export const {
  receivePerspectiveDetailData,
  receiveIncidentId,
  setIsPreview,
  resetState,
} = AnalysisDetailStore.actions;
export default AnalysisDetailStore.reducer;

const { PERSPECTIVE_DETAILS_DATA } = EndPoints;

const getAnalysisDetailsData = createAsyncThunk<
  PerspectiveDetailResp,
  string,
  CallbackfunctionType
>("getAnalysisDetailsData", async (incidentId, thunkApi) => {
  try {
    thunkApi.dispatch(receiveIncidentId(incidentId));
    const resp = await axiosPrivate.post(PERSPECTIVE_DETAILS_DATA, {
      id: incidentId,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const updateIsPreview =
  (isPreview: boolean) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setIsPreview(isPreview));
  };

const addEditPerspectiveFormPreview =
  (detailData: PerspectiveDetailResp) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receivePerspectiveDetailData(detailData));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const AnalysisDetailsActionCreator = {
  getAnalysisDetailsData,
  updateIsPreview,
  addEditPerspectiveFormPreview,
  ResetState,
};
