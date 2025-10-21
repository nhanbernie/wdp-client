import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import { ProductListResponse, ProductFilters } from '../vendor.types'
import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'

export const getVendorProductsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ProductListResponse, ProductFilters | void>({
    query: (filters) => {
      const params = new URLSearchParams()

      // Map frontend filters to API query params
      if (filters && filters.search) params.append('q', filters.search) // q instead of search
      if (filters && filters.categoryId) params.append('categoryId', filters.categoryId)
      if (filters && filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters && filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      
      // Map sortBy and order to single sort param
      if (filters && filters.sortBy) {
        const sortMap: Record<string, string> = {
          'createdAt': 'newest',
          'price': filters.order === 'DESC' ? 'price_desc' : 'price_asc',
          'name': 'newest', // fallback to newest for name sort
        }
        params.append('sort', sortMap[filters.sortBy] || 'newest')
      }
      
      if (filters && filters.page) params.append('page', filters.page.toString())
      if (filters && filters.limit) params.append('limit', filters.limit.toString())
      if (filters && filters.isActive !== undefined) params.append('inStock', filters.isActive.toString())

      return {
        url: `${API_ENDPOINTS.VENDOR.PRODUCTS.LIST}?${params.toString()}`,
        method: 'GET',
      }
    },
    providesTags: ['Vendor'],
  })
