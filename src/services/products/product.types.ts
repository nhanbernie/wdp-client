/**
 * Product Creation/Update Types
 */

export interface CreateProductOptionValue {
  value: string
}

export interface CreateProductOption {
  name: string
  displayName: string
  values: CreateProductOptionValue[]
}

export interface CreateProductVariant {
  sku: string
  options: Record<string, string> // e.g. { size: "M8", length: "50mm" }
  price: number
  stockQty: number
  specs?: Record<string, any>
}

export interface CreateProductDto {
  name: string
  slug: string
  categoryId: string
  vendorId: string
  brand: string
  thumbnail: string
  images: string[]
  price: number
  salePrice?: number
  currency: string
  stock: {
    quantity: number
    unit: string
  }
  badges?: string[]
  specs?: Record<string, any>
  options?: CreateProductOption[]
  variants?: CreateProductVariant[]
  shortDescription: string
  description: string
  datasheetUrl?: string
}

export interface UpdateProductDto extends CreateProductDto {
  isActive?: boolean
}

export interface CreateProductResponse {
  id: string
}

export interface UpdateProductResponse {
  id: string
}
