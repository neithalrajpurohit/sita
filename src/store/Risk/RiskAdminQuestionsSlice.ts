import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { axiosPrivate } from "../../helpers/ApiClient";
import { EndPoints } from "../../helpers/ApiEndPoints";
import { SecondaryState, AddUpdatePayload, DeletePayLoad } from "./RiskType";
import { RootState } from "../../configureStore";
const {
  FETCH_RISK_PAGES,
  FETCH_RISK_QUESTIONS,
  ADD_UPDATE_RISK_QUESTION,
  DELETE_RISK_QUESTION,
} = EndPoints;

const initialState: SecondaryState = {
  langCode: "",
  totalPage: [],
  questions: {
    page: 0,
    page_data: [],
    screen_id: 0,
    screen_name: "",
    screen_type: "",
    lang_code: "",
  },
};

const FetchPageDropDown = createAsyncThunk("FetchPageDropDown", async () => {
  const respFeeds = await axiosPrivate.post(FETCH_RISK_PAGES, {});
  return respFeeds.data.data;
});

const FetchDataForSelectedPage = createAsyncThunk<
  any,
  { id: number; lang_code: string }
>("FetchDataForSelectedPage", async (payload) => {
  const respFeeds = await axiosPrivate.post(FETCH_RISK_QUESTIONS, {
    screen_id: payload.id,
    lang_code: payload.lang_code,
  });
  return respFeeds.data.response;
});

const AddUpdateRiskQuestion = createAsyncThunk<any, AddUpdatePayload>(
  "AddUpdateRiskQuestion",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(
      ADD_UPDATE_RISK_QUESTION,
      payload
    );
    return respFeeds.data.updatedData;
  }
);
const DeleteRiskQuestion = createAsyncThunk<any, DeletePayLoad>(
  "DeleteRiskQuestion",
  async (payload) => {
    const respFeeds = await axiosPrivate.post(DELETE_RISK_QUESTION, payload);
    return respFeeds.data.updatedData;
  }
);
const UpdateLanguageRisk = createAsyncThunk<any, string>(
  "UpdateLanguageRisk",
  async (payload) => {
    return payload;
  }
);

export const RiskQuestionSitaAdminStore = createSlice({
  name: "RiskQuestionSitaAdminStore",
  initialState,
  reducers: {
    resetState: (state: SecondaryState) => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // Use builder.addCase() to define extra reducers
    builder.addCase(FetchPageDropDown.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.totalPage = action.payload;
    });

    builder.addCase(FetchDataForSelectedPage.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.questions = action.payload;
    });
    builder.addCase(AddUpdateRiskQuestion.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.questions = action.payload;
    });
    builder.addCase(DeleteRiskQuestion.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.questions = action.payload;
    });
    builder.addCase(UpdateLanguageRisk.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.langCode = action.payload;
      state.totalPage = [];
      state.questions = {
        page: 0,
        page_data: [],
        screen_id: 0,
        screen_name: "",
        screen_type: "",
        lang_code: "",
      };
    });
    //   builder.addCase(FetchDashboardPageData.pending, (state, action) => {
    //     // Update state with fetched data on success
    //     state.isLoading = true;
    //   });
    //   builder.addCase(FetchDashboardPageData.fulfilled, (state, action) => {
    //     // Update state with fetched data on success
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   });
    //   builder.addCase(FetchDashboardPageData.rejected, (state, action) => {
    //     // Update state with fetched data on success
    //     state.isLoading = false;
    //   });
  },
});
const ResetState =
  () => async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(resetState());
  };

export const { resetState } = RiskQuestionSitaAdminStore.actions;
export default RiskQuestionSitaAdminStore.reducer;

export const RiskQuestionActionCreator = {
  FetchPageDropDown,
  FetchDataForSelectedPage,
  AddUpdateRiskQuestion,
  DeleteRiskQuestion,
  UpdateLanguageRisk,
  ResetState,
};
