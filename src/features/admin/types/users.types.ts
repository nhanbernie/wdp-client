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

export interface UserListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface RecentOrder {
  orderId: string
  totalAmount: string
  status: string
  createdAt: string
}

export interface UserActivity {
  userId: string
  email: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string | null
  recentOrders: RecentOrder[]
  accountInfo: {
    createdAt: string
    isActive: boolean
    roles: string[]
  }
}

export type UserRole = 'admin' | 'vendor' | 'user'
