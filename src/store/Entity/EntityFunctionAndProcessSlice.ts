import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import {
  UpdateEntityFunctionAndProcessesPayload,
  CustomProcesses,
  SecondaryState,
} from "./EntityType";
import { toast } from "react-toastify";
const {
  ENTITY_PREDEFINED_FUNCTION,
  ENTITY_FUNCTION_PROCESS,
  ENTITY_FUNCTION_PROCESS_UPDATE,
  MASTER_FUNCTION,
} = EndPoints;

const initialState: SecondaryState = {
  FunctionAndProcesses: [],
  PreFunctionAndProcesses: [],
  CustomFuncProcess: [],
  CustomProcess: [],
};

// Define action

const updateEntityFunctionAndProcesses = createAsyncThunk<
  UpdateEntityFunctionAndProcessesPayload[],
  UpdateEntityFunctionAndProcessesPayload[]
>("updateEntityFunctionAndProcesses", async (payload) => {
  // Send update request to API
  const resp = await axiosPrivate.post(ENTITY_FUNCTION_PROCESS_UPDATE, {
    updatedData: payload,
  });
  toast(resp.data.Message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
  return payload;
});

const fetchEntityFunctionAndProcesses = createAsyncThunk(
  "fetchEntityFunctionAndProcesses",
  async () => {
    const resp = await axiosPrivate.post(ENTITY_FUNCTION_PROCESS, {});
    return [...resp.data];
  }
);
const fetchEntityPreFunctionAndProcesses = createAsyncThunk(
  "fetchEntityPreFunctionAndProcesses",
  async () => {
    const resp = await axiosPrivate.post(ENTITY_PREDEFINED_FUNCTION, {});
    return [...resp.data];
  }
);
const fetchEntityCustomFuncProcess = createAsyncThunk(
  "fetchEntityCustomFuncProcess",
  async () => {
    const resp = await axiosPrivate.post(MASTER_FUNCTION, {});
    return [...resp.data];
  }
);
const deleteCustomFuncProcess = createAsyncThunk<
  UpdateEntityFunctionAndProcessesPayload[],
  UpdateEntityFunctionAndProcessesPayload[]
>("deleteCustomFuncProcess", async (payload) => {
  return payload;
});
const deleteCustomProcess = createAsyncThunk<
  CustomProcesses[],
  CustomProcesses[]
>("deleteCustomProcess", async (payload) => {
  return payload;
});

const updateCustomFunc = createAsyncThunk<
  UpdateEntityFunctionAndProcessesPayload[],
  UpdateEntityFunctionAndProcessesPayload[]
>("updateCustomFunc", async (payload) => {
  return payload;
});

const updateCustomProcess = createAsyncThunk<
  CustomProcesses[],
  CustomProcesses[]
>("updateCustomProcess", async (payload) => {
  return payload;
});

// Create slice
const EntityFunctionAndProcessesSlice = createSlice({
  name: "EntityFunctionAndProcessesSlice",
  initialState,
  reducers: {
    // Add reducers here
    resetState: (state: SecondaryState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(
      fetchEntityFunctionAndProcesses.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.FunctionAndProcesses = action.payload;
      }
    );
    builder.addCase(
      fetchEntityFunctionAndProcesses.rejected,
      (state, action) => {
        // Handle error here
      }
    );
    builder.addCase(
      fetchEntityPreFunctionAndProcesses.fulfilled,
      (state, action) => {
        // Update state with fetched data on success
        state.PreFunctionAndProcesses = action.payload;
      }
    );
    builder.addCase(
      fetchEntityPreFunctionAndProcesses.rejected,
      (state, action) => {
        // Handle error here
      }
    );
    builder.addCase(
      updateEntityFunctionAndProcesses.fulfilled,
      (state, action) => {
        // Update state with updated data on success
        state.FunctionAndProcesses = action.payload;
      }
    );
    builder.addCase(
      updateEntityFunctionAndProcesses.rejected,
      (state, action) => {
        // Handle error here
      }
    );
    builder.addCase(fetchEntityCustomFuncProcess.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.CustomFuncProcess = action.payload;
      state.CustomProcess = action.payload.map((e) => e.process).flat();
    });
    builder.addCase(fetchEntityCustomFuncProcess.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(deleteCustomFuncProcess.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.CustomFuncProcess = action.payload;
    });
    builder.addCase(updateCustomFunc.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.CustomFuncProcess = action.payload;
    });
    builder.addCase(deleteCustomProcess.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.CustomProcess = action.payload;
    });
    builder.addCase(updateCustomProcess.fulfilled, (state, action) => {
      // Update state with updated data on success
      state.CustomProcess = action.payload;
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
} = EntityFunctionAndProcessesSlice.actions;

export default EntityFunctionAndProcessesSlice.reducer;

export const entityFunctionAndProcessesActionCreator = {
  fetchEntityFunctionAndProcesses,
  updateEntityFunctionAndProcesses,
  fetchEntityPreFunctionAndProcesses,
  fetchEntityCustomFuncProcess,
  deleteCustomFuncProcess,
  deleteCustomProcess,
  updateCustomFunc,
  updateCustomProcess,
  ResetState,
};
