import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { UserDto, ApiResponse } from "../api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Profile"],
  endpoints: (builder) => ({
    // Get user profile
    getProfile: builder.query<ApiResponse<UserDto>, void>({
      query: () => ({
        url: API_ENDPOINTS.USER.PROFILE,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // Update user profile
    updateProfile: builder.mutation<ApiResponse<UserDto>, Partial<UserDto>>({
      query: (userData) => ({
        url: API_ENDPOINTS.USER.UPDATE_PROFILE,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["Profile", "User"],
    }),

    // Upload avatar
    uploadAvatar: builder.mutation<ApiResponse<{ avatarUrl: string }>, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.USER.UPLOAD_AVATAR,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile", "User"],
    }),

    // Change password
    changePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { currentPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (passwordData) => ({
        url: API_ENDPOINTS.USER.CHANGE_PASSWORD,
        method: "POST",
        body: passwordData,
      }),
    }),

    // Delete account
    deleteAccount: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: API_ENDPOINTS.USER.DELETE_ACCOUNT,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = userApi;
