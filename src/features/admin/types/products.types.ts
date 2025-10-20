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

export interface ProductListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}
