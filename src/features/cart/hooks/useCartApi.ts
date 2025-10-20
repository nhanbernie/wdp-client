"use client";

import { useCallback } from "react";
import {
  useGetCartQuery,
  useGetCartCountQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from '@/services/cart';
import { useToast } from '@/hooks/useToast';

export const useCartApi = () => {
  const toast = useToast();
  
  // Queries
  const { data: cartData, isLoading: isLoadingCart, refetch: refetchCart } = useGetCartQuery();
  const { data: cartCountData, isLoading: isLoadingCount, refetch: refetchCount } = useGetCartCountQuery();
  
  // Mutations
  const [addToCartMutation, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [updateCartItemMutation, { isLoading: isUpdatingCartItem }] = useUpdateCartItemMutation();
  const [removeFromCartMutation, { isLoading: isRemovingFromCart }] = useRemoveFromCartMutation();
  const [clearCartMutation, { isLoading: isClearingCart }] = useClearCartMutation();

  // Helper functions
  const addToCart = useCallback(async (productId: string, quantity: number = 1, variantId?: string) => {
    try {
      await addToCartMutation({
        productId,
        quantity,
        variantId,
      }).unwrap();
      
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
      refetchCount();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng');
    }
  }, [addToCartMutation, toast, refetchCount]);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }
    
    try {
      await updateCartItemMutation({ cartItemId, quantity }).unwrap();
      toast.success('Đã cập nhật số lượng');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Không thể cập nhật số lượng');
    }
  }, [updateCartItemMutation, toast]);

  const removeFromCart = useCallback(async (cartItemId: string) => {
    try {
      await removeFromCartMutation(cartItemId).unwrap();
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      refetchCount();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  }, [removeFromCartMutation, toast, refetchCount]);

  const clearCart = useCallback(async () => {
    try {
      await clearCartMutation().unwrap();
      toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng');
      refetchCount();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Không thể xóa giỏ hàng');
    }
  }, [clearCartMutation, toast, refetchCount]);

  return {
    // Data
    cart: cartData?.data,
    cartCount: cartCountData?.data?.count || 0,
    
    // Loading states
    isLoadingCart,
    isLoadingCount,
    isAddingToCart,
    isUpdatingCartItem,
    isRemovingFromCart,
    isClearingCart,
    
    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Refetch functions
    refetchCart,
    refetchCount,
  };
};