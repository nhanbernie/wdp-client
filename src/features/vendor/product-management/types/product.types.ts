export interface ProductFormData {
  id?: string
  name: string
  slug: string
  categoryId: string
  brand: string
  thumbnail: string | File
  images: (string | File)[]
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any>
  options?: ProductOption[]
  variants?: ProductVariant[]
  shortDescription: string
  description: string
  datasheetUrl?: string
}

export interface ProductOption {
  name: string
  displayName?: string // Optional, can be auto-generated from name
  values: string[] | ProductOptionValue[] // Support both formats
}

export interface ProductOptionValue {
  value: string
}

export interface ProductVariant {
  sku: string
  options: Record<string, string>
  price: number
  stockQty: number
  specs?: Record<string, any>
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
