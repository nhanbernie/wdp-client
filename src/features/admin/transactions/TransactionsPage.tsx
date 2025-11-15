'use client'

import React, { useState, useEffect } from 'react'
import { useTransactions, useTransactionAnalytics, useTransactionDetails } from './hooks'
import { TransactionCharts, TransactionStats, TransactionsTable } from './components'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CreditCard,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Filter,
  X,
  Loader2,
} from 'lucide-react'
import type { PaymentStatus } from './types'
import { format, subDays } from 'date-fns'
import { useTheme } from '@/contexts/ThemeContext'

// Helper functions to translate values to Vietnamese
const translatePaymentStatus = (status: PaymentStatus | string): string => {
  const statusMap: Record<string, string> = {
    SUCCESS: 'Thành công',
    PENDING: 'Đang chờ',
    FAILED: 'Thất bại',
    CANCELLED: 'Đã hủy',
  }
  return statusMap[status] || status
}

const translatePaymentMethod = (method: string): string => {
  const methodMap: Record<string, string> = {
    PAYOS: 'PayOS',
    cod: 'Thanh toán khi nhận hàng',
    bank_transfer: 'Chuyển khoản ngân hàng',
    credit_card: 'Thẻ tín dụng/Ghi nợ',
    e_wallet: 'Ví điện tử',
  }
  return methodMap[method] || method
}

const translatePaymentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    order_payment: 'Thanh toán đơn hàng',
    wallet_deposit: 'Nạp tiền vào ví',
  }
  return typeMap[type] || type
}

const translateOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Đang chờ',
    processing: 'Đang xử lý',
    shipping: 'Đang giao hàng',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
    failed: 'Thất bại',
    refunded: 'Đã hoàn tiền',
  }
  return statusMap[status] || status
}

export const TransactionsPage: React.FC = () => {
  const { colors } = useTheme()
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | ''>('')
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>('day')

  // Calculate date range
  const getDateRange = () => {
    const endDate = new Date()
    let startDate: Date

    switch (dateRange) {
      case '7d':
        startDate = subDays(endDate, 7)
        break
      case '30d':
        startDate = subDays(endDate, 30)
        break
      case '90d':
        startDate = subDays(endDate, 90)
        break
      default:
        return { startDate: undefined, endDate: undefined }
    }

    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    }
  }

  const { startDate, endDate } = getDateRange()

  // Fetch data
  const { transactions, meta, loading, error } = useTransactions({
    page,
    limit: 10,
    status: statusFilter || undefined,
    startDate,
    endDate,
  })

  const { analytics, loading: analyticsLoading } = useTransactionAnalytics(
    startDate,
    endDate,
    groupBy
  )

  const { transaction: transactionDetails } = useTransactionDetails(selectedTransactionId)

  // Apply theme styles to Tabs
  useEffect(() => {
    const styleId = 'transactions-tabs-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      [data-transactions-tabs-list] {
        background: ${colors.cardBackgroundSecondary} !important;
        border-color: ${colors.border} !important;
      }
      
      [data-transactions-tabs-list] button[data-state="active"] {
        background: ${colors.accent} !important;
        background-image: none !important;
        background-color: ${colors.accent} !important;
        color: white !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
      }
      
      [data-transactions-tabs-list] button[data-state="inactive"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
        color: ${colors.textSecondary} !important;
      }
      
      [data-transactions-tabs-list] button[data-state="inactive"]:hover {
        background: ${colors.hoverBackground} !important;
        background-image: none !important;
        background-color: ${colors.hoverBackground} !important;
      }
    `

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors])

  if (loading || analyticsLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: colors.accent }} />
          <p className="mt-6 font-medium text-lg" style={{ color: colors.textSecondary }}>
            Đang tải dữ liệu giao dịch...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div
          className="text-center p-8 rounded-2xl shadow-2xl"
          style={{
            background: colors.cardBackground,
            borderWidth: '2px',
            borderColor: colors.error,
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: colors.error }}
          >
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
            Có lỗi xảy ra
          </h3>
          <p style={{ color: colors.error }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 min-h-screen p-6" style={{ background: colors.backgroundGradient }}>
      {/* Header */}
      <div
        className="p-8 rounded-2xl shadow-lg"
        style={{
          background: colors.cardBackground,
          borderLeftWidth: '4px',
          borderLeftColor: colors.accent,
        }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
                Quản lý giao dịch
              </h1>
              <p className="mt-2" style={{ color: colors.textSecondary }}>
                <span className="font-semibold">Theo dõi và phân tích tất cả giao dịch</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          Thống kê tổng quan
        </h2>
        <TransactionStats stats={analytics?.stats} />
      </div>

      {/* Tabs for Charts and Table */}
      <Tabs defaultValue="charts" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList
            className="border-2"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
            }}
            data-transactions-tabs-list
          >
            <TabsTrigger value="charts">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Danh sách giao dịch</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 p-2 rounded-lg border-2"
              style={{
                background: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <Filter className="w-4 h-4" style={{ color: colors.textSecondary }} />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="border-none outline-none text-sm font-medium"
                style={{
                  background: colors.cardBackground,
                  color: colors.text,
                }}
              >
                <option value="7d">7 ngày</option>
                <option value="30d">30 ngày</option>
                <option value="90d">90 ngày</option>
                <option value="all">Tất cả</option>
              </select>
            </div>

            <div
              className="flex items-center gap-2 p-2 rounded-lg border-2"
              style={{
                background: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as any)}
                className="border-none outline-none text-sm font-medium"
                style={{
                  background: colors.cardBackground,
                  color: colors.text,
                }}
              >
                <option value="day">Theo ngày</option>
                <option value="week">Theo tuần</option>
                <option value="month">Theo tháng</option>
              </select>
            </div>
          </div>
        </div>

        <TabsContent value="charts" className="space-y-6">
          {analytics && <TransactionCharts analytics={analytics} />}
        </TabsContent>

        <TabsContent value="table" className="space-y-6">
          {/* Status Filter */}
          <Card
            className="p-6"
            style={{ background: colors.cardBackground, borderColor: colors.border }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                Lọc theo trạng thái:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as PaymentStatus | '')
                  setPage(1)
                }}
                className="flex-1 md:flex-none md:w-64 p-3 border-2 rounded-lg focus:ring-2 transition-all shadow-sm"
                style={{
                  borderColor: colors.border,
                  background: colors.background,
                  color: colors.text,
                }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="SUCCESS">Thành công</option>
                <option value="PENDING">Đang chờ</option>
                <option value="FAILED">Thất bại</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </div>
          </Card>

          {/* Transactions Table */}
          <TransactionsTable
            transactions={transactions}
            onViewDetails={setSelectedTransactionId}
          />

          {/* Pagination */}
          <div
            className="flex items-center justify-between p-6 rounded-xl shadow-lg border-2"
            style={{
              background: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <p className="text-base font-medium" style={{ color: colors.text }}>
              Trang{' '}
              <span className="font-bold" style={{ color: colors.accent }}>
                {meta.page}
              </span>{' '}
              / <span className="font-bold" style={{ color: colors.accent }}>{meta.totalPages}</span>
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="hover:text-white transition-all shadow-sm disabled:opacity-50"
                style={{ borderColor: colors.border }}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Trước
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="hover:text-white transition-all shadow-sm disabled:opacity-50"
                style={{ borderColor: colors.border }}
              >
                Sau
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Transaction Details Modal */}
      {selectedTransactionId && transactionDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Card
            className="p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ background: colors.cardBackground, borderColor: colors.border }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                Chi tiết giao dịch
              </h2>
              <button
                onClick={() => setSelectedTransactionId(null)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.hoverBackground
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Mã giao dịch
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {transactionDetails.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Mã đơn hàng
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {transactionDetails.orderCode || transactionDetails.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Số tiền
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {transactionDetails.amount.toLocaleString('vi-VN')} {transactionDetails.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Trạng thái
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {translatePaymentStatus(transactionDetails.status)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Phương thức thanh toán
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {translatePaymentMethod(transactionDetails.paymentMethod)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Loại thanh toán
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {translatePaymentType(transactionDetails.paymentType)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                    Ngày tạo
                  </p>
                  <p className="text-base font-semibold" style={{ color: colors.text }}>
                    {format(new Date(transactionDetails.createdAt), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                {transactionDetails.paidAt && (
                  <div>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                      Ngày thanh toán
                    </p>
                    <p className="text-base font-semibold" style={{ color: colors.text }}>
                      {format(new Date(transactionDetails.paidAt), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                )}
              </div>

              {transactionDetails.order && (
                <div className="mt-6 pt-6" style={{ borderTopColor: colors.border, borderTopWidth: '1px' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
                    Thông tin đơn hàng
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                        Mã đơn hàng
                      </p>
                      <p className="text-base font-semibold" style={{ color: colors.text }}>
                        {transactionDetails.order.orderNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                        Tổng tiền
                      </p>
                      <p className="text-base font-semibold" style={{ color: colors.text }}>
                        {transactionDetails.order.totalAmount.toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                        Trạng thái đơn hàng
                      </p>
                      <p className="text-base font-semibold" style={{ color: colors.text }}>
                        {translateOrderStatus(transactionDetails.order.status)}
                      </p>
                    </div>
                    {transactionDetails.order.userEmail && (
                      <div>
                        <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                          Email khách hàng
                        </p>
                        <p className="text-base font-semibold" style={{ color: colors.text }}>
                          {transactionDetails.order.userEmail}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default TransactionsPage

