import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';
import type { AddressResponse } from '../types';

export const setDefaultAddressEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddressResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.ADDRESSES.DETAILS(id),
      method: 'PATCH',
      body: { isDefault: true },
    }),
    invalidatesTags: ['Address'],
    transformResponse: (response: AddressResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Set default address error:', response);
      return response;
    },
  });

