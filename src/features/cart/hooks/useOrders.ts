"use client";

import { useCallback } from "react";
import {
  useCheckoutFromCartMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByNumberQuery,
  useGetOrderStatisticsQuery,
  useCancelOrderMutation,
  type CheckoutFromCartRequest,
  type GetOrdersParams,
} from '@/services/orders/orders.service';
import { useToast } from '@/hooks/useToast';

export const useOrders = (ordersParams?: GetOrdersParams) => {
  const toast = useToast();
  
  // Queries
  const { 
    data: ordersData, 
    isLoading: isLoadingOrders, 
    refetch: refetchOrders 
  } = useGetOrdersQuery(ordersParams || {});
  
  const { 
    data: statisticsData, 
    isLoading: isLoadingStatistics 
  } = useGetOrderStatisticsQuery();
  
  // Mutations
  const [checkoutFromCartMutation, { isLoading: isCheckingOut }] = useCheckoutFromCartMutation();
  const [cancelOrderMutation, { isLoading: isCancelling }] = useCancelOrderMutation();

  // Helper functions
  const checkoutFromCart = useCallback(async (checkoutData: CheckoutFromCartRequest) => {
    try {
      const result = await checkoutFromCartMutation(checkoutData).unwrap();
      toast.success('Đặt hàng thành công!');
      return result.data;
    } catch (error: any) {      
      toast.error(error?.data?.message || 'Không thể đặt hàng');
      throw error;
    }
  }, [checkoutFromCartMutation, toast]);

  const cancelOrder = useCallback(async (orderId: string) => {
    try {
      await cancelOrderMutation(orderId).unwrap();
      toast.success('Đã hủy đơn hàng');
      refetchOrders();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Không thể hủy đơn hàng');
    }
  }, [cancelOrderMutation, toast, refetchOrders]);

  return {
    // Data
    orders: ordersData?.data || [],
    pagination: ordersData?.pagination,
    statistics: statisticsData?.data,
    
    // Loading states
    isLoadingOrders,
    isLoadingStatistics,
    isCheckingOut,
    isCancelling,
    
    // Actions
    checkoutFromCart,
    cancelOrder,
    
    // Refetch functions
    refetchOrders,
  };
};

export const useOrderDetail = (orderId?: string, orderNumber?: string) => {
  const { 
    data: orderByIdData, 
    isLoading: isLoadingById 
  } = useGetOrderByIdQuery(orderId || '', { skip: !orderId });
  
  const { 
    data: orderByNumberData, 
    isLoading: isLoadingByNumber 
  } = useGetOrderByNumberQuery(orderNumber || '', { skip: !orderNumber });

  const order = orderId ? orderByIdData?.data : orderByNumberData?.data;
  const isLoading = orderId ? isLoadingById : isLoadingByNumber;

  return {
    order,
    isLoading,
  };
};