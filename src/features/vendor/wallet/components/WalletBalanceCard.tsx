'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { useVendorWallet } from '../hooks/useVendorWallet'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export const WalletBalanceCard: React.FC = () => {
  const { balance, isLoadingBalance } = useVendorWallet()
  const { colors } = useTheme()

  if (isLoadingBalance) {
    return (
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardContent className="p-6">
          <div className="animate-pulse">Đang tải...</div>
        </CardContent>
      </Card>
    )
  }

  if (!balance) {
    return null
  }

  const availableBalance = balance.availableBalance
  const isLowBalance = availableBalance < 10000 // Cảnh báo nếu dưới 100k

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 3,
    }).format(price)
  }

  return (
    <div className="space-y-4">
      {isLowBalance && (
        <Card
          style={{
            backgroundColor: colors.error + '15',
            borderColor: colors.error,
            borderWidth: 2,
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" style={{ color: colors.error }} />
              <div className="flex-1">
                <p className="font-semibold" style={{ color: colors.error }}>
                  Cần nạp ví
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Số dư khả dụng của bạn đang thấp. Vui lòng nạp tiền để tiếp tục nhận đơn hàng.
                </p>
              </div>
              <Link href="/vendor/wallet/deposit">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: colors.error,
                    color: 'white',
                  }}
                >
                  Nạp ngay
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
            <Wallet className="w-5 h-5" style={{ color: colors.textSecondary }} />
            Số dư ví
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Số dư hiện tại
            </p>
            <p className="text-3xl font-bold" style={{ color: colors.text }}>
              {formatPrice(balance.balance)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Số dư khả dụng
              </p>
              <p
                className="text-lg font-semibold"
                style={{
                  color: isLowBalance ? colors.error : colors.success,
                }}
              >
                {formatPrice(availableBalance)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p style={{ color: colors.textSecondary }}>Đã nạp</p>
                <p className="font-semibold" style={{ color: colors.text }}>
                  {formatPrice(balance.totalDeposited)}
                </p>
              </div>
              <div>
                <p style={{ color: colors.textSecondary }}>Đã rút</p>
                <p className="font-semibold" style={{ color: colors.text }}>
                  {formatPrice(balance.totalWithdrawn)}
                </p>
              </div>
              <div>
                <p style={{ color: colors.textSecondary }}>Phí đã trả</p>
                <p className="font-semibold" style={{ color: colors.text }}>
                  {formatPrice(balance.totalFeesPaid)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Link href="/vendor/wallet/deposit">
              <Button
                className="w-full mb-1"
                style={{
                  backgroundColor: colors.accent,
                  color: 'white',
                }}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Nạp tiền vào ví
              </Button>
            </Link>
            <Link href="/vendor/wallet/withdraw">
              <Button
                variant="outline"
                className="w-full"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverBackground
                  e.currentTarget.style.borderColor = colors.textSecondary
                  e.currentTarget.style.color = colors.text
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.color = colors.text
                }}
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Rút tiền từ ví
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

