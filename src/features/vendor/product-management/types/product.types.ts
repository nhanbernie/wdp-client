export interface ProductFormData {
  name: string
  slug: string
  categoryId: string
  brand: string
  thumbnail: string | File
  images: (string | File)[]
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
  displayName?: string // Optional, can be auto-generated from name
  values: string[] | ProductOptionValue[] // Support both formats
}

export interface ProductOptionValue {
  value: string
}

export interface ProductVariant {
  sku?: string | null
  options: Record<string, string>
  price: number | string
  stockQty?: number
  stock?: number | string // Alternative field name for stockQty
  image?: string | File | null // Variant-specific image
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
