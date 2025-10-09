export interface Vendor {
  id: string
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
  status: 'pending' | 'approved' | 'rejected'
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateVendorRequest {
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
}

export interface VendorResponse {
  success: boolean
  message: string
  data: Vendor
  errors: null | string[]
  statusCode: number
}

export interface VendorListResponse {
  success: boolean
  data: Vendor[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  errors: null | string[]
  statusCode: number
}

export interface VendorFilters {
  page?: number
  limit?: number
  status?: 'pending' | 'approved' | 'rejected'
  search?: string
}

export interface VendorState {
  vendors: Vendor[]
  currentVendor: Vendor | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: VendorFilters
}
