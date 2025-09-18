import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { 
  MaterialDto, 
  MaterialCategory, 
  ApiResponse, 
  MaterialSearchParams,
  PaginationParams 
} from "../api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const materialsApi = createApi({
  reducerPath: "materialsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Material", "Category"],
  endpoints: (builder) => ({
    // Get materials list with search and filters
    getMaterials: builder.query<
      ApiResponse<MaterialDto[]>,
      MaterialSearchParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.MATERIALS.LIST,
        method: "GET",
        params,
      }),
      providesTags: ["Material"],
    }),

    // Get material by ID
    getMaterial: builder.query<ApiResponse<MaterialDto>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.MATERIALS.DETAILS.replace(":id", id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Material", id }],
    }),

    // Get material categories
    getCategories: builder.query<ApiResponse<MaterialCategory[]>, void>({
      query: () => ({
        url: API_ENDPOINTS.MATERIALS.CATEGORIES,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Search materials
    searchMaterials: builder.query<
      ApiResponse<MaterialDto[]>,
      { query: string } & PaginationParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.MATERIALS.SEARCH,
        method: "GET",
        params,
      }),
      providesTags: ["Material"],
    }),

    // Create material (admin/supplier only)
    createMaterial: builder.mutation<
      ApiResponse<MaterialDto>,
      Omit<MaterialDto, "id" | "createdAt" | "updatedAt">
    >({
      query: (materialData) => ({
        url: API_ENDPOINTS.MATERIALS.CREATE,
        method: "POST",
        body: materialData,
      }),
      invalidatesTags: ["Material"],
    }),

    // Update material (admin/supplier only)
    updateMaterial: builder.mutation<
      ApiResponse<MaterialDto>,
      { id: string; data: Partial<MaterialDto> }
    >({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.MATERIALS.UPDATE.replace(":id", id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Material", id },
        "Material",
      ],
    }),

    // Delete material (admin/supplier only)
    deleteMaterial: builder.mutation<ApiResponse<{ message: string }>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.MATERIALS.DELETE.replace(":id", id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Material", id },
        "Material",
      ],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useGetCategoriesQuery,
  useSearchMaterialsQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
