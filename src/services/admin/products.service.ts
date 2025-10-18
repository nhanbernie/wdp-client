import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { apiClient } from '../api/apiClient'

export interface ProductListItem {
  id: string
  name: string
  slug: string
  price: number
  stockQty: number
  isActive: boolean
  categoryId: string
  categoryName: string
  vendorId: string
  vendorName: string
  totalSold: number
  createdAt: string
}

export interface ProductListParams {
  page?: number
  limit?: number
  stockLevel?: 'low' | 'out'
  isActive?: boolean
  sortBy?: string
  order?: 'ASC' | 'DESC'
}

export interface ProductListResponse {
  data: ProductListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface UpdateStockPayload {
  stockQuantity: number
  reason: string
}

export const productsService = {
  /**
   * Get all products with pagination and filters
   */
  getProducts: async (params?: ProductListParams): Promise<ProductListResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.stockLevel) queryParams.append('stockLevel', params.stockLevel)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params?.order) queryParams.append('order', params.order)

    const url = `${API_ENDPOINTS.ADMIN.PRODUCTS}${queryParams.toString() ? `?${queryParams}` : ''}`
    const response = await apiClient.get<ProductListResponse>(url)
    return response.data
  },

  /**
   * Update product stock
   */
  updateStock: async (productId: string, payload: UpdateStockPayload): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.ADMIN.PRODUCT_STOCK(productId), payload)
    return response.data
  },
}
