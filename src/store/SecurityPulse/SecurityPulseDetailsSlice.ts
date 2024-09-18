import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SecurityPulseDetail } from "../../definition/SecurityPulseDetail";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPublic } from "../../helpers/ApiClient";
import { RootState } from "../../configureStore";
import { SecurityPulseDetailsState } from "./SecurityType";

const initialState: SecurityPulseDetailsState = {
  SecurityPulseDetailsData: {} as SecurityPulseDetail,
  isLoading: false,
  isLoaded: false,
  isError: false,
  error: "",
  selectedIncidentId: "",
  isPreview: false,

  // isCloseIncident: false,
};

export const SecurityPulseDetailStore = createSlice({
  name: "SecurityPulseDetails",
  initialState,

  reducers: {
    receiveSecurityPulseDetailsData: (
      state: SecurityPulseDetailsState,
      action: PayloadAction<SecurityPulseDetail>
    ) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLoaded: true,
        SecurityPulseDetailsData: action.payload,
      };
    },

    receiveIncidentId: (
      state: SecurityPulseDetailsState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        selectedIncidentId: action.payload,
      };
    },
    setIsPreview: (
      state: SecurityPulseDetailsState,
      action: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        isPreview: action.payload,
      };
    },
    resetState: (state: SecurityPulseDetailsState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSecurityPulseDetailsData.pending,
        (state: SecurityPulseDetailsState) => {
          return {
            ...state,
            isLoading: true,
            isError: false,
          };
        }
      )
      .addCase(
        getSecurityPulseDetailsData.fulfilled,
        (
          state: SecurityPulseDetailsState,
          action: PayloadAction<SecurityPulseDetail>
        ) => {
          return {
            ...state,
            isLoading: false,
            isError: false,
            isLoaded: true,
            SecurityPulseDetailsData: action.payload,
            isCloseIncident: false,
          };
        }
      )
      .addCase(
        getSecurityPulseDetailsData.rejected,
        (state: SecurityPulseDetailsState) => {
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
  receiveSecurityPulseDetailsData,
  receiveIncidentId,
  setIsPreview,
  resetState,
} = SecurityPulseDetailStore.actions;
export default SecurityPulseDetailStore.reducer;

const { SECURITY_PULSE_DETAILS_DATA } = EndPoints;

const getSecurityPulseDetailsData = createAsyncThunk<
  SecurityPulseDetail,
  string,
  CallbackfunctionType
>("getSecurityPulseDetailsData", async (incidentId, thunkApi) => {
  try {
    thunkApi.dispatch(receiveIncidentId(incidentId));
    const resp = await axiosPublic.post(`v1${SECURITY_PULSE_DETAILS_DATA}`, {
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

const addEditSecurityPulseFormPreview =
  (detailData: SecurityPulseDetail) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(receiveSecurityPulseDetailsData(detailData));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const SecurityPulseDetailsActionCreator = {
  getSecurityPulseDetailsData,
  updateIsPreview,
  addEditSecurityPulseFormPreview,
  ResetState,
};
