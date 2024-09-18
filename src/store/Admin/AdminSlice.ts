import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { RootState } from "../../configureStore";
import {
  FetchAdminData,
  tenantId,
  AddTenant,
  AddUsers,
  fetchFaqType,
  fetchPackagesType,
  UpdateUsers,
  tenantMatrixType,
} from "./AdminType";

import { InitialState } from "./AdminType";

const initialState: InitialState = {
  tenantData: [],
  tenantId: "",
  tenantMatrixId: "",
  tenantSchemaName: "",
  Users: [],
  isSuspended: false,
  UserData: [],
  tenantMatrixData: [],
  userMatrixData: [],
  Roles: [],
  fetchPackageData: [],
  fetchFaqData: [],
};

const fetchTenantData = createAsyncThunk<FetchAdminData>(
  "pageData/fetch",
  async () => {
    const response = await axiosPrivate.post(EndPoints.FETCH_TENANT_LIST, {});
    return response.data;
  }
);

const getUserDetailsData = createAsyncThunk<any, tenantId>(
  "userData/fetch",
  async (payload) => {
    const response = await axiosPrivate.post(EndPoints.USER_FETCH, payload);
    return response.data.Users;
  }
);

const addTenantData = createAsyncThunk<any, AddTenant, CallbackfunctionType>(
  "addTenant/post",
  async (payload) => {
    const response = await axiosPrivate.post(EndPoints.ADD_TENANT, payload);
    return response.data;
  }
);

const addUsersData = createAsyncThunk<any, AddUsers, CallbackfunctionType>(
  "addUsers/post",
  async (payload) => {
    const response = await axiosPrivate.post(
      EndPoints.USER_CREATE_UPDATE,
      payload
    );
    return response.data;
  }
);

const updateUsersDetails = createAsyncThunk<
  any,
  UpdateUsers,
  CallbackfunctionType
>("updateUsers/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.USER_CREATE_UPDATE,
    payload
  );
  return response.data;
});

const updateUserStatus = createAsyncThunk<
  any,
  {
    schemaName: string;
    email: string;
  },
  CallbackfunctionType
>("updateUsersStatus/post", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.USER_ENABLE_DISABLE,
    payload
  );
  return response.data;
});

const resetMfaStatus = createAsyncThunk<
  any,
  {
    schemaName: string;
    email: string;
  },
  CallbackfunctionType
>("resetMfaStatus/post", async (payload) => {
  const response = await axiosPrivate.post(EndPoints.MFA_RESET, payload);
  return response.data;
});

const tenantMatrix = createAsyncThunk<tenantMatrixType>(
  "tenantMatix/post",
  async () => {
    const response = await axiosPrivate.post(EndPoints.TENANT_MATRIX, {});
    return response.data;
  }
);

const fetchUserMatrix = createAsyncThunk<
  any,
  { schemaName: string },
  CallbackfunctionType
>("userMatix/post", async (payload) => {
  const response = await axiosPrivate.post(EndPoints.USER_MATRIX, payload);
  return response.data.userMatrix;
});

const fetchRoles = createAsyncThunk<
  any,
  { schemaName: string },
  CallbackfunctionType
>("fetchRoles/post", async (payload) => {
  const response = await axiosPrivate.post(EndPoints.FETCH_ROLES, payload);
  return response.data.data;
});

const fetchPackage = createAsyncThunk<fetchPackagesType>(
  "fetchPackage/get",
  async () => {
    const response = await axiosPrivate.post(EndPoints.FETCH_PACKAGE, {});
    return response.data;
  }
);

const fetchFaq = createAsyncThunk<fetchFaqType>("fetchFaq/get", async () => {
  const response = await axiosPrivate.post(EndPoints.FETCH_FAQ, {});
  return response.data;
});

const resetUserPassword = createAsyncThunk<
  any,
  {
    schemaName: string;
    email: string;
    password: string;
  },
  CallbackfunctionType
>("resetUserPassword", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.RESET_USER_PASSWORD,
    payload
  );
  return response.data;
});

const userPasswordReset = createAsyncThunk<
  any,
  {
    schemaName: string;
    email: string;
  },
  CallbackfunctionType
>("userPasswordReset", async (payload) => {
  const response = await axiosPrivate.post(
    EndPoints.ADMIN_RESET_PASSWORD,
    payload
  );
  return response.data;
});

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {
    resetState: (state: InitialState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTenantData.fulfilled, (state, action) => {
      state.tenantData = action.payload.data;
    });
    builder.addCase(getUserDetailsData.fulfilled, (state, action) => {
      state.Users = action.payload;
      state.tenantId = action.meta.arg.schema;
    });

    builder.addCase(addTenantData.fulfilled, (state, action) => {});
    builder.addCase(addUsersData.fulfilled, (state, action) => {});
    builder.addCase(updateUsersDetails.fulfilled, (state, action) => {});
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {});
    builder.addCase(resetMfaStatus.fulfilled, (state, action) => {});
    builder.addCase(resetUserPassword.fulfilled, (state, action) => {});
    builder.addCase(userPasswordReset.fulfilled, (state, action) => {});
    builder.addCase(tenantMatrix.fulfilled, (state, action) => {
      state.tenantMatrixData = action.payload.tenantMatrix;
    });
    builder.addCase(fetchUserMatrix.fulfilled, (state, action) => {
      state.userMatrixData = action.payload;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.Roles = action.payload;
    });
    builder.addCase(fetchPackage.fulfilled, (state, action) => {
      state.fetchPackageData = action.payload.data;
    });
    builder.addCase(fetchFaq.fulfilled, (state, action) => {
      state.fetchFaqData = action.payload.data;
    });
  },
});
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };
const { resetState } = AdminSlice.actions;
export default AdminSlice.reducer;
export const AdminActionCreator = {
  fetchTenantData,
  getUserDetailsData,
  addTenantData,
  addUsersData,
  updateUsersDetails,
  updateUserStatus,
  resetMfaStatus,
  tenantMatrix,
  fetchUserMatrix,
  fetchRoles,
  fetchPackage,
  fetchFaq,
  resetUserPassword,
  userPasswordReset,
  ResetState,
};
