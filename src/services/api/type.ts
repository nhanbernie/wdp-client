// Base API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Error Response
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  statusCode?: number;
}

// User Types
export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "supplier";
  avatar?: string;
  phone?: string;
  address?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: "user" | "supplier";
}

export interface RegisterResponse {
  user: UserDto;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// OTP Types
export interface CreateOtpRequest {
  email: string;
  type: "email_verification" | "password_reset" | "login";
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  type: "email_verification" | "password_reset" | "login";
}

export interface OtpResponse {
  success: boolean;
  message: string;
  expiresAt?: string;
}

// Material Types
export interface MaterialDto {
  id: string;
  name: string;
  description: string;
  category: MaterialCategory;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  specifications: Record<string, any>;
  supplier: SupplierDto;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  children?: MaterialCategory[];
}

export interface SupplierDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  logo?: string;
  rating: number;
  isVerified: boolean;
  isActive: boolean;
}

// Order Types
export interface OrderDto {
  id: string;
  orderNumber: string;
  user: UserDto;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  material: MaterialDto;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

// Quote Types
export interface QuoteRequest {
  materials: QuoteItem[];
  deliveryAddress: Address;
  notes?: string;
  urgency: "low" | "medium" | "high";
}

export interface QuoteItem {
  materialId: string;
  quantity: number;
  specifications?: Record<string, any>;
}

export interface QuoteDto {
  id: string;
  quoteNumber: string;
  user: UserDto;
  items: QuoteResponseItem[];
  totalAmount: number;
  status: QuoteStatus;
  validUntil: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteResponseItem {
  material: MaterialDto;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  availability: string;
  deliveryTime: string;
}

export type QuoteStatus =
  | "pending"
  | "quoted"
  | "accepted"
  | "declined"
  | "expired";

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Search and Filter
export interface MaterialSearchParams extends PaginationParams {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: string;
  inStock?: boolean;
}

export interface OrderSearchParams extends PaginationParams {
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
}
