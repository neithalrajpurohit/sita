export interface TUserDetails {
  is_admin: any;
  access_token: string;
  refresh_token: string;
  user: User;
  schema: string;
  package: string;
  first_time_login: boolean;
  password_validity: string;
}
export interface User {
  is_superuser: Boolean;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  role?: string;
  profile_photo: string;
  profile_photo_name: string;
  phone_number: string;
  company_logo: string;
  theme_preference: string;
  language: string;
}
