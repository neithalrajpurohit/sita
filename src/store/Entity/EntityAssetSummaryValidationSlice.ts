import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import {
  AssetSummaryValidationObj,
  InitialStateAssetSummaryValidation,
} from "./EntityType";
import { toast } from "react-toastify";

const { GET_ASSET_TYPE_SUMMARY, UPDATE_ASSET_TYPE_SUMMARY, RUN_VMF_ENGINE } =
  EndPoints;

const initialState: InitialStateAssetSummaryValidation = {
  AssetSummaryValidation: [],
};

const fetchAssetSummaryValidationData = createAsyncThunk(
  "fetchAssetSummaryValidationData",
  async () => {
    const resp = await axiosPrivate.post(GET_ASSET_TYPE_SUMMARY, {});
    return [...resp.data.data];
  }
);

const updateAssetSummaryValidationData = createAsyncThunk<
  any,
  AssetSummaryValidationObj[]
>("updateAssetSummaryValidationData", async (payload) => {
  const resp = await axiosPrivate.post(UPDATE_ASSET_TYPE_SUMMARY, {
    data: payload,
  });
  toast(resp.data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
  // Not Using Await Here Beacuse This API Should Be In BackGround And Dont Have To Await For The Resp
  axiosPrivate.post(RUN_VMF_ENGINE);
  return [...resp.data.data];
});

export const EntityAssetSummaryValidationSlice = createSlice({
  name: "EntityAssetSummaryValidationSlice",
  initialState,
  reducers: {
    resetState: (state) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchAssetSummaryValidationData.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.AssetSummaryValidation = action.payload;
      }
    );
    builder.addCase(
      updateAssetSummaryValidationData.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.AssetSummaryValidation = action.payload;
      }
    );
  },
});

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const {
  // Add action creators here
  resetState,
} = EntityAssetSummaryValidationSlice.actions;

export default EntityAssetSummaryValidationSlice.reducer;

export const entityASVActionCreator = {
  ResetState,
  fetchAssetSummaryValidationData,
  updateAssetSummaryValidationData,
};
