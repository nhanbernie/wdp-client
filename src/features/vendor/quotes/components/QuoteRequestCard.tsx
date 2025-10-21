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

interface QuoteRequestCardProps {
  quote: QuoteRequest
  onRespond?: () => void
}

const statusConfig = {
  pending: { label: 'Chờ phản hồi', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Đã báo giá', icon: DollarSign, className: 'bg-blue-100 text-blue-800' },
  accepted: { label: 'Đã chấp nhận', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Đã từ chối', icon: XCircle, className: 'bg-red-100 text-red-800' },
  expired: { label: 'Đã hết hạn', icon: AlertCircle, className: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-gray-100 text-gray-800' },
}

export const QuoteRequestCard: React.FC<QuoteRequestCardProps> = ({ quote, onRespond }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const status = statusConfig[quote.status]
  const StatusIcon = status.icon

  const handleRespondSuccess = () => {
    setDialogOpen(false)
    onRespond?.()
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <Badge className={status.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <span className="text-sm text-gray-500">
              {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </span>
          </div>

          <div className="space-y-4">
            {/* Product Info */}
            {quote.product && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={quote.product.thumbnail}
                  alt={quote.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{quote.product.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
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
                <User className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{quote.user.name}</p>
                  <p className="text-sm text-gray-500">{quote.user.email}</p>
                  <p className="text-sm text-gray-500">{quote.user.phone}</p>
                </div>
              </div>
            )}

            {/* Delivery Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <p className="text-sm text-gray-600">{quote.deliveryAddress}</p>
            </div>

            {/* Specifications */}
            {quote.specifications && (
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-400 mt-1" />
                <p className="text-sm text-gray-600">{quote.specifications}</p>
              </div>
            )}

            {/* Request Notes */}
            {quote.requestNotes && (
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400 mt-1" />
                <p className="text-sm text-gray-600 italic">{quote.requestNotes}</p>
              </div>
            )}

            {/* Response Info */}
            {quote.responsePrice && (
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Giá báo:</span>
                  <span className="text-lg font-bold text-green-600">
                    {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                  </span>
                </div>
                {quote.responseNotes && (
                  <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    {quote.responseNotes}
                  </p>
                )}
                {quote.validUntil && (
                  <p className="text-sm text-gray-500">
                    Hạn báo giá:{' '}
                    {format(new Date(quote.validUntil), 'dd/MM/yyyy HH:mm', { locale: vi })}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            {quote.status === 'pending' && (
              <Button onClick={() => setDialogOpen(true)} className="w-full">
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
