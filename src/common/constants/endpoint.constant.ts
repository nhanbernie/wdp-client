// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    PROFILE: '/auth/profile',
    EXCHANGE_CODE: '/auth/exchange/code',
  },

  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    UPLOAD_AVATAR: '/user/avatar',
    DELETE_ACCOUNT: '/user/delete',
    CHANGE_PASSWORD: '/user/change-password',
  },

  // OTP endpoints
  OTP: {
    CREATE: '/otp/create',
    VERIFY: '/otp/verify',
    RESEND: '/otp/resend',
  },

  // Construction Materials endpoints
  MATERIALS: {
    LIST: '/materials',
    CATEGORIES: '/materials/categories',
    SEARCH: '/materials/search',
    DETAILS: '/materials/:id',
    CREATE: '/materials',
    UPDATE: '/materials/:id',
    DELETE: '/materials/:id',
  },

  // Cart endpoints
  CART: {
    ADD: '/cart/add',
    GET: '/cart',
    COUNT: '/cart/count',
    UPDATE_ITEM: '/cart/:id',
    REMOVE_ITEM: '/cart/:id',
    CLEAR: '/cart',
  },

  // Orders endpoints
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    FROM_CART: '/orders/from-cart',
    DETAILS: '/orders/:id',
    BY_NUMBER: '/orders/number/:orderNumber',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    HISTORY: '/orders/history',
    STATISTICS: '/orders/statistics',
  },

  // Quotes endpoints
  QUOTES: {
    REQUEST: '/quotes/request',
    LIST: '/quotes',
    DETAILS: '/quotes/:id',
    ACCEPT: '/quotes/:id/accept',
    DECLINE: '/quotes/:id/decline',
  },

  // Suppliers endpoints
  SUPPLIERS: {
    LIST: '/suppliers',
    DETAILS: '/suppliers/:id',
    MATERIALS: '/suppliers/:id/materials',
  },

  // Admin endpoints
  ADMIN: {
    // Dashboard
    DASHBOARD_STATS: '/admin/dashboard/stats',

    // Reports
    REVENUE_REPORT: '/admin/reports/revenue',

    // Analytics
    USER_ANALYTICS: '/admin/analytics/users',
    PRODUCT_ANALYTICS: '/admin/analytics/products',

    // Orders Management
    ORDERS: '/admin/orders',
    ORDER_DETAILS: (id: string) => `/admin/orders/${id}/details`,
    ORDER_STATUS: (id: string) => `/admin/orders/${id}/status`,
    ORDER_CANCEL: (id: string) => `/admin/orders/${id}/cancel`,

    // Users Management
    USERS: '/admin/users',
    USER_ACTIVITY: (id: string) => `/admin/users/${id}/activity`,
    USER_BAN: (id: string) => `/admin/users/${id}/ban`,
    USER_ROLE: (id: string) => `/admin/users/${id}/role`,

    // Products Management
    PRODUCTS: '/admin/products',
    PRODUCT_STOCK: (id: string) => `/admin/products/${id}/stock`,

    // Legacy endpoints
    MATERIALS: '/admin/materials',
    SUPPLIERS: '/admin/suppliers',
    ANALYTICS: '/admin/analytics',
  },

  // Products endpoints
  PRODUCTS: {
    LIST: '/products',
    DETAILS: (id: string) => `/products/${id}`,
    DETAILS_PATTERN: '/products/',
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },

  // Categories endpoints
  CATEGORIES: {
    LIST: '/categories',
  },

  // Reviews endpoints
  REVIEWS: {
    CREATE: '/reviews',
    LIST_BY_PRODUCT: (productId: string) => `/reviews/product/${productId}`,
    PRODUCT_STATS: (productId: string) => `/reviews/product/${productId}/stats`,
    DETAILS: (id: string) => `/reviews/${id}`,
    UPDATE: (id: string) => `/reviews/${id}`,
    VENDOR_REPLY: (id: string) => `/reviews/${id}/reply`,
    VENDOR_OVERVIEW: (vendorId: string) => `/reviews/vendor/${vendorId}/overview`,
    HISTORY: (id: string) => `/reviews/${id}/history`,
  },

  // Payments endpoints
  PAYMENTS: {
    CREATE: '/payments',
  },

  // Addresses endpoints
  ADDRESSES: {
    LIST: '/addresses',
    CREATE: '/addresses',
    DETAILS: (id: string) => `/addresses/${id}`,
  },

  // Vendor endpoints
  VENDOR: {
    // Profile
    MY_PROFILE: '/vendors/my-profile',
    APPLICATION_STATUS: '/vendors/application-status', // GET vendor application status

    // Products (vendor's own products)
    PRODUCTS: {
      LIST: '/products/my-products', // GET my products
      CREATE: '/products', // POST
      UPDATE: (id: string) => `/products/${id}`, // PATCH
      DELETE: (id: string) => `/products/${id}`, // DELETE
      DETAILS: (id: string) => `/products/${id}`, // GET
    },

    // Quote Requests
    QUOTE_REQUESTS: '/quote-requests/vendor-requests',
    QUOTE_REQUEST_DETAIL: (id: string) => `/quote-requests/${id}`,
    QUOTE_RESPOND: (id: string) => `/quote-requests/${id}/respond`,

    // Orders
    ORDERS: '/vendors/orders', // GET vendor's orders (orders containing vendor's products)
    ORDER_DETAIL: (id: string) => `/vendors/orders/${id}`, // GET specific order details

    // Statistics
    STATISTICS: '/vendors/statistics', // GET vendor statistics (orders, revenue, products)
  },
}

// Public endpoints that don't require authentication
export const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
  API_ENDPOINTS.AUTH.VERIFY_EMAIL,
  API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
  API_ENDPOINTS.OTP.CREATE,
  API_ENDPOINTS.OTP.VERIFY,
  API_ENDPOINTS.OTP.RESEND,
  API_ENDPOINTS.MATERIALS.LIST,
  API_ENDPOINTS.MATERIALS.CATEGORIES,
  API_ENDPOINTS.MATERIALS.SEARCH,
  API_ENDPOINTS.MATERIALS.DETAILS,
  API_ENDPOINTS.SUPPLIERS.LIST,
  API_ENDPOINTS.SUPPLIERS.DETAILS,
  API_ENDPOINTS.SUPPLIERS.MATERIALS,
  API_ENDPOINTS.PRODUCTS.LIST,
  API_ENDPOINTS.PRODUCTS.DETAILS_PATTERN,
  API_ENDPOINTS.CATEGORIES.LIST,
]

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
}

// Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
}
