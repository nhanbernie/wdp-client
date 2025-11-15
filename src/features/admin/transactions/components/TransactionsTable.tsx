'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Transaction, PaymentStatus } from '../types'
import { format } from 'date-fns'

// Helper function to translate payment method to Vietnamese
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

interface TransactionsTableProps {
  transactions: Transaction[]
  onViewDetails?: (transactionId: string) => void
}

const getStatusBadge = (status: PaymentStatus) => {
  const statusConfig = {
    SUCCESS: { label: 'Thành công', className: 'bg-green-100 text-green-800' },
    PENDING: { label: 'Đang chờ', className: 'bg-yellow-100 text-yellow-800' },
    FAILED: { label: 'Thất bại', className: 'bg-red-100 text-red-800' },
    CANCELLED: { label: 'Đã hủy', className: 'bg-gray-100 text-gray-800' },
  }

  const config = statusConfig[status] || statusConfig.PENDING
  return (
    <Badge className={config.className}>{config.label}</Badge>
  )
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onViewDetails,
}) => {
  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">Không có giao dịch nào</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã giao dịch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phương thức
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              {onViewDetails && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaction.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.orderCode || transaction.orderId.slice(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {transaction.amount.toLocaleString('vi-VN')} {transaction.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {translatePaymentMethod(transaction.paymentMethod)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                {onViewDetails && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewDetails(transaction.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}


