'use client'

import React, { useState } from 'react'
import { useOrders, useOrderDetails, useOrderActions } from './hooks'
import { OrdersTable, OrderDetailsModal, UpdateStatusDialog, CancelOrderDialog } from './components'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, PackageSearch, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const OrdersManagement: React.FC = () => {
  const { colors } = useTheme()
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const { orders, meta, loading, refetch } = useOrders({
    page,
    limit: 10,
    status: statusFilter || undefined,
  })

  const { orderDetails, refetch: refetchDetails } = useOrderDetails(selectedOrderId || '')

  const { updateStatus, cancelOrder, loading: actionLoading } = useOrderActions()

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId)
  }

  const handleUpdateStatus = async (status: string) => {
    if (selectedOrderId) {
      const success = await updateStatus(selectedOrderId, status)
      if (success) {
        refetch()
        refetchDetails()
      }
    }
  }

  const handleCancelOrder = async (reason: string, refund: boolean) => {
    if (selectedOrderId) {
      const success = await cancelOrder(selectedOrderId, reason, refund)
      if (success) {
        refetch()
        refetchDetails()
        setSelectedOrderId(null)
      }
    }
  }

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: colors.backgroundGradient }}
      >
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: colors.accent }} />
          <p className="mt-6 font-medium text-lg" style={{ color: colors.textSecondary }}>
            Đang tải đơn hàng...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 min-h-screen p-6" style={{ background: colors.backgroundGradient }}>
      {/* Header with modern gradient */}
      <div
        className="p-8 rounded-2xl border-l-4 shadow-lg"
        style={{ background: colors.cardBackground, borderColor: colors.accent }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl shadow-lg" style={{ background: colors.accent }}>
                <PackageSearch className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
                  Quản lý đơn hàng
                </h1>
                <p className="mt-2 flex items-center gap-2" style={{ color: colors.textSecondary }}>
                  Tổng số:{' '}
                  <span className="font-bold" style={{ color: colors.accent }}>
                    {meta.total}
                  </span>{' '}
                  đơn hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters with modern card design */}
      <div
        className="p-6 rounded-xl shadow-lg border-2"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
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
              setStatusFilter(e.target.value)
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
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table with modern card */}
      <div
        className="rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
      </div>

      {/* Pagination with modern design */}
      <div
        className="flex items-center justify-between p-6 rounded-xl shadow-lg border-2"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <p className="text-base font-medium" style={{ color: colors.text }}>
          Trang{' '}
          <span className="font-bold" style={{ color: colors.accent }}>
            {meta.page}
          </span>{' '}
          /{' '}
          <span className="font-bold" style={{ color: colors.accent }}>
            {meta.totalPages}
          </span>
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="transition-all shadow-sm disabled:opacity-50"
            style={{ borderColor: colors.border }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Trước
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="transition-all shadow-sm disabled:opacity-50"
            style={{ borderColor: colors.border }}
          >
            Sau
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        orderDetails={orderDetails}
        isOpen={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        onUpdateStatus={handleUpdateStatus}
        onCancel={() => setShowCancelDialog(true)}
      />

      {/* Update Status Dialog */}
      <UpdateStatusDialog
        isOpen={showUpdateDialog}
        onClose={() => setShowUpdateDialog(false)}
        onConfirm={handleUpdateStatus}
        currentStatus={orderDetails?.order.status || 'pending'}
      />

      {/* Cancel Order Dialog */}
      <CancelOrderDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelOrder}
      />
    </div>
  )
}

export default OrdersManagement
