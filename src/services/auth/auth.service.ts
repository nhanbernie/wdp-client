import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  loginEndpoint,
  registerEndpoint,
  refreshTokenEndpoint,
  logoutEndpoint,
  profileEndpoint,
  exchangeCodeEndpoint,
  forgotPasswordEndpoint,
  verifyResetTokenEndpoint,
  resetPasswordEndpoint,
} from "./endpoints/index";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth", "Profile"],
  endpoints: (builder) => ({
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    logout: logoutEndpoint(builder),
    profile: profileEndpoint(builder),
    exchangeCode: exchangeCodeEndpoint(builder),
    forgotPassword: forgotPasswordEndpoint(builder),
    verifyResetToken: verifyResetTokenEndpoint(builder),
    resetPassword: resetPasswordEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // createOtp: createOtpEndpoint(builder),
    // verifyOtp: verifyOtpEndpoint(builder),
    // changePassword: changePasswordEndpoint(builder),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useProfileQuery,
  useExchangeCodeMutation,
  useForgotPasswordMutation,
  useVerifyResetTokenQuery,
  useResetPasswordMutation,
} = authApi;
