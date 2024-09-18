import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { axiosPrivate } from "../../helpers/ApiClient";
import { COPStateProps } from "./CostOfSecurityType";

const {
  GET_SECURITY_COST_CONTROL,
  GET_MASTER_TECHNOLOGY,
  UPDATE_COSTOFSECURITY_LAYOUT,
  RUN_VMF_ENGINE,
} = EndPoints;

const initialState: COPStateProps = {
  data: [],
  userTechnologies: [],
  entityTechnologies: [],
  assetTechnologies: [],
  isCostDataLoading: false,
  isSaving: false,
  isDropdownTechLoading: false,
  error: null,
};

// fetch cost of security data
export const FetchCostOfSecurity = createAsyncThunk<any, void>(
  "FetchCostOfSecurity",
  async () => {
    const res = await axiosPrivate.post(GET_SECURITY_COST_CONTROL);
    return res.data.data;
  }
);
// fetch cost of dropdown data
export const GetTechnologies = createAsyncThunk<any, void>(
  "GetTechnologies",
  async () => {
    const res = await axiosPrivate.post(GET_MASTER_TECHNOLOGY);
    return res.data.data;
  }
);
// update cost of security data
export const UpdateTechnologies = createAsyncThunk<any, any>(
  "UpdateTechnologies",
  async (data: any) => {
    const res = await axiosPrivate.post(UPDATE_COSTOFSECURITY_LAYOUT, {
      data: data,
    });
    // Not Using Await Here Beacuse This API Should Be In BackGround And Dont Have To Await For The Resp
    axiosPrivate.post(RUN_VMF_ENGINE);
    return res.data;
  }
);

export const CostOfSecurityStore = createSlice({
  name: "CostOfSecurity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchCostOfSecurity.pending, (state, action) => {
      state.isCostDataLoading = true;
    });

    builder.addCase(FetchCostOfSecurity.fulfilled, (state, action) => {
      // uodating the state with cost of security data response
      state.data = action.payload;
      state.isCostDataLoading = false;
    });
    builder.addCase(FetchCostOfSecurity.rejected, (state, action) => {
      state.isCostDataLoading = false;
      state.error = action.payload;
    });

    builder.addCase(GetTechnologies.pending, (state, action) => {
      state.isDropdownTechLoading = true;
      state.error = null;
    });
    builder.addCase(GetTechnologies.fulfilled, (state, action) => {
      // state.data = action.payload
      const data = action.payload;
      const assetTechnologies = data.filter((item: any) =>
        item.technology_type.startsWith("asset")
      );
      const userTechnologies = data.filter((item: any) =>
        item.technology_type.startsWith("user")
      );
      const entityTechnologies = data.filter((item: any) =>
        item.technology_type.startsWith("entity")
      );

      state.userTechnologies = userTechnologies;
      state.entityTechnologies = entityTechnologies;
      state.assetTechnologies = assetTechnologies;
      state.isDropdownTechLoading = false;
    });
    builder.addCase(GetTechnologies.rejected, (state, action) => {
      state.isDropdownTechLoading = false;
      state.error = action.payload;
    });
    builder.addCase(UpdateTechnologies.pending, (state, action) => {
      state.isSaving = true;
      state.error = null;
    });
    builder.addCase(UpdateTechnologies.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(UpdateTechnologies.rejected, (state, action) => {
      state.isSaving = false;
      state.error = action.payload;
    });
  },
});
// export const {} = CostOfSecurityStore.actions;
export default CostOfSecurityStore.reducer;
