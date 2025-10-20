export interface UsersByRole {
  admin: number
  vendor: number
  user: number
}

export interface NewUsersOverTime {
  date: string
  count: number
}

export interface TopCustomer {
  userId: string
  email: string
  totalOrders: number
  totalSpent: number
}

export interface UserAnalytics {
  usersByRole: UsersByRole
  newUsersOverTime: NewUsersOverTime[]
  topCustomers: TopCustomer[]
  userGrowth: number
}

export interface BestSellingProduct {
  productId: string | null
  productName: string
  totalSold: number
  revenue: number
}

export interface CategoryPerformance {
  categoryId: string
  categoryName: string
  totalProducts: number
  totalSold: number
  revenue: number
}

export interface ProductAnalytics {
  bestSellingProducts: BestSellingProduct[]
  lowStockProducts: any[]
  outOfStockProducts: any[]
  categoriesPerformance: CategoryPerformance[]
}
