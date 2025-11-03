'use client'

import React, { useState } from 'react'
import { QuoteRequest } from '@/services/quote-requests/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QuoteDetailDialog } from './QuoteDetailDialog'
import { useCancelQuoteRequestMutation } from '@/services/quote-requests'
import { useToast } from '@/hooks/useToast'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Eye, XCircle, Clock, CheckCircle, DollarSign, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  quote: QuoteRequest
  onUpdate?: () => void
}

const getStatusConfig = (colors: any) => ({
  pending: {
    label: 'Chờ phản hồi',
    icon: Clock,
    backgroundColor: colors.accent,
    color: 'white',
  },
  quoted: {
    label: 'Đã báo giá',
    icon: DollarSign,
    backgroundColor: colors.accent,
    color: 'white',
  },
  accepted: {
    label: 'Đã chấp nhận',
    icon: CheckCircle,
    backgroundColor: colors.success,
    color: 'white',
  },
  rejected: {
    label: 'Đã từ chối',
    icon: XCircle,
    backgroundColor: colors.error,
    color: 'white',
  },
  expired: {
    label: 'Đã hết hạn',
    icon: AlertCircle,
    backgroundColor: colors.textSecondary,
    color: 'white',
  },
  cancelled: {
    label: 'Đã hủy',
    icon: XCircle,
    backgroundColor: colors.textSecondary,
    color: 'white',
  },
})

export const QuoteRequestCard: React.FC<Props> = ({ quote, onUpdate }) => {
  const [detailOpen, setDetailOpen] = useState(false)
  const [cancelQuote, { isLoading: isCancelling }] = useCancelQuoteRequestMutation()
  const toast = useToast()
  const { colors } = useTheme()

  const statusConfig = getStatusConfig(colors)
  const status = statusConfig[quote.status as keyof typeof statusConfig]
  const StatusIcon = status.icon

  const handleCancel = async () => {
    try {
      await cancelQuote(quote.id).unwrap()
      toast.success('Thành công', 'Đã hủy yêu cầu báo giá')
      onUpdate?.()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể hủy yêu cầu')
    }
  }

  return (
    <>
      <Card
        className="hover:shadow-lg transition-shadow"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <CardHeader style={{ backgroundColor: colors.cardBackground }}>
          <div className="flex items-start justify-between">
            <CardTitle
              className="text-base"
              style={{ color: colors.text }}
            >
              {quote.product?.name || 'Yêu cầu báo giá'}
            </CardTitle>
            <Badge
              className="inline-flex items-center gap-1"
              style={{
                backgroundColor: status.backgroundColor,
                color: status.color,
                backgroundImage: 'none',
                borderColor: 'transparent',
              }}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent style={{ backgroundColor: colors.cardBackground }}>
          {quote.product?.thumbnail && (
            <div className="relative w-full h-32 mb-3 rounded overflow-hidden">
              <Image
                src={quote.product.thumbnail}
                alt={quote.product.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-2 text-sm">
            <p style={{ color: colors.text }}>
              Số lượng: <span className="font-semibold">{quote.quantity}</span>{' '}
              {quote.product?.stockUnit || 'sản phẩm'}
            </p>

            {quote.vendor && (
              <p style={{ color: colors.textSecondary }}>
                Vendor: {quote.vendor.businessName}
              </p>
            )}

            {quote.status === 'quoted' && quote.responsePrice && (
              <div
                className="mt-3 p-3 rounded"
                style={{
                  backgroundColor: `${colors.accent}15`,
                  borderColor: colors.accent,
                }}
              >
                <p
                  className="text-xs mb-1"
                  style={{ color: colors.textSecondary }}
                >
                  Giá báo:
                </p>
                <p
                  className="text-lg font-bold"
                  style={{ color: colors.accent }}
                >
                  {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                </p>
              </div>
            )}

            <p
              className="text-xs pt-2"
              style={{ color: colors.textSecondary }}
            >
              {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDetailOpen(true)}
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverBackground
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Xem chi tiết
            </Button>
            {quote.status === 'pending' && (
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
                style={{
                  backgroundColor: colors.error,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  if (!isCancelling) {
                    e.currentTarget.style.backgroundColor = `${colors.error}dd`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCancelling) {
                    e.currentTarget.style.backgroundColor = colors.error
                  }
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <QuoteDetailDialog
        quote={quote}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onSuccess={onUpdate}
      />
    </>
  )
}
