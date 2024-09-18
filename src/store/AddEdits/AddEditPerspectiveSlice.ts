import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { userInputDataType } from "../../definition/AddEditAnalysis";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { addAnalysisState } from "./AddEditType";
import {
  getAssetList,
  getEntityList,
  getIncidentList,
} from "./AddEditSharedActions";
const initialState: addAnalysisState = {
  isAddAnalysisLoading: false,
  isAddAnalysisLoaded: false,
  isAddAnalysisError: false,
  AddAnalysisError: "",
  addAnalysisResp: {} as {
    message: string;
    status: string;
  },
  isEditAnalysisLoading: false,
  isEditAnalysisLoaded: false,
  isEditAnalysisError: false,
  EditAnalysisError: "",
  editAnalysisData: {} as userInputDataType,
  mode: "add",

  //persists states
  FormData: {
    imageData1: "",
    imageData2: "",
    imageData3: "",
    imageData4: "",
    perspectiveTitle: "",
    barGraphTitle: "",
    perspectiveInput: "",
    recomendationsInput: "",
    imageData1Name: "",
    imageData2Name: "",
    imageData3Name: "",
    imageData4Name: "",
    selectedLevelFilter: "",
    selectedActionTakenFilter: "",
    selectedPerspectiveFilter: "",
    startDateTime: null,
    endDateTime: null,
    selectedIds: [],
    selectedAssets: [],
    selectedEntities: [],
    selectedActedUponFilter: "",
  } as userInputDataType,
  incidentList: [] as string[],
  entityList: [] as string[],
  assetList: [] as string[],
  isTagLoading: false,
  isTagFetchError: false,
  cancleMode: "",
};

export const addAnalysisStore = createSlice({
  name: "addEditAnalysis",
  initialState,
  reducers: {
    resetAddState: (state: addAnalysisState) => {
      return {
        ...state,
        addAnalysisResp: {} as {
          message: string;
          status: string;
        },
        FormData: {
          imageData1: "",
          imageData2: "",
          imageData3: "",
          imageData4: "",
          perspectiveTitle: "",
          barGraphTitle: "",
          perspectiveInput: "",
          recomendationsInput: "",
          imageData1Name: "",
          imageData2Name: "",
          imageData3Name: "",
          imageData4Name: "",
          selectedLevelFilter: "",
          selectedActionTakenFilter: "",
          selectedPerspectiveFilter: "",
          startDateTime: null,
          endDateTime: null,
          selectedIds: [],
          selectedAssets: [],
          selectedEntities: [],
          selectedActedUponFilter: "",
        } as userInputDataType,
        isEditAnalysisLoaded: false,
        isEditAnalysisLoading: false,
        isEditAnalysisError: false,
      };
    },
    resetEditState: (state: addAnalysisState) => {
      return {
        ...state,
        addAnalysisResp: {} as {
          message: string;
          status: string;
        },
      };
    },
    setAnalysisMode: (
      state: addAnalysisState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        mode: action.payload,
      };
    },
    updateCancelMode: (
      state: addAnalysisState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        cancleMode: action.payload,
      };
    },
    deleteProperties: (
      state: addAnalysisState,
      action: PayloadAction<{
        name: "startDateTime" | "endDateTime" | "selectedLevelFilter";
      }>
    ) => {
      const tempFormData = { ...state.FormData };
      delete tempFormData[action.payload.name];
      return {
        ...state,
        FormData: tempFormData,
      };
    },
    formHandler: (
      state: addAnalysisState,
      action: PayloadAction<{
        key: string;
        value: any;
      }>
    ) => {
      return {
        ...state,
        FormData: {
          ...state.FormData,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    resetState: (state: addAnalysisState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnalysis.pending, (state: addAnalysisState) => {
        return {
          ...state,
          isAddAnalysisLoading: true,
          isAddAnalysisError: false,
        };
      })
      .addCase(
        addAnalysis.fulfilled,
        (
          state: addAnalysisState,
          action: PayloadAction<{
            message: string;
            status: string;
          }>
        ) => {
          return {
            ...state,
            isAddAnalysisLoaded: true,
            isAddAnalysisLoading: false,
            isAddAnalysisError: false,
            addAnalysisResp: action.payload,
          };
        }
      )
      .addCase(addAnalysis.rejected, (state: addAnalysisState) => {
        return {
          ...state,
          isAddAnalysisError: true,
          isAddAnalysisLoading: false,
        };
      })
      .addCase(getAnalysis.pending, (state: addAnalysisState) => {
        return {
          ...state,
          isEditAnalysisLoading: true,
          isEditAnalysisError: false,
        };
      })
      .addCase(
        getAnalysis.fulfilled,
        (state: addAnalysisState, action: PayloadAction<userInputDataType>) => {
          return {
            ...state,
            isEditAnalysisLoaded: true,
            isEditAnalysisLoading: false,
            isEditAnalysisError: false,
            FormData: action.payload,
          };
        }
      )
      .addCase(getAnalysis.rejected, (state: addAnalysisState) => {
        return {
          ...state,
          isEditAnalysisLoading: false,
          isEditAnalysisError: true,
        };
      })
      .addCase(getIncidentList.pending, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(
        getIncidentList.fulfilled,
        (state: addAnalysisState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            incidentList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getIncidentList.rejected, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      })
      .addCase(
        getAssetList.fulfilled,
        (state: addAnalysisState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            assetList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getAssetList.pending, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(getAssetList.rejected, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      })
      .addCase(
        getEntityList.fulfilled,
        (state: addAnalysisState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            entityList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getEntityList.pending, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(getEntityList.rejected, (state: addAnalysisState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      });
  },
});

export const {
  formHandler,
  resetAddState,
  setAnalysisMode,
  resetEditState,
  updateCancelMode,
  deleteProperties,
  resetState,
} = addAnalysisStore.actions;
export default addAnalysisStore.reducer;

const {
  ADD_PERSPECTIVE_RECORD,
  EDIT_PERSPECTIVE_RECORD_SUBMIT,
  EDIT_PERSPECTIVE_RECORD_FETCH,
} = EndPoints;

const addAnalysis = createAsyncThunk<
  {
    message: string;
    status: string;
  },
  { formData: userInputDataType; mode: string },
  CallbackfunctionType
>("addAnalysis", async (selectedFilters) => {
  try {
    if (selectedFilters.mode.toLocaleLowerCase() === "add") {
      const resp = await axiosPrivate.post(
        ADD_PERSPECTIVE_RECORD,
        selectedFilters.formData
      );
      return resp.data;
    } else if (selectedFilters.mode.toLocaleLowerCase() === "edit") {
      const resp = await axiosPrivate.post(
        EDIT_PERSPECTIVE_RECORD_SUBMIT,
        selectedFilters.formData
      );
      return resp.data;
    }
  } catch (error) {
    throw new Error();
  }
});

const getAnalysis = createAsyncThunk<
  userInputDataType,
  string,
  CallbackfunctionType
>("getAnalysis", async (incidentId) => {
  try {
    const resp = await axiosPrivate.post(EDIT_PERSPECTIVE_RECORD_FETCH, {
      id: incidentId,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const deletePropertiesOfFormData =
  (payload: {
    name: "startDateTime" | "endDateTime" | "selectedLevelFilter";
  }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(deleteProperties(payload));
  };

const resetAddStates =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetAddState());
  };
const resetEditStates =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetEditState());
  };

const updateAnalysisMode =
  (mode: string) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setAnalysisMode(mode));
  };
const formEventHandler =
  (input: { key: string; value: any }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(formHandler(input));
  };

const setCancelMode =
  (mode: string) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(updateCancelMode(mode));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const addEditAnalysisActionCreator = {
  addAnalysis,
  resetAddStates,
  resetEditStates,
  getAnalysis,
  updateAnalysisMode,
  formEventHandler,
  setCancelMode,
  deletePropertiesOfFormData,
  ResetState,
};
