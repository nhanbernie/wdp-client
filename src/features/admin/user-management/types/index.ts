export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'supplier'
  avatar?: string
  phone?: string
  address?: string
  isEmailVerified: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserFilters {
  page?: number
  limit?: number
  role?: string
  isActive?: boolean
  search?: string
}

export type TabValue = 'users' | 'vendors'
