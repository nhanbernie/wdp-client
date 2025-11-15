'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Transaction, PaymentStatus } from '../types'
import { format } from 'date-fns'
import { useTheme } from '@/contexts/ThemeContext'

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
  return <Badge className={config.className}>{config.label}</Badge>
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onViewDetails,
}) => {
  const { colors } = useTheme()

  if (transactions.length === 0) {
    return (
      <Card
        className="p-8 text-center"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <p style={{ color: colors.textSecondary }}>Không có giao dịch nào</p>
      </Card>
    )
  }

  return (
    <Card
      className="overflow-hidden border-2"
      style={{ background: colors.cardBackground, borderColor: colors.border }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            style={{
              background: colors.cardBackgroundSecondary,
              borderBottomWidth: '2px',
              borderBottomColor: colors.border,
            }}
          >
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Mã giao dịch
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Mã đơn hàng
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Số tiền
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Phương thức
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Trạng thái
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                Ngày tạo
              </th>
              {onViewDetails && (
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.textSecondary }}
                >
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody style={{ background: colors.cardBackground }}>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="transition-colors"
                style={{
                  borderBottomWidth: '1px',
                  borderBottomColor: colors.border,
                  background: colors.cardBackground,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.hoverBackground
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.cardBackground
                }}
              >
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  style={{ color: colors.text }}
                >
                  {transaction.id.slice(0, 8)}...
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {transaction.orderCode || transaction.orderId.slice(0, 8)}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-semibold"
                  style={{ color: colors.text }}
                >
                  {transaction.amount.toLocaleString('vi-VN')} {transaction.currency}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {translatePaymentMethod(transaction.paymentMethod)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                {onViewDetails && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewDetails(transaction.id)}
                      className="font-medium hover:underline"
                      style={{ color: colors.accent }}
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
