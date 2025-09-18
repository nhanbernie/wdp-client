import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { RefreshTokenRequest, ApiResponse, RefreshTokenResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const refreshTokenEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<RefreshTokenResponse>, RefreshTokenRequest>({
    query: (tokenData) => ({
      url: API_ENDPOINTS.AUTH.REFRESH,
      method: "POST",
      body: tokenData,
    }),

    invalidatesTags: ["Auth"],
    transformResponse: (response: ApiResponse<RefreshTokenResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Refresh token error:", response);
      return response;
    },
  });
