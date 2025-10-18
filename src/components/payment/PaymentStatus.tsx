'use client'

import React from 'react'

interface PaymentStatusProps {
  paymentId: string
  status?: string
  className?: string
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  paymentId, 
  status = 'PENDING', 
  className = '' 
}) => {
  const getStatusConfig = (status: string) => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return {
          label: 'Thành công',
          className: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'PENDING':
        return {
          label: 'Đang xử lý',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        }
      case 'FAILED':
        return {
          label: 'Thất bại',
          className: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'CANCELLED':
        return {
          label: 'Đã hủy',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
      default:
        return {
          label: 'Không xác định',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      {config.label}
    </span>
  )
}
