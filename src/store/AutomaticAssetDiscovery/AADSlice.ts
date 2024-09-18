import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../configureStore";

import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { InitialStateAAD } from "./AADTypes";

const { SECEON_GRID, SECEON_EVENT_DETAILS } = EndPoints;

const initialState: InitialStateAAD = {
  isLoading: false,
  selectedService: {
    label: "",
    value: "",
  },
  gridHeader: [],
  gridData: [],
  loadingRecord: false,
  eventDetails: {
    label: "",
    value: "",
    box_one: [],
    box_two: [],
    box_three: [],
  },
};

const fetchAADGridData = createAsyncThunk<
  any,
  {
    label: string;
    value: string;
  }
>("fetchAADGridData", async (payload) => {
  const resp = await axiosPrivate.post(SECEON_GRID, payload);
  return resp.data;
});

const fetchAADEventDetails = createAsyncThunk<
  any,
  {
    label: string;
    value: string;
    mitre_technique_id: string | number | boolean | Date;
  }
>("fetchAADEventDetails", async (payload) => {
  const resp = await axiosPrivate.post(SECEON_EVENT_DETAILS, payload);
  return resp.data;
});

export const AADPageSlice = createSlice({
  name: "AADPageSlice",
  initialState,
  reducers: {
    resetState: (state: InitialStateAAD) => {
      return {
        ...initialState,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAADGridData.pending, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = true;
    });
    builder.addCase(fetchAADGridData.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.gridHeader = action.payload.data.grid_header;
      state.gridData = action.payload.data.grid_data;
      state.selectedService.label = action.payload.data.label;
      state.selectedService.value = action.payload.data.value;
      state.isLoading = false;
    });
    builder.addCase(fetchAADGridData.rejected, (state, action) => {
      // Update state with fetched data on success
      state.isLoading = false;
    });

    builder.addCase(fetchAADEventDetails.pending, (state, action) => {
      // Update state with fetched data on success
      state.loadingRecord = true;
    });
    builder.addCase(fetchAADEventDetails.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.eventDetails = action.payload.data;
      state.loadingRecord = false;
    });
    builder.addCase(fetchAADEventDetails.rejected, (state, action) => {
      // Update state with fetched data on success
      state.loadingRecord = false;
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
} = AADPageSlice.actions;

export default AADPageSlice.reducer;

export const AADPageActionCreator = {
  ResetState,
  fetchAADGridData,
  fetchAADEventDetails,
};
