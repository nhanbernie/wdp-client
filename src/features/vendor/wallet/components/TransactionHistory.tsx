'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVendorWallet } from '../hooks/useVendorWallet'
import { useTheme } from '@/contexts/ThemeContext'
import { ArrowDownCircle, ArrowUpCircle, Receipt, Loader2 } from 'lucide-react'
import { VendorTransaction } from '@/services/vendor/vendor-wallet.service'

const TransactionTypeIcon: React.FC<{ type: VendorTransaction['type'] }> = ({ type }) => {
  if (type === 'deposit' || type === 'order_payout') {
    return <ArrowDownCircle className="w-5 h-5 text-green-500" />
  }
  if (type === 'order_fee' || type === 'withdrawal') {
    return <ArrowUpCircle className="w-5 h-5 text-red-500" />
  }
  return <Receipt className="w-5 h-5" />
}

const TransactionTypeLabel: Record<VendorTransaction['type'], string> = {
  deposit: 'Nạp tiền',
  withdrawal: 'Rút tiền',
  order_payout: 'Nhận từ đơn hàng',
  order_fee: 'Phí sàn',
  refund: 'Hoàn tiền',
  adjustment: 'Điều chỉnh',
}

const TransactionStatusBadge: React.FC<{ status: VendorTransaction['status'] }> = ({
  status,
}) => {
  const { colors } = useTheme()
  const statusConfig = {
    completed: { label: 'Hoàn thành', color: colors.success },
    pending: { label: 'Đang xử lý', color: colors.textSecondary },
    failed: { label: 'Thất bại', color: colors.error },
    cancelled: { label: 'Đã hủy', color: colors.textSecondary },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: config.color + '20',
        color: config.color,
      }}
    >
      {config.label}
    </span>
  )
}

export const TransactionHistory: React.FC = () => {
  const { transactions, isLoadingTransactions, transactionsMeta } = useVendorWallet()
  const { colors } = useTheme()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (isLoadingTransactions) {
    return (
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: colors.textSecondary }} />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
      <CardHeader>
        <CardTitle style={{ color: colors.text }}>Lịch sử giao dịch</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center py-8" style={{ color: colors.textSecondary }}>
            Chưa có giao dịch nào
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <TransactionTypeIcon type={transaction.type} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium" style={{ color: colors.text }}>
                          {TransactionTypeLabel[transaction.type]}
                        </p>
                        <TransactionStatusBadge status={transaction.status} />
                      </div>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {transaction.description || 'Không có mô tả'}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {formatPrice(transaction.amount)}
                    </p>
                    {transaction.platformFee && (
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        Phí: {formatPrice(transaction.platformFee)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

