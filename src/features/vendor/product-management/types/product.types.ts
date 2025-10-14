export interface ProductFormData {
  name: string
  slug: string
  categoryId: string
  brand: string
  thumbnail: string
  images: string[]
  price: number
  salePrice?: number | null
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any> | null
  options?: ProductOption[] | null
  variants?: ProductVariant[] | null
  shortDescription: string
  description: string
  datasheetUrl?: string | null
}

export interface ProductOption {
  name: string
  displayName: string
  values: ProductOptionValue[]
}

export interface ProductOptionValue {
  value: string
}

export interface ProductVariant {
  sku: string
  options: Record<string, string>
  price: number
  stockQty: number
  specs?: Record<string, any> | null
}

export interface ProductTableItem {
  id: string
  name: string
  slug: string
  thumbnail: string
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  category: {
    id: string
    name: string
  }
  brand: string
  badges: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}
