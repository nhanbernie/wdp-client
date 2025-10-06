import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/services/api/type";
import { ProductDto } from "@/services/api/product.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const productDetailEndpoint = (
  builder: EndpointBuilder<any, any, any>
) =>
  builder.query<ApiResponse<ProductDto>, string>({
    query: (id) => ({
      url: API_ENDPOINTS.PRODUCTS.DETAILS(id),
      method: "GET",
    }),
    providesTags: ["Products"],
    transformResponse: (response: ApiResponse<ProductDto>) => {
      return response;
    },
  });
