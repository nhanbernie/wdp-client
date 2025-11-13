import { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant';

export interface DeleteAddressResponse {
  success: boolean;
  message: string;
}

export const deleteAddressEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<DeleteAddressResponse, string>({
    query: (id) => ({
      url: API_ENDPOINTS.ADDRESSES.DETAILS(id),
      method: 'DELETE',
    }),
    invalidatesTags: ['Address'],
    transformResponse: (response: DeleteAddressResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error('Delete address error:', response);
      return response;
    },
  });

