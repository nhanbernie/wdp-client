// Quote Request Types for User
export interface CreateQuoteRequestData {
  productId: string
  quantity: number
  specifications?: string
  deliveryAddress?: string
  requestNotes?: string
}

export interface QuoteRequest {
  id: string
  userId: string
  productId: string
  vendorId: string
  quantity: number
  status: 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'
  specifications: string | null
  deliveryAddress: string | null
  requestNotes: string | null
  responsePrice: string | null
  responseNotes: string | null
  validUntil: string | null
  quotedAt: string | null
  createdAt: string
  updatedAt: string
  product?: {
    id: string
    name: string
    thumbnail: string
    price: string
    stockUnit: string
    vendor?: {
      id: string
      businessName: string
    }
  }
  vendor?: {
    id: string
    businessName: string
    businessPhone: string
  }
}

export interface QuoteRequestResponse {
  success: boolean
  message: string
  data: QuoteRequest
}

export interface QuoteRequestListResponse {
  success: boolean
  message: string
  data: QuoteRequest[]
}

export type QuoteRequestStatus =
  | 'pending'
  | 'quoted'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'cancelled'
