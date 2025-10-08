import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const forgotPasswordEndpoint = (builder: any) =>
  builder.mutation({
    query: (body: ForgotPasswordRequest) => ({
      url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      method: "POST",
      body,
    }),
    invalidatesTags: ["Auth"],
  });
