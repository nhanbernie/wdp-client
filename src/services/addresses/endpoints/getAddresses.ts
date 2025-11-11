import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';
import type { AddressListResponse } from '../types';

export const getAddressesEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<AddressListResponse, void>({
    query: () => ({
      url: API_ENDPOINTS.ADDRESSES.LIST,
      method: 'GET',
    }),
    providesTags: ['Address'],
    transformResponse: (response: AddressListResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Get addresses error:', response);
      return response;
    },
  });

