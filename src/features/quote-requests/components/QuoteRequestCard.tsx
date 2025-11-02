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

interface Props {
  quote: QuoteRequest
  onUpdate?: () => void
}

const statusConfig = {
  pending: { label: 'Chờ phản hồi', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Đã báo giá', icon: DollarSign, className: 'bg-blue-100 text-blue-800' },
  accepted: { label: 'Đã chấp nhận', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Đã từ chối', icon: XCircle, className: 'bg-red-100 text-red-800' },
  expired: { label: 'Đã hết hạn', icon: AlertCircle, className: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-gray-100 text-gray-800' },
}

export const QuoteRequestCard: React.FC<Props> = ({ quote, onUpdate }) => {
  const [detailOpen, setDetailOpen] = useState(false)
  const [cancelQuote, { isLoading: isCancelling }] = useCancelQuoteRequestMutation()
  const toast = useToast()

  const status = statusConfig[quote.status]
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
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">{quote.product?.name || 'Yêu cầu báo giá'}</CardTitle>
            <Badge className={status.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
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
            <p className="text-gray-700">
              Số lượng: <span className="font-semibold">{quote.quantity}</span>{' '}
              {quote.product?.stockUnit || 'sản phẩm'}
            </p>

            {quote.vendor && <p className="text-gray-600">Vendor: {quote.vendor.businessName}</p>}

            {quote.status === 'quoted' && quote.responsePrice && (
              <div className="mt-3 p-3 bg-blue-50 rounded">
                <p className="text-xs text-gray-600 mb-1">Giá báo:</p>
                <p className="text-lg font-bold text-blue-600">
                  {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                </p>
              </div>
            )}

            <p className="text-xs text-gray-400 pt-2">
              {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setDetailOpen(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Xem chi tiết
            </Button>
            {quote.status === 'pending' && (
              <Button variant="destructive" onClick={handleCancel} disabled={isCancelling}>
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
