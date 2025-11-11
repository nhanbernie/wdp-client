import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';
import type { CreateAddressRequest, AddressResponse } from '../types';

export const createAddressEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<AddressResponse, CreateAddressRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.ADDRESSES.CREATE,
      method: 'POST',
      body,
    }),
    invalidatesTags: ['Address'],
    transformResponse: (response: AddressResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Create address error:', response);
      return response;
    },
  });

