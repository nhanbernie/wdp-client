import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@/services/auth'
import { userApi } from '@/services/user'
import { materialsApi } from '@/services/materials'
import { authReducer } from './slices/auth.slice'
import { productReducer } from './slices/product.slice'
import { productsApi } from '@/services/products'
import { vendorApi } from '@/services/vendor/vendor.service'

import { categoriesApi } from '@/services/categories/categories.service'
import { cartApi } from '@/services/cart'
import { ordersApi } from '@/services/orders/orders.service'
import { paymentApi } from '@/services/payments'
import { adminApi } from '@/services/admin/admin.service'
// import { apiErrorHandler } from "@/services/api/apiErrorHandler";

export const store = configureStore({
  reducer: {
    // Local state slices
    auth: authReducer,
    product: productReducer,
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,

    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      // Add RTK Query middleware
      authApi.middleware,
      userApi.middleware,
      materialsApi.middleware,
      productsApi.middleware,
      vendorApi.middleware,

      categoriesApi.middleware,
      cartApi.middleware,
      ordersApi.middleware,
      paymentApi.middleware,
      adminApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
})

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
