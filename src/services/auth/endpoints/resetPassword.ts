import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const resetPasswordEndpoint = (builder: any) =>
  builder.mutation({
    query: (body: ResetPasswordRequest) => ({
      url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
      method: "POST",
      body,
    }),
    invalidatesTags: ["Auth"],
  });
