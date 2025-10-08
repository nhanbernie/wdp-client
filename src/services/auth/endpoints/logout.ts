import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}

export const logoutEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<LogoutResponse, LogoutRequest>({
    query: (body: LogoutRequest) => ({
      url: API_ENDPOINTS.AUTH.LOGOUT,
      method: "POST",
      body,
    }),
  });