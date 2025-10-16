import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

// Types for Cart API
export interface AddToCartRequest {
  productId: string
  variantId?: string
  quantity: number
}

export interface UpdateCartItemRequest {
  quantity: number
}

export interface CartVariant {
  id: string
  sku: string
  optionValues: Array<{
    optionName: string
    value: string
  }>
}

export interface CartProduct {
  id: string
  name: string
  images: string[]
}

export interface CartItem {
  id: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product: CartProduct
  variant?: CartVariant
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalQuantity: number
  subtotal: number
  total: number
}

export interface CartCountResponse {
  count: number
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // Add product to cart
    addToCart: builder.mutation<{ data: CartItem }, AddToCartRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.CART.ADD,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Get cart contents
    getCart: builder.query<{ data: Cart }, void>({
      query: () => ({
        url: API_ENDPOINTS.CART.GET,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    // Get cart item count
    getCartCount: builder.query<{ data: CartCountResponse }, void>({
      query: () => ({
        url: API_ENDPOINTS.CART.COUNT,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    // Update cart item quantity
    updateCartItem: builder.mutation<void, { cartItemId: string; quantity: number }>({
      query: ({ cartItemId, quantity }) => ({
        url: API_ENDPOINTS.CART.UPDATE_ITEM.replace(':id', cartItemId),
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    // Remove item from cart
    removeFromCart: builder.mutation<void, string>({
      query: (cartItemId) => ({
        url: API_ENDPOINTS.CART.REMOVE_ITEM.replace(':id', cartItemId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    // Clear cart
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.CART.CLEAR,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useGetCartCountQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi