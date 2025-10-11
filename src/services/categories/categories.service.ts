import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQuery'
import { categoriesEndpoint } from './endpoints'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: categoriesEndpoint(builder),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
