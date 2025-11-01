export interface Vendor {
  id: string
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  userId: string
  createdAt: string
  updatedAt: string
}

// Vendor Profile (from API spec) - Same as Vendor
export interface VendorProfile {
  id: string
  userId: string
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  createdAt: string
  updatedAt: string
}

export interface UpdateVendorProfileRequest {
  businessName?: string
  businessDescription?: string
  businessAddress?: string
  businessPhone?: string
  businessEmail?: string
  businessLicense?: string
  taxId?: string
}

// Product Types
export interface ProductOption {
  id: string
  name: string
  displayName: string
  values: ProductOptionValue[]
}

export interface ProductOptionValue {
  id: string
  value: string
}

export interface ProductVariant {
  id: string
  sku: string
  options: Record<string, string>
  price: string
  stockQty: number
  isActive: boolean
  specs?: Record<string, any>
}

export interface Product {
  id: string
  name: string
  slug: string
  thumbnail: string
  images: string[]
  price: string | number
  salePrice: string | number | null
  currency: string
  stockQty: number
  stockUnit: string
  stock: {
    // API also returns this format
    quantity: number
    unit: string
  }
  specs: Record<string, any>
  specsSummary?: string[] // API returns this
  description: string
  shortDescription: string
  datasheetUrl: string | null
  badges: string[]
  isActive: boolean
  isFeatured: boolean
  categoryId: string
  vendorId: string
  brand?: string
  options?: ProductOption[]
  variants?: ProductVariant[]
  category?: {
    id: string
    name: string
    slug: string
  }
  vendor?: {
    id: string
    businessName: string
    logo?: string | null
    businessAddress?: string
    businessPhone?: string
    isVerified?: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface CreateProductRequest {
  name: string
  categoryId: string
  price: number
  stockQty: number
  slug?: string
  brand?: string
  salePrice?: number
  currency?: string
  stockUnit?: string
  shortDescription?: string
  description?: string
  datasheetUrl?: string
  isActive?: boolean
  isFeatured?: boolean
  specs?: Record<string, any>
  options?: {
    name: string
    displayName: string
    values: { value: string }[]
  }[]
  variants?: {
    sku: string
    options: Record<string, string>
    price: number
    stockQty: number
    specs?: Record<string, any>
  }[]
  badges?: string[]
  thumbnail?: File
  images?: File[]
  thumbnailUrl?: string
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface ProductFilters {
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'price' | 'name' | 'createdAt'
  order?: 'ASC' | 'DESC'
  page?: number
  limit?: number
  isActive?: boolean
}

// Quote Request Types
export interface QuoteRequest {
  id: string
  userId: string
  productId: string
  vendorId: string
  quantity: number
  status: 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'
  specifications: string
  deliveryAddress: string
  requestNotes: string | null
  responsePrice: string | null
  responseNotes: string | null
  validUntil: string | null
  quotedAt: string | null
  createdAt: string
  updatedAt: string
  product?: Product
  user?: {
    id: string
    email: string
    name: string
    phone: string
  }
  vendor?: {
    id: string
    businessName: string
    businessPhone: string
  }
}

export interface RespondQuoteRequest {
  responsePrice: number
  responseNotes?: string
  validUntil?: string
}

// Order Types
export interface OrderItem {
  id: string
  productId: string
  variantId: string | null
  quantity: number
  unitPrice: string
  totalPrice: string
  product?: Product
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  paymentTransactionId: string | null
  subtotal: string
  shippingFee: string
  total: string
  currency: string
  shippingAddress: string
  customerNotes: string | null
  notes: string | null
  trackingNumber: string | null
  shippingProvider: string | null
  estimatedDelivery: string | null
  actualDelivery: string | null
  createdAt: string
  updatedAt: string
  confirmedAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
  cancelledAt: string | null
  items: OrderItem[]
  user?: {
    id: string
    email: string
    name: string
    phone: string
  }
}

export interface OrderFilters {
  status?: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded'
  fromDate?: string
  toDate?: string
  page?: number
  limit?: number
}

export interface OrderStatistics {
  totalOrders: number
  totalRevenue: string
  byStatus: {
    pending: number
    confirmed: number
    shipping: number
    delivered: number
    cancelled: number
  }
  byPaymentStatus: {
    pending: number
    paid: number
    failed: number
    refunded: number
  }
  recentOrders: Order[]
}

// Response Types

export interface CreateVendorRequest {
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
}

// Response Types
export interface VendorResponse {
  success: boolean
  message: string
  data: Vendor
  errors: null | string[]
  statusCode: number
}

export interface VendorProfileResponse {
  success: boolean
  message: string
  data: VendorProfile
}

export interface ProductResponse {
  success: boolean
  message: string
  data: Product
}

export interface ProductListResponse {
  success: boolean
  message: string
  data: {
    items: Product[] // API returns 'items' not 'products'
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
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

export interface OrderResponse {
  success: boolean
  message: string
  data: Order
}

export interface OrderListResponse {
  success: boolean
  message: string
  data: Order[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface OrderStatisticsResponse {
  success: boolean
  message: string
  data: OrderStatistics
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
