import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { LoginRequest, ApiResponse, LoginResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const loginEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
    query: (credentials) => ({
      url: API_ENDPOINTS.AUTH.LOGIN,
      method: "POST",
      body: credentials,
    }),

    invalidatesTags: ["User", "Auth"],
    transformResponse: (response: ApiResponse<LoginResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Login error:", response);
      return response;
    },
  });
