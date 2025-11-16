import { ProductDto } from '@/services/api/product.type'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  product?: ProductDto
  action?: string
  payload?: any
}
