import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  ApiResponse,
  ExchangeCodeResponse,
  ExchangeCodeRequest,
} from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const exchangeCodeEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<ExchangeCodeResponse>, ExchangeCodeRequest>({
    query: (credentials) => ({
      url: API_ENDPOINTS.AUTH.EXCHANGE_CODE,
      method: "POST",
      body: credentials,
    }),

    invalidatesTags: ["User", "Auth"],
    transformResponse: (response: ApiResponse<ExchangeCodeResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error(
        "Exchange code to get authentication information error:",
        response
      );
      return response;
    },
  });
