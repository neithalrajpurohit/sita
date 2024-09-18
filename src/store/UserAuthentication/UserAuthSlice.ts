import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Roles from "../../Data/UserRoles.json";
import { CallbackfunctionType } from "../../definition/StoreStateType";
import { TUserDetails } from "../../definition/UserDetails";
import { EndPoints } from "../../helpers/ApiEndPoints";
import {
  axiosPrivate,
  axiosPublic,
  setUserTokens,
} from "../../helpers/ApiClient";
import { AdminActionCreator } from "../Admin/AdminSlice";
import { AdminAssetActionCreator } from "../Admin/AdminAssetSlice";
import { entityCreationActionCreator } from "../Entity/EntityCreationSlice";
import { entityFunctionAndProcessesActionCreator } from "../Entity/EntityFunctionAndProcessSlice";
import { addEditAnalysisActionCreator } from "../AddEdits/AddEditPerspectiveSlice";
import { addSecurityPulseActionCreator } from "../AddEdits/AddEditSecurityPulseSlice";
import { RootState } from "../../configureStore";
import { AnalysisDetailsActionCreator } from "../Perspective/PerspectiveDetailSlice";
import { PerspectiveActionCreator } from "../Perspective/PerspectiveGridSlice";
import { SecurityPulseDetailsActionCreator } from "../SecurityPulse/SecurityPulseDetailsSlice";
import { SecurityPulseGridActionCreator } from "../SecurityPulse/SecurityPulseGridSlice";
import { riskOnboardingActionCreator } from "../Risk/RiskOnboardingSlice";
import { InsightDetailsActionCreator } from "../Insights/InsightDetailSlice";
import { InsightGridActionCreators } from "../Insights/InsightGridSlice";
import { RiskQuestionActionCreator } from "../Risk/RiskAdminQuestionsSlice";
import { OEIStoreNewActionCreator } from "../Oei/UpdatedOeiSlice";
import { InsightStoreNewActionCreator } from "../Insights/InsightSlice";
import { userAuthenticationState } from "./UserAuthType";
import { DashboardActionCreator } from "../Dashboard/DashboardSlice";
import { entityAssetsActionCreator } from "../Entity/EntityAssetSlice";
import i18next from "i18next";
import { AdvisoryActionCreator } from "../Advisory/AdvisorySlice";
import { RguPageActionCreator } from "../Rgu/RguSlice";
import { RUDActionCreator } from "../RiskUserDashboard/RUDSlice";
import { entityASVActionCreator } from "../Entity/EntityAssetSummaryValidationSlice";
import { AADPageActionCreator } from "../AutomaticAssetDiscovery/AADSlice";
import { ThreatIntelStoreActionCreator } from "../ThreatIntel/ThreatIntelSlice";

const initialState: userAuthenticationState = {
  userAcessToken: "" as string,
  userDetails: {} as TUserDetails,
  isUserDetailLoading: false,
  isUserDetailError: false,
  userDetailError: null as any,
  showAdminMenu: false,
  userClaims: {} as any,
  userRoles: {} as { name: string; claims: string[] } | undefined,
  isEditProfileLoading: false,
  isEdiProfileSuccess: false,
  isEditProfileError: false,
  isResetPasswordLoading: false,
  isResetPasswordSuccess: false,
  isResetPasswordError: false,
  resetPasswordMsg: {} as any,
  schema: "",
  editProfileMsg: "",
  isLoggedIn: false,
  invalidAttempt: 0,
  mfa_status: false,
  otpauth_url: "",
  email: "",
  password: "",
  host: "",
  language: "",
  package: "",
  first_time_login: true,
};

export const userAuthenticationStore = createSlice({
  name: "userAuthentication",
  initialState,

  reducers: {
    resetState: (state: userAuthenticationState) => {
      return {
        ...initialState,
        isLoggedIn: false,
        userAcessToken: "",
      };
    },
    getUserLang: (state: userAuthenticationState) => {
      let savedLang = sessionStorage.getItem("lang");
      state.language = savedLang || "enUS";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state: userAuthenticationState) => {
        return {
          ...state,
          isUserDetailLoading: true,
          isUserDetailError: false,
        };
      })
      .addCase(
        getUserDetails.fulfilled,
        (
          state: userAuthenticationState,
          action: PayloadAction<TUserDetails>
        ) => {
          return {
            ...state,
            isUserDetailLoading: false,
            userAcessToken: action.payload.access_token,
            userDetails: action.payload,
            isLoggedIn: action.payload.access_token.length > 0 ? true : false,
            isUserDetailError: false,
            schema: action.payload.schema,
            package: action.payload.package,
            host: window.location.hostname,
            first_time_login: action.payload.first_time_login,
            userClaims: {
              viewAnalysis: true,
              addViewAnalysis: true,
            },
            userRoles: Roles.roles.find(
              (x) => x.name === action.payload.user?.role?.toUpperCase()
            ),
            invalidAttempt: 0,
            email: "",
            password: "",
            language: action.payload.user.language,
          };
        }
      )
      .addCase(
        getUserDetails.rejected,
        (state: userAuthenticationState, action: any) => {
          return {
            ...state,
            isUserDetailLoading: false,
            isUserDetailError: true,
            userDetailError: action.error,
            invalidAttempt: state.invalidAttempt + 1,
          };
        }
      )
      .addCase(editProfile.pending, (state: userAuthenticationState) => {
        return {
          ...state,
          isEdiProfileSuccess: false,
          isEditProfileLoading: true,
          isEditProfileError: false,
        };
      })
      .addCase(
        editProfile.fulfilled,
        (state: userAuthenticationState, action: PayloadAction<any>) => {
          return {
            ...state,
            isEdiProfileSuccess: true,
            isEditProfileLoading: false,
            isEditProfileError: false,
            editProfileMsg: action.payload.apiResp.message,
            userDetails: {
              ...state.userDetails,
              user: {
                ...state.userDetails.user,
                first_name: action.payload.userInput.firstName,
                last_name: action.payload.userInput.lastName,
                profile_photo: action.payload.userInput.profile_photo,
                profile_photo_name: action.payload.userInput.profile_photo_name,
                phone_number: action.payload.userInput.phone_number,
              },
            },
          };
        }
      )
      .addCase(editProfile.rejected, (state: userAuthenticationState) => {
        return {
          ...state,
          isEdiProfileSuccess: false,
          isEditProfileLoading: false,
          isEditProfileError: true,
        };
      })
      .addCase(resetPassword.pending, (state: userAuthenticationState) => {
        return {
          ...state,
          isResetPasswordSuccess: false,
          isResetPasswordLoading: true,
          isResetPasswordError: false,
        };
      })
      .addCase(
        resetPassword.fulfilled,
        (state: userAuthenticationState, action: PayloadAction<any>) => {
          return {
            ...state,
            isResetPasswordSuccess: true,
            isResetPasswordLoading: false,
            isResetPasswordError: false,
            resetPasswordMsg: action.payload,
          };
        }
      )
      .addCase(
        resetPassword.rejected,
        (state: userAuthenticationState, action: PayloadAction<any>) => {
          return {
            ...state,
            isResetPasswordSuccess: false,
            isResetPasswordLoading: false,
            isResetPasswordError: true,
            resetPasswordMsg: action.payload.response.data,
          };
        }
      )
      .addCase(getUserDetailsNew.pending, (state: userAuthenticationState) => {
        return {
          ...state,
          isUserDetailLoading: true,
          isUserDetailError: false,
        };
      })
      .addCase(
        getUserDetailsNew.fulfilled,
        (state: userAuthenticationState, action: PayloadAction<any>) => {
          return {
            ...state,
            isUserDetailLoading: false,
            isUserDetailError: false,
            mfa_status: action.payload.mfa_status,
            otpauth_url: action.payload.otpauth_url,
            email: action.payload.email,
            password: action.payload.password,
            invalidAttempt: 0,
          };
        }
      )
      .addCase(
        getUserDetailsNew.rejected,
        (state: userAuthenticationState, action: any) => {
          return {
            ...state,
            isUserDetailLoading: false,
            isUserDetailError: true,
            userDetailError: action.error,
            invalidAttempt: state.invalidAttempt + 1,
          };
        }
      );
    builder.addCase(updateTheme.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.userDetails.user.theme_preference = action.payload.theme_preference;
    });
    builder.addCase(updateCompanyLogo.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.userDetails.user.company_logo = action.payload;
    });
    builder.addCase(updateCompanyLogo.rejected, (state, action) => {
      // Handle error here
    });
    builder.addCase(changeLanguage.fulfilled, (state, action) => {
      // Update state with fetched data on success
      state.language = action.payload.data.language;
    });
  },
});

export const { resetState, getUserLang } = userAuthenticationStore.actions;
export default userAuthenticationStore.reducer;

const {
  UPDATE_LANGUAGE,
  UPDATE_USER,
  UPDATE_PASSWORD,
  THEME_PREFERENCE,
  LOGIN1,
} = EndPoints;

const updateTheme = createAsyncThunk<
  any,
  {
    theme_preference: string;
  },
  CallbackfunctionType
>("updateTheme", async (payload: any) => {
  try {
    await axiosPrivate.post(THEME_PREFERENCE, payload);
    return payload;
  } catch (error) {
    console.error(error);
  }
});

const getUserDetailsNew = createAsyncThunk<any, any>(
  "getUserDetailsNew",
  async (payload) => {
    try {
      const resp = await axiosPublic.post(LOGIN1, payload);
      return { ...resp.data, ...payload.payload };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail);
    }
  }
);

const getUserDetails = createAsyncThunk<
  TUserDetails,
  {
    action: string;
    payload: {
      email: string;
      password: string;
      secret?: string;
      totp: string;
    };
  },
  CallbackfunctionType
>("getUserDetails", async (payload) => {
  try {
    const resp = await axiosPublic.post(LOGIN1, payload);
    setUserTokens({
      accessToken: resp.data.access_token,
      refreshToken: resp.data.refresh_token,
    });
    sessionStorage.setItem("lang", resp.data.user.language);
    i18next.changeLanguage(resp.data.user.language);
    return resp.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail);
  }
});

const editProfile = createAsyncThunk<
  any,
  {
    firstName: string;
    lastName: string;
    email: string;
    profile_photo: string;
    profile_photo_name: string;
    phone_number: string;
  },
  CallbackfunctionType
>("editProfile", async (payload) => {
  try {
    const resp = await axiosPrivate.post(UPDATE_USER, payload);
    return { apiResp: resp.data, userInput: payload };
  } catch (error) {
    throw new Error();
  }
});

const resetPassword = createAsyncThunk<
  any,
  { oldPassword: string; newPassword: string; email: string },
  CallbackfunctionType
>("resetPassword", async (payload) => {
  try {
    const resp = await axiosPrivate.post(UPDATE_PASSWORD, payload);
    return resp.data;
  } catch (error) {
    throw new Error();
  }
});

const updateCompanyLogo = createAsyncThunk<string, string>(
  "updateCompanyLogo",
  async (payload) => {
    // Send update request to API
    return payload;
  }
);

const changeLanguage = createAsyncThunk<any, string>(
  "changeLanguage",
  async (payload) => {
    const resp = await axiosPrivate.post(UPDATE_LANGUAGE, {
      language: payload,
    });
    return resp.data;
  }
);

const handleLogout = () => async (dispatch: any, getState: () => RootState) => {
  dispatch(resetState());
  dispatch(PerspectiveActionCreator.ResetState());
  dispatch(SecurityPulseGridActionCreator.ResetState());
  dispatch(AnalysisDetailsActionCreator.ResetState());
  dispatch(addEditAnalysisActionCreator.ResetState());
  dispatch(addSecurityPulseActionCreator.ResetState());
  dispatch(SecurityPulseDetailsActionCreator.ResetState());
  dispatch(InsightGridActionCreators.ResetState());
  dispatch(InsightDetailsActionCreator.ResetState());
  dispatch(OEIStoreNewActionCreator.ResetState());
  dispatch(InsightStoreNewActionCreator.ResetState());
  dispatch(RiskQuestionActionCreator.ResetState());
  dispatch(riskOnboardingActionCreator.ResetState());
  dispatch(DashboardActionCreator.ResetState());
  dispatch(entityAssetsActionCreator.ResetState());
  dispatch(entityCreationActionCreator.ResetState());
  dispatch(entityFunctionAndProcessesActionCreator.ResetState());
  dispatch(AdminAssetActionCreator.ResetState());
  dispatch(AdminActionCreator.ResetState());
  dispatch(AdvisoryActionCreator.ResetState());
  dispatch(RguPageActionCreator.ResetState());
  dispatch(RUDActionCreator.ResetState());
  dispatch(entityASVActionCreator.ResetState());
  dispatch(AADPageActionCreator.ResetState());
  dispatch(ThreatIntelStoreActionCreator.ResetState());
};

export const userAuthenticationActionCreator = {
  updateTheme,
  getUserDetails,
  handleLogout,
  editProfile,
  resetPassword,
  updateCompanyLogo,
  getUserDetailsNew,
  changeLanguage,
};
