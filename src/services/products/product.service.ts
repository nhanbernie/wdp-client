import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { productsEndpoint } from "./endpoints/listProduct";
import { productDetailEndpoint } from "./endpoints/getProductDetail";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: productsEndpoint(builder),
    getProductDetail: productDetailEndpoint(builder),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productsApi;
