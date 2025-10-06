import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/services/api/type";
import { ProductDto, ProductSearchParams } from "@/services/api/product.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const productsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<
    ApiResponse<{ items: ProductDto[]; pagination: any }>,
    ProductSearchParams
  >({
    query: (params) => ({
      url: API_ENDPOINTS.PRODUCTS.LIST,
      method: "GET",
      params,
    }),
    providesTags: ["Products"],
    transformResponse: (
      response: ApiResponse<{ items: ProductDto[]; pagination: any }>
    ) => {
      return response;
    },
  });
