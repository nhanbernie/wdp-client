'use client'

import React, { useState } from 'react'
import { QuoteRequest } from '@/services/vendor/vendor.types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  User,
  MapPin,
  FileText,
  MessageSquare,
  DollarSign,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { RespondQuoteDialog } from './RespondQuoteDialog'
import { useTheme } from '@/contexts/ThemeContext'

interface QuoteRequestCardProps {
  quote: QuoteRequest
  onRespond?: () => void
}

export const QuoteRequestCard: React.FC<QuoteRequestCardProps> = ({ quote, onRespond }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { colors } = useTheme()

  const statusConfig = {
    pending: {
      label: 'Chờ phản hồi',
      icon: Clock,
      bgColor: colors.warning + '20',
      textColor: colors.warning,
    },
    quoted: {
      label: 'Đã báo giá',
      icon: DollarSign,
      bgColor: colors.accent + '20',
      textColor: colors.accent,
    },
    accepted: {
      label: 'Đã chấp nhận',
      icon: CheckCircle,
      bgColor: colors.success + '20',
      textColor: colors.success,
    },
    rejected: {
      label: 'Đã từ chối',
      icon: XCircle,
      bgColor: colors.error + '20',
      textColor: colors.error,
    },
    expired: {
      label: 'Đã hết hạn',
      icon: AlertCircle,
      bgColor: colors.border + '20',
      textColor: colors.textSecondary,
    },
    cancelled: {
      label: 'Đã hủy',
      icon: XCircle,
      bgColor: colors.border + '20',
      textColor: colors.textSecondary,
    },
  }

  const status = statusConfig[quote.status]
  const StatusIcon = status.icon

  const handleRespondSuccess = () => {
    setDialogOpen(false)
    onRespond?.()
  }

  return (
    <>
      <Card
        className="hover:shadow-md transition-shadow"
        style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
      >
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <Badge
              style={{
                backgroundImage: 'none',
                backgroundColor: status.bgColor,
                color: status.textColor,
                borderColor: 'transparent',
              }}
            >
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </span>
          </div>

          <div className="space-y-4">
            {/* Product Info */}
            {quote.product && (
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: colors.cardBackgroundSecondary }}
              >
                <img
                  src={quote.product.thumbnail}
                  alt={quote.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    {quote.product.name}
                  </h3>
                  <div
                    className="flex items-center gap-4 mt-1 text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    <span>
                      Số lượng: {quote.quantity} {quote.product.stockUnit}
                    </span>
                    <span>Giá: {Number(quote.product.price).toLocaleString('vi-VN')} VND</span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Info */}
            {quote.user && (
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text }}>
                    {quote.user.name}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {quote.user.email}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {quote.user.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Delivery Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {quote.deliveryAddress}
              </p>
            </div>

            {/* Specifications */}
            {quote.specifications && (
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {quote.specifications}
                </p>
              </div>
            )}

            {/* Request Notes */}
            {quote.requestNotes && (
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-1" style={{ color: colors.textSecondary }} />
                <p className="text-sm italic" style={{ color: colors.textSecondary }}>
                  {quote.requestNotes}
                </p>
              </div>
            )}

            {/* Response Info */}
            {quote.responsePrice && (
              <div
                className="pt-4 space-y-2"
                style={{ borderTopWidth: '1px', borderColor: colors.border }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    Giá báo:
                  </span>
                  <span className="text-lg font-bold" style={{ color: colors.success }}>
                    {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                  </span>
                </div>
                {quote.responseNotes && (
                  <p
                    className="text-sm p-2 rounded"
                    style={{
                      color: colors.text,
                      backgroundColor: colors.accent + '20',
                    }}
                  >
                    {quote.responseNotes}
                  </p>
                )}
                {quote.validUntil && (
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Hạn báo giá:{' '}
                    {format(new Date(quote.validUntil), 'dd/MM/yyyy HH:mm', { locale: vi })}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            {quote.status === 'pending' && (
              <Button
                onClick={() => setDialogOpen(true)}
                className="w-full"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Báo giá
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <RespondQuoteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        quote={quote}
        onSuccess={handleRespondSuccess}
      />
    </>
  )
}
