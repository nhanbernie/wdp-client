import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { RegisterRequest, ApiResponse, RegisterResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const registerEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
    query: (userData) => ({
      url: API_ENDPOINTS.AUTH.REGISTER,
      method: "POST",
      body: userData,
    }),

    invalidatesTags: ["User", "Auth"],
    transformResponse: (response: ApiResponse<RegisterResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Register error:", response);
      return response;
    },
  });
