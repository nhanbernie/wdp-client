import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface VerifyResetTokenRequest {
  token: string;
}

export interface VerifyResetTokenResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
  };
  errors?: any;
  statusCode: number;
}

export const verifyResetTokenEndpoint = (builder: any) =>
  builder.query({
    query: ({ token }: VerifyResetTokenRequest) => ({
      url: `${API_ENDPOINTS.AUTH.RESET_PASSWORD}/verify?token=${token}`,
      method: "GET",
    }),
  });
