'use client'

import React, { useState } from 'react'
import { useOrders, useOrderDetails, useOrderActions } from './hooks'
import { OrdersTable, OrderDetailsModal, UpdateStatusDialog, CancelOrderDialog } from './components'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, PackageSearch } from 'lucide-react'

export const OrdersManagement: React.FC = () => {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto shadow-lg"></div>
          <p className="mt-6 text-gray-600 font-medium text-lg">Đang tải đơn hàng...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-gray-50 via-white to-primary/5 min-h-screen p-6">
      {/* Header with modern gradient */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-2xl border-l-4 border-primary shadow-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <PackageSearch className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quản lý đơn hàng
                </h1>
                <p className="text-gray-600 mt-2 flex items-center gap-2">
                  Tổng số: <span className="font-bold text-primary">{meta.total}</span> đơn hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters with modern card design */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-primary/20">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            🔍 Lọc theo trạng thái:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="flex-1 md:flex-none md:w-64 p-3 border-2 border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          >
            <option value="">🌐 Tất cả trạng thái</option>
            <option value="pending">⏳ Chờ xử lý</option>
            <option value="processing">⚙️ Đang xử lý</option>
            <option value="shipping">🚚 Đang giao</option>
            <option value="delivered">✅ Đã giao</option>
            <option value="cancelled">❌ Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table with modern card */}
      <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
      </div>

      {/* Pagination with modern design */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg border-2 border-primary/20">
        <p className="text-base font-medium text-gray-700">
          📄 Trang <span className="text-primary font-bold">{meta.page}</span> /{' '}
          <span className="text-primary font-bold">{meta.totalPages}</span>
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border-primary/30 hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Trước
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="border-primary/30 hover:bg-primary hover:text-white transition-all shadow-sm disabled:opacity-50"
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
