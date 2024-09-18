import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { UpdateEntityCreationPayload, PrimaryState } from "./EntityType";
import { RootState } from "../../configureStore";
import { toast } from "react-toastify";

const { ENTITY_CREATION, ENTITY_CREATION_UPDATE } = EndPoints;

// Define initial state
const initialState: PrimaryState = {
  entityCreation: {
    companyId: 1,
    no_of_employee: 0,
    companyName: "",
    companyLogo: "",
    companyLocations: [],
  },
};

// Define action

const updateEntityCreation = createAsyncThunk<
  UpdateEntityCreationPayload,
  UpdateEntityCreationPayload
>("updateEntityCreation", async (payload) => {
  return payload;
});

const updateEntityCreationBackend = createAsyncThunk<
  UpdateEntityCreationPayload,
  UpdateEntityCreationPayload
>("updateEntityCreationBackend", async (payload) => {
  // Send update request to API
  const resp = await axiosPrivate.post(ENTITY_CREATION_UPDATE, payload);
  const resp2 = await axiosPrivate.post(ENTITY_CREATION, {});
  toast(resp.data.Message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
  return { ...resp2.data[0] };
});

const fetchEntityCreation = createAsyncThunk(
  "fetchEntityCreation",
  async () => {
    const resp = await axiosPrivate.post(ENTITY_CREATION, {});
    return { ...resp.data[0] };
  }
);

// Create slice
const EntityCreationSlice = createSlice({
  name: "entityCreation",
  initialState,
  reducers: {
    // Add reducers here
    resetState: (state: PrimaryState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(fetchEntityCreation.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.entityCreation = action.payload;
    });
    builder.addCase(fetchEntityCreation.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(updateEntityCreation.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.entityCreation = action.payload;
    });
    builder.addCase(updateEntityCreation.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(updateEntityCreationBackend.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.entityCreation = action.payload;
    });
    builder.addCase(updateEntityCreationBackend.rejected, (state, action) => {
      // Handle error here
    });
  },
});
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

// Export action creators and reducerexport
const {
  // Add action creators here
  resetState,
} = EntityCreationSlice.actions;

export default EntityCreationSlice.reducer;

export const entityCreationActionCreator = {
  fetchEntityCreation,
  updateEntityCreation,
  updateEntityCreationBackend,
  ResetState,
};
