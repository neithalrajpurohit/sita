import { TUserDetails } from "../../definition/UserDetails";

export interface userAuthenticationState {
  userAcessToken: string;
  userDetails: TUserDetails;
  isUserDetailLoading: boolean;
  isUserDetailError: boolean;
  userDetailError: any;
  showAdminMenu: boolean;
  userClaims: any;
  userRoles: { name: string; claims: string[] } | undefined;
  invalidAttempt: number;
  mfa_status: boolean;
  otpauth_url?: string;
  email: string;
  password: string;
  schema: string;
  host: string;
  language: string;
  package: string;
  first_time_login: boolean;

  //edit Profile
  isEditProfileLoading: boolean;
  isEdiProfileSuccess: boolean;
  isEditProfileError: boolean;

  //reset password
  isResetPasswordLoading: boolean;
  isResetPasswordSuccess: boolean;
  isResetPasswordError: boolean;
  resetPasswordMsg: any;
  editProfileMsg: string;
  isLoggedIn: boolean;
}
