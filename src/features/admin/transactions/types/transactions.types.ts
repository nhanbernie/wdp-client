export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface Transaction {
  id: string
  orderId: string
  orderCode: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: string
  paymentType: string
  createdAt: string
  paidAt?: string
}

export interface TransactionDetails extends Transaction {
  transactionId?: string
  updatedAt: string
  order?: {
    id: string
    orderNumber: string
    totalAmount: number
    status: string
    paymentStatus: string
    userId: string
    userEmail?: string
  }
}

export interface TransactionStats {
  totalTransactions: number
  totalAmount: number
  successfulTransactions: number
  successfulAmount: number
  pendingTransactions: number
  pendingAmount: number
  failedTransactions: number
  failedAmount: number
  averageTransactionValue: number
  successRate: number
  growth?: number
}

export interface TransactionByDate {
  date: string
  count: number
  amount: number
  successfulCount: number
  successfulAmount: number
  pendingCount: number
  pendingAmount: number
  failedCount: number
  failedAmount: number
  [key: string]: any 
}

export interface TransactionByType {
  paymentType: string
  count: number
  amount: number
  [key: string]: any 
}

export interface TransactionByStatus {
  status: PaymentStatus
  count: number
  amount: number
  [key: string]: any 
}

export interface TransactionAnalytics {
  stats: TransactionStats
  byDate: TransactionByDate[]
  byType: TransactionByType[]
  byStatus: TransactionByStatus[]
  recentTransactions?: Transaction[]
}

export interface TransactionFilters {
  status?: PaymentStatus
  paymentType?: string
  paymentMethod?: string
  orderId?: string
  minAmount?: number
  maxAmount?: number
  startDate?: string
  endDate?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'amount' | 'paidAt' | 'updatedAt'
  order?: 'ASC' | 'DESC'
}

export interface PaginatedTransactions {
  data: Transaction[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}


