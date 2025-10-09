import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  createVendorEndpoint,
  getVendorsEndpoint,
  getVendorByIdEndpoint,
  getMyVendorProfileEndpoint,
  updateVendorEndpoint,
  deleteVendorEndpoint,
  approveVendorEndpoint,
  rejectVendorEndpoint,
  suspendVendorEndpoint,
} from "./endpoints/index";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Vendor"],
  endpoints: (builder) => ({
    createVendor: createVendorEndpoint(builder),
    getVendors: getVendorsEndpoint(builder),
    getVendorById: getVendorByIdEndpoint(builder),
    getMyVendorProfile: getMyVendorProfileEndpoint(builder),
    updateVendor: updateVendorEndpoint(builder),
    deleteVendor: deleteVendorEndpoint(builder),
    approveVendor: approveVendorEndpoint(builder),
    rejectVendor: rejectVendorEndpoint(builder),
    suspendVendor: suspendVendorEndpoint(builder),
  }),
});

export const {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useGetMyVendorProfileQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useApproveVendorMutation,
  useRejectVendorMutation,
  useSuspendVendorMutation,
} = vendorApi;
