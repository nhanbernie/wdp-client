import { PaginationParams } from '../api/type'

export interface CategorySearchParams extends PaginationParams {
  q?: string
  parentId?: string
  productCount?: boolean
}

export interface CategoryDto {
  id: string
  name: string
  slug: string
  thumbnail?: string
  parentId?: string
  productCount?: number
}
