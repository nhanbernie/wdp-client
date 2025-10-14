import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import {
  productsEndpoint,
  productDetailEndpoint,
  createProductEndpoint,
  updateProductEndpoint,
  deleteProductEndpoint,
  getProductBySlugEndpoint,
} from './endpoints'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: productsEndpoint(builder),
    getProductDetail: productDetailEndpoint(builder),
    getProductBySlug: getProductBySlugEndpoint(builder),
    createProduct: createProductEndpoint(builder),
    updateProduct: updateProductEndpoint(builder),
    deleteProduct: deleteProductEndpoint(builder),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
