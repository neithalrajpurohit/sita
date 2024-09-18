import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import {
  InitialState,
  FetchPageResponse,
  SecurityManagementFetchPageResponse,
  RiskStatusResponse,
} from "./RiskType";

import { RootState } from "../../configureStore";
import { toast } from "react-toastify";

const { GET_LAYOUT_RESPONSE, UPDATE_LAYOUT, RESET_LAYOUT } = EndPoints;

const clamp = (min: number, max: number, value: number) => {
  return Math.min(Math.max(value, min), max);
};

const initialState: InitialState = {
  pageData: {},
  filled: undefined,
  pageStatus: {},
  layoutInfo: [],
  response: {
    response: "",
    status: "",
  },
};

// Create the thunk, which will be a function that returns a Promise
const fetchPageData = createAsyncThunk<
  FetchPageResponse | SecurityManagementFetchPageResponse,
  number,
  {
    rejectValue: string;
  }
>("pageData/fetch", async (screenId, { rejectWithValue }) => {
  const response = await axiosPrivate.post<{
    response: FetchPageResponse | SecurityManagementFetchPageResponse;
  }>(
    screenId === 8
      ? EndPoints.FETCH_RISK_DETAILS_DATA
      : EndPoints.FETCH_RISK_JOURNEY,
    {
      screen_id: screenId,
    }
  );
  return response.data.response;
});

const updatePageData = createAsyncThunk<
  {
    data: FetchPageResponse | SecurityManagementFetchPageResponse;
    res: { response: string; status: string | number };
  },
  FetchPageResponse | SecurityManagementFetchPageResponse,
  {
    rejectValue: string;
  }
>("pageData/update", async (requestBody, { rejectWithValue }) => {
  if (Array.isArray(requestBody.page_data)) {
    // page 2-8
    // transform fields according to api
    const payload = {
      screen_type: requestBody.screen_type,
      payload: {
        screen_id: requestBody.screen_id,
        screen_name: requestBody.screen_name,
        questions: requestBody.page_data.map((question) => {
          return {
            question_id: question.question_id,
            selected_option: question.selected_answer,
          };
        }),
      },
    };
    const res = await axiosPrivate.post(EndPoints.UPDATE_RISK_JOURNEY, payload);
    toast(res.data.response, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    });
    try {
      return { data: requestBody, res: res.data };
    } finally {
      const toUpdatePayload = "";
      if (res.status === 200)
        await axiosPrivate.post(
          EndPoints.UPDATE_INHERENT_RESIDUAL_RISK,
          toUpdatePayload
        );
    }
  } else {
    // page 1
    // transform fields according to api
    const payload = {
      page: 1,
      entity_id: requestBody.entity_id,
      screen_type: requestBody.screen_type,
      screen_id: requestBody.screen_id,
      screen_name: requestBody.screen_name,
      payload: {
        security_governance: {
          ciso_lor: {
            selected_ciso_clor:
              requestBody.page_data.security_governance.selected_ciso_lor,
            ciso_others:
              requestBody.page_data.security_governance.ciso_lor_others,
            selected_ciso_others:
              requestBody.page_data.security_governance
                .selected_ciso_lor_others,
            deleted_ciso_others:
              requestBody.page_data.security_governance.deleted_ciso_others,
          },
          members: {
            selected_members:
              requestBody.page_data.security_governance.selected_members,
            member_others:
              requestBody.page_data.security_governance.members_others,
            selected_members_others:
              requestBody.page_data.security_governance.selected_members_others,
            deleted_members_others:
              requestBody.page_data.security_governance.deleted_members_others,
          },
          steering_committee:
            requestBody.page_data.security_governance.steering_committee,
          meeting_frequency:
            requestBody.page_data.security_governance.meeting_frequency,
          internal_audit_frequency:
            requestBody.page_data.security_governance.internal_audit_frequency,
        },
        security_organization: {
          direct_reports: clamp(
            0,
            500,
            parseInt(
              requestBody.page_data.security_organization
                .direct_reports as unknown as string
            )
          ),
          indirect_reports: clamp(
            0,
            500,
            parseInt(
              requestBody.page_data.security_organization
                .indirect_reports as unknown as string
            )
          ),
          flor: {
            selected_flor:
              requestBody.page_data.security_organization.selected_flor,
            flor_others:
              requestBody.page_data.security_organization.flor_others,
            selected_flor_others:
              requestBody.page_data.security_organization.selected_flor_others,
            deleted_flor_others:
              requestBody.page_data.security_organization.deleted_flor_others,
          },
          security_budget: parseInt(
            requestBody.page_data.security_organization
              .security_budget as unknown as string
          ),
        },
        security_compliance: {
          regulation: {
            selected_regulation:
              requestBody.page_data.security_compliance.selected_regulation,
            regulation_others:
              requestBody.page_data.security_compliance.regulation_others,
            deleted_regulation_others:
              requestBody.page_data.security_compliance
                .deleted_regulation_others,
          },
        },
      },
    };

    const res = await axiosPrivate.post(
      EndPoints.UPDATE_RISK_CONFIGUR_DATA,
      payload
    );
    toast(res.data.response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    });

    return {
      data: requestBody,
      res: {
        response: res.data.response.message,
        status: res.data.response.status,
      },
    };
  }
});

const fetchRiskFormStatus = createAsyncThunk<RiskStatusResponse, void>(
  "pageStatus",
  async () => {
    const res = await axiosPrivate.get(EndPoints.RISK_JOURNEY_STATUS);
    return res.data;
  }
);
const FetchLayout = createAsyncThunk<any, any>(
  "FetchRiskLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(GET_LAYOUT_RESPONSE, payload);
    return response.data;
  }
);
const UpdateLayout = createAsyncThunk<any, any>(
  "UpdateRiskLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(UPDATE_LAYOUT, payload);
    return response.data;
  }
);
const ResetLayout = createAsyncThunk<any, any>(
  "ResetRiskLayout",
  async (payload: any) => {
    const response = await axiosPrivate.post(RESET_LAYOUT, payload);
    return response.data;
  }
);
// Create slice
const riskOnboardingSlice = createSlice({
  name: "riskOnboarding",
  initialState,
  reducers: {
    resetPageStatus: (state, action: PayloadAction<number>) => {
      const pageNo = action.payload;
      state.pageStatus[pageNo] = {
        status: "idle",
        error: undefined,
      };
    },
    resetState: (state: InitialState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPageData.pending, (state, action) => {
      const pageNo = action.meta.arg;
      state.pageStatus[pageNo] = {
        status: "loading",
        error: undefined,
      };
    });
    builder.addCase(fetchPageData.fulfilled, (state, action) => {
      const pageNo = action.meta.arg;
      state.pageData[action.payload.page] = action.payload;

      state.pageStatus[pageNo]!.status = "loaded";
    });

    builder.addCase(fetchPageData.rejected, (state, action) => {
      const pageNo = action.meta.arg;
      state.pageStatus[pageNo] = {
        status: "failed",
        error: action.error.message,
      };
    });

    builder.addCase(updatePageData.pending, (state, action) => {
      const pageNo = action.meta.arg.page;
      state.pageStatus[pageNo] = {
        status: "saving",
        error: undefined,
      };
    });
    builder.addCase(updatePageData.fulfilled, (state, action) => {
      const pageNo = action.meta.arg.page;
      console.log("ss", action);
      state.pageData[action.payload.data.page] = action.payload.data;
      state.response = action.payload.res;
      state.pageStatus[pageNo]!.status = "saved";
    });

    builder.addCase(updatePageData.rejected, (state, action) => {
      const pageNo = action.meta.arg.page;
      state.pageStatus[pageNo] = {
        status: "failed",
        error: action.error.message,
      };
    });

    builder.addCase(fetchRiskFormStatus.fulfilled, (state, action) => {
      state.filled = action.payload;
    });
    builder.addCase(FetchLayout.fulfilled, (state, action) => {
      state.layoutInfo = [];
      state.layoutInfo = action.payload;
    });
    builder.addCase(ResetLayout.fulfilled, (state, action) => {
      // state.layoutInfo = [];
      // state.layoutInfo = action.payload;
    });
  },
});
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };
export const { resetState } = riskOnboardingSlice.actions;

export default riskOnboardingSlice.reducer;

export const riskOnboardingActionCreator = {
  fetchPageData,
  updatePageData,
  fetchRiskFormStatus,
  ...riskOnboardingSlice.actions,
  FetchLayout,
  UpdateLayout,

  ResetState,
  ResetLayout,
};
