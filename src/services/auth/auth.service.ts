import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { loginEndpoint, registerEndpoint, refreshTokenEndpoint } from "./endpoints/index";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // createOtp: createOtpEndpoint(builder),
    // verifyOtp: verifyOtpEndpoint(builder),
    // forgotPassword: forgotPasswordEndpoint(builder),
    // resetPassword: resetPasswordEndpoint(builder),
    // changePassword: changePasswordEndpoint(builder),
    // logout: logoutEndpoint(builder),
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authApi;
