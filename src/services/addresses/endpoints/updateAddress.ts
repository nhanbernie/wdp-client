import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';
import type { UpdateAddressRequest, AddressResponse } from '../types';

export interface UpdateAddressParams {
  id: string;
  data: UpdateAddressRequest;
}

export const updateAddressEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddressResponse, UpdateAddressParams>({
    query: ({ id, data }) => ({
      url: API_ENDPOINTS.ADDRESSES.DETAILS(id),
      method: 'PATCH',
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }, 'Address'],
    transformResponse: (response: AddressResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Update address error:', response);
      return response;
    },
  });

