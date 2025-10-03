import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  loginEndpoint,
  registerEndpoint,
  refreshTokenEndpoint,
  profileEndpoint,
} from "./endpoints/index";
import { exchangeCodeEndpoint } from "./endpoints/exchangeCode";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth", "Profile"],
  endpoints: (builder) => ({
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    profile: profileEndpoint(builder),
    exchangeCode: exchangeCodeEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // createOtp: createOtpEndpoint(builder),
    // verifyOtp: verifyOtpEndpoint(builder),
    // forgotPassword: forgotPasswordEndpoint(builder),
    // resetPassword: resetPasswordEndpoint(builder),
    // changePassword: changePasswordEndpoint(builder),
    // logout: logoutEndpoint(builder),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useProfileQuery,
  useExchangeCodeMutation,
} = authApi;
