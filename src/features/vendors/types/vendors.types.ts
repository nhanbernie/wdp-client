export interface VendorProfileDto {
  id: string
  businessName: string
  businessEmail?: string
  phoneNumber?: string
  description?: string
  address?: string
  logo?: string
  rating?: number
  totalReviews?: number
  totalProducts?: number
  totalSold?: number
  responseRate?: number
  responseTime?: string
  isVerified?: boolean
  joinedDate?: string
}

export interface VendorProductDto {
  id: string
  name: string
  thumbnail?: string
  images?: string[]
  price: number
  originalPrice?: number
  discount?: number
  sold?: number
  rating?: number
  isActive?: boolean
  brand?: string
  stock?: {
    quantity: number
    unit: string
  }
  badges?: string[]
  category?: {
    id: string
    name: string
  }
}

export interface VendorProductsListDto {
  products: VendorProductDto[]
  total: number
  page: number
  limit: number
}
