import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';
import type { AddressResponse } from '../types';

export const getAddressByIdEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<AddressResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.ADDRESSES.DETAILS(id),
      method: 'GET',
    }),
    providesTags: (result, error, id) => [{ type: 'Address', id }],
    transformResponse: (response: AddressResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Get address by id error:', response);
      return response;
    },
  });

