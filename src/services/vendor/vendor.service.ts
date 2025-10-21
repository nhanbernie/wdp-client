import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import {
  createVendorEndpoint,
  getVendorsEndpoint,
  getVendorsByStatusEndpoint,
  getVendorByIdEndpoint,
  getMyVendorProfileEndpoint,
  updateVendorEndpoint,
  deleteVendorEndpoint,
  approveVendorEndpoint,
  rejectVendorEndpoint,
  suspendVendorEndpoint,
  updateMyVendorProfileEndpoint,
  getVendorProductsEndpoint,
  createProductEndpoint,
  updateProductEndpoint,
  deleteProductEndpoint,
  getProductDetailEndpoint,
  getVendorQuoteRequestsEndpoint,
  getQuoteRequestDetailEndpoint,
  respondToQuoteEndpoint,
  getVendorOrdersEndpoint,
  getOrderDetailEndpoint,
  getOrderStatisticsEndpoint,
} from './endpoints/index'

export const vendorApi = createApi({
  reducerPath: 'vendorApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vendor'],
  endpoints: (builder) => ({
    // Vendor Management
    createVendor: createVendorEndpoint(builder),
    getVendors: getVendorsEndpoint(builder),
    getVendorsByStatus: getVendorsByStatusEndpoint(builder),
    getVendorById: getVendorByIdEndpoint(builder),
    getMyVendorProfile: getMyVendorProfileEndpoint(builder),
    updateVendor: updateVendorEndpoint(builder),
    deleteVendor: deleteVendorEndpoint(builder),
    approveVendor: approveVendorEndpoint(builder),
    rejectVendor: rejectVendorEndpoint(builder),
    suspendVendor: suspendVendorEndpoint(builder),

    // Vendor Profile
    updateMyVendorProfile: updateMyVendorProfileEndpoint(builder),

    // Products
    getVendorProducts: getVendorProductsEndpoint(builder),
    createProduct: createProductEndpoint(builder),
    updateProduct: updateProductEndpoint(builder),
    deleteProduct: deleteProductEndpoint(builder),
    getProductDetail: getProductDetailEndpoint(builder),

    // Quote Requests
    getVendorQuoteRequests: getVendorQuoteRequestsEndpoint(builder),
    getQuoteRequestDetail: getQuoteRequestDetailEndpoint(builder),
    respondToQuote: respondToQuoteEndpoint(builder),

    // Orders
    getVendorOrders: getVendorOrdersEndpoint(builder),
    getOrderDetail: getOrderDetailEndpoint(builder),
    getOrderStatistics: getOrderStatisticsEndpoint(builder),
  }),
})

export const {
  // Vendor Management
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetVendorsByStatusQuery,
  useGetVendorByIdQuery,
  useGetMyVendorProfileQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,

  // Vendor Profile
  useUpdateMyVendorProfileMutation,

  // Products
  useGetVendorProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductDetailQuery,

  // Quote Requests
  useGetVendorQuoteRequestsQuery,
  useGetQuoteRequestDetailQuery,
  useRespondToQuoteMutation,

  // Orders
  useGetVendorOrdersQuery,
  useGetOrderDetailQuery,
  useGetOrderStatisticsQuery,
} = vendorApi
