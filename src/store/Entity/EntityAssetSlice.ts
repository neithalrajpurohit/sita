import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";
import { axiosPrivate, axiosPrivateFileUpload } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { UpdateEntityAssetsPayload, InitialState } from "./EntityType";
const {
  ENTITY_ASSETS,
  ENTITY_ASSETS_UPDATE,
  UPLOAD_ASSETS,
  GET_ASSET_SUMMARY,
} = EndPoints;

// Define initial state
const initialState: InitialState = {
  assetTableData: [],
  companyLocation: [],
  companyFunction: [],
  assetCategory: [],
  assetType: [],
  tags: [],
  rejectedData: [],
};

// Define action

const updateEntityAssets = createAsyncThunk<
  UpdateEntityAssetsPayload[],
  UpdateEntityAssetsPayload[]
>("updateEntityAssets", async (payload) => {
  // Send update request to API
  const res = await axiosPrivate.post(ENTITY_ASSETS_UPDATE, {
    assetTableData: payload,
  });
  await axiosPrivate.post(GET_ASSET_SUMMARY, {});
  return res.data.allData;
});

const fetchEntityAssets = createAsyncThunk("fetchEntityAssets", async () => {
  const resp = await axiosPrivate.post(ENTITY_ASSETS, {});
  return { ...resp.data };
});

const uploadEntityAssets = createAsyncThunk(
  "uploadEntityAssets",
  async (payload: any) => {
    var data = new FormData();
    data.append("File", payload);
    const resp = await axiosPrivateFileUpload.post(UPLOAD_ASSETS, data);
    return resp.data.data;
  }
);

// Create slice
const EntityAssetsSlice = createSlice({
  name: "EntityAssetsSlice",
  initialState,
  reducers: {
    // Add reducers here

    resetState: (state: InitialState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(fetchEntityAssets.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.assetType = action.payload.data[0].assetType;
      state.assetCategory = action.payload.data[0].assetCategory;
      state.assetTableData = action.payload.data[0].assetTableData;
      state.companyLocation = action.payload.data[0].companyLocation;
      state.companyFunction = action.payload.data[0].companyFunction;
      state.tags = action.payload.data[0].tags;
    });
    builder.addCase(fetchEntityAssets.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(updateEntityAssets.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.assetTableData = action.payload;
    });
    builder.addCase(updateEntityAssets.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(uploadEntityAssets.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.assetTableData = [
        ...state.assetTableData,
        ...action.payload.ValidatedData,
      ];
      state.rejectedData = action.payload.RejectedData;
    });
    builder.addCase(uploadEntityAssets.rejected, (state, action) => {
      // Handle error here
    });
  },
});

// Export action creators and reducerexport
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const {
  // Add action creators here
  resetState,
} = EntityAssetsSlice.actions;

export default EntityAssetsSlice.reducer;

export const entityAssetsActionCreator = {
  fetchEntityAssets,
  updateEntityAssets,
  uploadEntityAssets,
  ResetState,
};
