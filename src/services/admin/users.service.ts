import { API_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { apiClient } from '../api/apiClient'

export interface UserListItem {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  roles: string[]
  isActive: boolean
  totalOrders: number
  totalSpent: number
  createdAt: string
}

export interface UserListParams {
  page?: number
  limit?: number
  role?: string
  isActive?: boolean
  sortBy?: string
  order?: 'ASC' | 'DESC'
}

export interface UserListResponse {
  data: UserListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface UserActivity {
  userId: string
  email: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string | null
  recentOrders: Array<{
    orderId: string
    totalAmount: string
    status: string
    createdAt: string
  }>
  accountInfo: {
    createdAt: string
    isActive: boolean
    roles: string[]
  }
}

export interface BanUserPayload {
  isActive: boolean
  reason: string
}

export interface ChangeRolePayload {
  role: string
  reason: string
}

export const usersService = {
  /**
   * Get all users with pagination and filters
   */
  getUsers: async (params?: UserListParams): Promise<UserListResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.role) queryParams.append('role', params.role)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params?.order) queryParams.append('order', params.order)

    const url = `${API_ENDPOINTS.ADMIN.USERS}${queryParams.toString() ? `?${queryParams}` : ''}`
    const response = await apiClient.get<UserListResponse>(url)
    return response.data
  },

  /**
   * Get user activity by ID
   */
  getUserActivity: async (userId: string): Promise<UserActivity> => {
    const response = await apiClient.get<UserActivity>(API_ENDPOINTS.ADMIN.USER_ACTIVITY(userId))
    return response.data
  },

  /**
   * Ban or unban user
   */
  banUser: async (userId: string, payload: BanUserPayload): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.ADMIN.USER_BAN(userId), payload)
    return response.data
  },

  /**
   * Change user role
   */
  changeUserRole: async (userId: string, payload: ChangeRolePayload): Promise<any> => {
    const response = await apiClient.patch(API_ENDPOINTS.ADMIN.USER_ROLE(userId), payload)
    return response.data
  },
}
