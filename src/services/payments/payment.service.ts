import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export interface CreatePaymentRequest {
  orderId: string;
  amount: number;
  description?: string;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  transactionId: string | null; 
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  paymentMethod: string;      
  signature?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string | null;      
}

export interface PayOSPaymentLinkData {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED' | string; 
  checkoutUrl: string;
  qrCode: string;
}

export interface PayOSBlock {
  code: string;                 
  desc: string;                 
  data: PayOSPaymentLinkData;  
  signature: string;
}

export interface CreatePaymentApiResponse {
  success: boolean;          
  message: string;            
  data: {
    status: 'success' | 'failed' | string; 
    data: {
      payment: PaymentResponse;
      payosData: PayOSBlock;
    };
  };
  errors: unknown | null;
  statusCode: number;          
}

export interface CheckPaymentStatusResponse {
  success: boolean
  message: string
  data: {
    payment: PaymentResponse
  }
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Payment'],
  endpoints: (builder) => ({
    // Create payment request
    createPayment: builder.mutation<CreatePaymentApiResponse, CreatePaymentRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.PAYMENTS.CREATE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),

    // Check payment status from PayOS API
    getPaymentStatus: builder.query<CheckPaymentStatusResponse, string>({
      query: (orderCode) => ({
        url: `/payments/check-status/${orderCode}`,
        method: 'GET',
      }),
      providesTags: (result, error, orderCode) => [{ type: 'Payment', id: orderCode }],
    }),

  }),
})

export const {
  useCreatePaymentMutation,
  useGetPaymentStatusQuery,
} = paymentApi
