import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { FormDataState } from "../../definition/AddEditSecurityPulse";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import { SecurityPulseState } from "./AddEditType";
import {
  getIncidentList,
  getAssetList,
  getEntityList,
} from "./AddEditSharedActions";

const initialState: SecurityPulseState = {
  isAddSecurityPulseLoaded: false,
  isAddSecurityPulseLoading: false,
  isAddSecurityPulseError: false,
  AddSecurityPulseError: "string",
  addSecurityPulseResp: {} as {
    message: string;
    status: string;
  },

  isEditSecurityPulseLoading: false,
  isEditSecurityPulseLoaded: false,
  isEditSecurityPulseError: false,
  EditSecurityPulseError: "string",
  editSecurityPulseData: {} as FormDataState,
  mode: "add",
  FormData: {
    userName: "",
    securityPulseTitle: "",
    mainTitle: "",
    sections: [
      {
        imageData: "",
        imageDataName: "",
        info: "",
      },
    ],
    recommendations: [""],
    links: [{}],
    selectedIncidents: [""],
    selectedAssets: [""],
    selectedEntities: [""],
    criticality: "",
  } as FormDataState,
  incidentList: [] as string[],
  entityList: [] as string[],
  assetList: [] as string[],

  isTagLoading: false,
  isTagFetchError: false,

  cancleMode: "",
};

export const SecurityPulseStore = createSlice({
  name: "SecurityPulse",
  initialState,
  reducers: {
    resetAddState: (state: SecurityPulseState) => {
      return {
        ...state,
        addSecurityPulseResp: {} as {
          message: string;
          status: string;
        },
        FormData: {
          securityPulseTitle: "",
          mainTitle: "",
          sections: [
            {
              imageData: "",
              imageDataName: "",
              info: "",
            },
          ],
          recommendations: [""],
          links: [{}],
          criticality: "",
        } as FormDataState,
        isEditSecurityPulseLoaded: false,
        isEditSecurityPulseLoading: false,
        isEditSecurityPulseError: false,
      };
    },
    resetEditState: (state: SecurityPulseState) => {
      return {
        ...state,
        addSecurityPulseResp: {} as {
          message: string;
          status: string;
        },
      };
    },
    setSecurityPulseMode: (
      state: SecurityPulseState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        mode: action.payload,
      };
    },
    updateCancelMode: (
      state: SecurityPulseState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        cancleMode: action.payload,
      };
    },

    formHandler: (
      state: SecurityPulseState,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      return {
        ...state,
        FormData: {
          ...state.FormData,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    imageNameHandler: (
      state: SecurityPulseState,
      action: PayloadAction<{ name: string; value: string; key: number }>
    ) => {
      return {
        ...state,
        FormData: {
          ...state.FormData,
          sections: state.FormData.sections.map((x, key) => {
            if (action.payload.key === key) {
              return {
                ...x,
                [action.payload.name]: action.payload.value,
              };
            }
            return x;
          }),
        },
      };
    },
    resetState: (state: SecurityPulseState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSecurityPulse.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isAddSecurityPulseLoading: true,
          isAddSecurityPulseError: false,
        };
      })
      .addCase(
        addSecurityPulse.fulfilled,
        (
          state: SecurityPulseState,
          action: PayloadAction<{ message: string; status: string }>
        ) => {
          return {
            ...state,
            isAddSecurityPulseLoaded: true,
            isAddSecurityPulseLoading: false,
            isAddSecurityPulseError: false,
            addSecurityPulseResp: action.payload,
          };
        }
      )
      .addCase(addSecurityPulse.rejected, (state: SecurityPulseState) => {
        return {
          ...state,
          isAddSecurityPulseError: true,
          isAddSecurityPulseLoading: false,
        };
      })

      //get security pulse
      .addCase(getSecurityPulse.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isEditSecurityPulseLoading: true,
          isEditSecurityPulseError: false,
        };
      })
      .addCase(
        getSecurityPulse.fulfilled,
        (state: SecurityPulseState, action: PayloadAction<FormDataState>) => {
          return {
            ...state,
            isEditSecurityPulseLoaded: true,
            isEditSecurityPulseLoading: false,
            isEditSecurityPulseError: false,
            FormData: action.payload,
          };
        }
      )
      .addCase(getSecurityPulse.rejected, (state: SecurityPulseState) => {
        return {
          ...state,
          isEditSecurityPulseLoading: false,
          isEditSecurityPulseError: true,
        };
      })

      //incident
      .addCase(getIncidentList.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(
        getIncidentList.fulfilled,
        (state: SecurityPulseState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            incidentList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getIncidentList.rejected, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      })

      //assets
      .addCase(getAssetList.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(
        getAssetList.fulfilled,
        (state: SecurityPulseState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            assetList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getAssetList.rejected, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      })

      //entity
      .addCase(getEntityList.pending, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: true,
          isTagFetchError: false,
        };
      })
      .addCase(
        getEntityList.fulfilled,
        (state: SecurityPulseState, action: PayloadAction<string[]>) => {
          return {
            ...state,
            entityList: action.payload,
            isTagLoading: false,
            isTagFetchError: false,
          };
        }
      )
      .addCase(getEntityList.rejected, (state: SecurityPulseState) => {
        return {
          ...state,
          isTagLoading: false,
          isTagFetchError: true,
        };
      });
  },
});

export const {
  resetAddState,
  setSecurityPulseMode,
  resetEditState,
  updateCancelMode,
  formHandler,
  imageNameHandler,
  resetState,
} = SecurityPulseStore.actions;
export default SecurityPulseStore.reducer;

const {
  ADD_SECURITY_PULSE_RECORD,
  EDIT_SECURITY_PULSE_RECORD_SUBMIT,
  EDIT_SECURITY_PULSE_RECORD_FETCH,
} = EndPoints;

const addSecurityPulse = createAsyncThunk<
  { message: string; status: string },
  { formData: FormDataState; mode: string },
  CallbackfunctionType
>("addSecurityPulse", async ({ formData, mode }) => {
  try {
    if (mode.toLocaleLowerCase() === "add") {
      const resp = await axiosPrivate.post(ADD_SECURITY_PULSE_RECORD, formData);
      return resp.data;
    } else if (mode.toLocaleLowerCase() === "edit") {
      const resp = await axiosPrivate.post(
        EDIT_SECURITY_PULSE_RECORD_SUBMIT,
        formData
      );
      return resp.data;
    }
  } catch (error) {
    throw new Error();
  }
});

const getSecurityPulse = createAsyncThunk<
  FormDataState,
  string,
  CallbackfunctionType
>("getSecurityPulse", async (incidentId) => {
  try {
    const resp = await axiosPrivate.post(EDIT_SECURITY_PULSE_RECORD_FETCH, {
      id: incidentId,
    });
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

// const getIncidentList = createAsyncThunk<
//   string[],
//   string,
//   CallbackfunctionType
// >("getIncidentList", async (inputValue) => {
//   try {
//     const resp = await axiosPrivate.post(FETCH_INCIDENT_TAGS, {
//       inputFilter: inputValue,
//     });
//     return resp.data;
//   } catch (error) {
//     throw new Error();
//   }
// });

// const getAssetList = createAsyncThunk<string[], string, CallbackfunctionType>(
//   "getAssetList",
//   async (inputValue) => {
//     try {
//       const resp = await axiosPrivate.post(FETCH_ASSET_TAGS, {
//         inputFilter: inputValue,
//       });
//       return resp.data;
//     } catch (error) {
//       throw new Error();
//     }
//   }
// );

// const getEntityList = createAsyncThunk<string[], string, CallbackfunctionType>(
//   "getEntityList",
//   async (inputValue) => {
//     try {
//       const resp = await axiosPrivate.post(FETCH_ENITY_TAGS, {
//         inputFilter: inputValue,
//       });
//       return resp.data;
//     } catch (error) {
//       throw new Error();
//     }
//   }
// );

const resetAddStates =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetAddState());
  };
const resetEditStates =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetEditState());
  };

const updateSecurityPulseMode =
  (mode: string) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(setSecurityPulseMode(mode));
  };
const formEventHandler =
  (input: { name: string; value: any }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(formHandler(input));
  };

const setCancelMode =
  (mode: string) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(updateCancelMode(mode));
  };

const sectionImageHandler =
  (payload: { name: string; value: string; key: number }) =>
  async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(imageNameHandler(payload));
  };

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const addSecurityPulseActionCreator = {
  addSecurityPulse,
  getSecurityPulse,
  resetAddStates,
  resetEditStates,
  updateSecurityPulseMode,
  formEventHandler,
  setCancelMode,
  sectionImageHandler,
  ResetState,
};
