/**
 * Product Management Types
 */

import { CreateProductDto, UpdateProductDto } from '@/services/products/product.types'
import { ProductFormData as ProductFormDataLocal } from './product.types'

export interface ProductFormData extends Omit<CreateProductDto, 'vendorId'> {
  id?: string
}

export type ProductFormMode = 'create' | 'edit' | 'view'

export interface ProductFormProps {
  mode: ProductFormMode
  initialData?: ProductFormDataLocal
  onSubmit: (data: ProductFormDataLocal) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export interface ProductOption {
  name: string
  displayName: string
  values: Array<{ value: string }>
}

export interface ProductVariant {
  sku: string
  options: Record<string, string>
  price: number
  stockQty: number
  specs?: Record<string, any>
}

export interface ProductStock {
  quantity: number
  unit: string
}
