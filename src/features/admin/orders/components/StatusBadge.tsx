import React from 'react'
import type { OrderStatus, PaymentStatus } from '../../types'

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus | string
  type?: 'order' | 'payment'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'order' }) => {
  const getStatusStyle = () => {
    if (type === 'order') {
      switch (status) {
        case 'pending':
          return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md'
        case 'processing':
          return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
        case 'shipping':
          return 'bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md'
        case 'delivered':
          return 'bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md'
        case 'cancelled':
          return 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md'
        default:
          return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
      }
    } else {
      switch (status) {
        case 'pending':
          return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md'
        case 'paid':
          return 'bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-md'
        case 'failed':
          return 'bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md'
        case 'refunded':
          return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
        default:
          return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
      }
    }
  }

  const getStatusLabel = () => {
    if (type === 'order') {
      const labels: Record<string, string> = {
        pending: 'Chờ xử lý',
        processing: 'Đang xử lý',
        shipping: 'Đang giao',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy',
      }
      return labels[status] || status
    } else {
      const labels: Record<string, string> = {
        pending: 'Chờ thanh toán',
        paid: 'Đã thanh toán',
        failed: 'Thất bại',
        refunded: 'Đã hoàn tiền',
      }
      return labels[status] || status
    }
  }

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusStyle()} hover:scale-105 transition-transform duration-200 inline-block`}
    >
      {getStatusLabel()}
    </span>
  )
}
