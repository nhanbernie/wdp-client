// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
  },

  // User endpoints
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    UPLOAD_AVATAR: "/user/avatar",
    DELETE_ACCOUNT: "/user/delete",
    CHANGE_PASSWORD: "/user/change-password",
  },

  // OTP endpoints
  OTP: {
    CREATE: "/otp/create",
    VERIFY: "/otp/verify",
    RESEND: "/otp/resend",
  },

  // Construction Materials endpoints
  MATERIALS: {
    LIST: "/materials",
    CATEGORIES: "/materials/categories",
    SEARCH: "/materials/search",
    DETAILS: "/materials/:id",
    CREATE: "/materials",
    UPDATE: "/materials/:id",
    DELETE: "/materials/:id",
  },

  // Orders endpoints
  ORDERS: {
    LIST: "/orders",
    CREATE: "/orders",
    DETAILS: "/orders/:id",
    UPDATE: "/orders/:id",
    CANCEL: "/orders/:id/cancel",
    HISTORY: "/orders/history",
  },

  // Quotes endpoints
  QUOTES: {
    REQUEST: "/quotes/request",
    LIST: "/quotes",
    DETAILS: "/quotes/:id",
    ACCEPT: "/quotes/:id/accept",
    DECLINE: "/quotes/:id/decline",
  },

  // Suppliers endpoints
  SUPPLIERS: {
    LIST: "/suppliers",
    DETAILS: "/suppliers/:id",
    MATERIALS: "/suppliers/:id/materials",
  },

  // Admin endpoints
  ADMIN: {
    USERS: "/admin/users",
    MATERIALS: "/admin/materials",
    ORDERS: "/admin/orders",
    SUPPLIERS: "/admin/suppliers",
    ANALYTICS: "/admin/analytics",
  },
};

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
];

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
};

// Error Messages
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
};
