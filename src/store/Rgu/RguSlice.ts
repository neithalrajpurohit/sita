import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";
import { InitialStateRgu, RguListObj } from "./RguType";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";

const {
  ENTITY_FUNCTION_PROCESS,
  GET_RGU_DATA,
  ADD_UPDATE_RGU_DATA,
  DELETE_RGU_DATA,
  RUN_RGU_ENGINE,
} = EndPoints;

const initialState: InitialStateRgu = {
  functionAndProcess: [],
  rguListData: [],
  isLoading: false,
};

const fetchFunctionProcessforRgu = createAsyncThunk(
  "fetchFunctionProcessforRgu",
  async () => {
    const resp = await axiosPrivate.post(ENTITY_FUNCTION_PROCESS, {});
    const transformData = resp.data.map((e: any) => {
      return {
        id: e.id,
        function_name: e.functionName,
        function_id: e.functionId,
        process: e.process.map((p: any) => {
          return {
            id: p.id,
            process_name: p.processName,
            process_id: p.processId,
            parent_id: p.parentId,
          };
        }),
      };
    });
    return [...transformData];
  }
);

const fetchSavedRgu = createAsyncThunk("fetchSavedRgu", async () => {
  const resp = await axiosPrivate.post(GET_RGU_DATA, {});
  return [...resp.data.data];
});

const addUpdateRgu = createAsyncThunk<any, RguListObj[]>(
  "addUpdateRgu",
  async (payload) => {
    const resp = await axiosPrivate.post(ADD_UPDATE_RGU_DATA, {
      data: payload,
    });
    // Not Using Await Here Beacuse This API Should Be In BackGround And Dont Have To Await For The Resp
    axiosPrivate.post(RUN_RGU_ENGINE);
    return resp.data;
  }
);

const deleteRgu = createAsyncThunk<any, { id: number }>(
  "deleteRgu",
  async (payload) => {
    const resp = await axiosPrivate.post(DELETE_RGU_DATA, payload);
    // Not Using Await Here Beacuse This API Should Be In BackGround And Dont Have To Await For The Resp
    axiosPrivate.post(RUN_RGU_ENGINE);
    return resp.data;
  }
);

export const RguPageSlice = createSlice({
  name: "RguPageSlice",
  initialState,
  reducers: {
    resetState: (state: InitialStateRgu) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFunctionProcessforRgu.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(fetchFunctionProcessforRgu.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.functionAndProcess = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSavedRgu.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(fetchSavedRgu.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.rguListData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addUpdateRgu.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.rguListData = action.payload.data;
    });
    builder.addCase(deleteRgu.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.rguListData = action.payload.data;
    });
  },
});

const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

const {
  // Add action creators here
  resetState,
} = RguPageSlice.actions;

export default RguPageSlice.reducer;

export const RguPageActionCreator = {
  fetchFunctionProcessforRgu,
  fetchSavedRgu,
  addUpdateRgu,
  deleteRgu,
  ResetState,
};
