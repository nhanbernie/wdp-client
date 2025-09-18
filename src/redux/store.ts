import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/services/auth";
import { userApi } from "@/services/user";
import { materialsApi } from "@/services/materials";
import { authReducer } from "./slices/auth.slice";
// import { apiErrorHandler } from "@/services/api/apiErrorHandler";

export const store = configureStore({
  reducer: {
    // Auth slice
    auth: authReducer,
    // RTK Query APIs
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      // Add RTK Query middleware
      authApi.middleware,
      userApi.middleware,
      materialsApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// Enable refetch on focus/reconnect for RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
