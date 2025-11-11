import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../api/baseQuery';
import {
  getAddressesEndpoint,
  getAddressByIdEndpoint,
  createAddressEndpoint,
  updateAddressEndpoint,
  deleteAddressEndpoint,
  setDefaultAddressEndpoint,
} from './endpoints/index';

export const addressesApi = createApi({
  reducerPath: 'addressesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    getAddresses: getAddressesEndpoint(builder),
    getAddressById: getAddressByIdEndpoint(builder),
    createAddress: createAddressEndpoint(builder),
    updateAddress: updateAddressEndpoint(builder),
    deleteAddress: deleteAddressEndpoint(builder),
    setDefaultAddress: setDefaultAddressEndpoint(builder),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useLazyGetAddressesQuery,
  useLazyGetAddressByIdQuery,
} = addressesApi;

