'use client'

import React from 'react'
import { QuoteRequest } from '@/services/quote-requests/types'
import { useAcceptQuoteMutation, useRejectQuoteMutation } from '@/services/quote-requests'
import { useToast } from '@/hooks/useToast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'

interface Props {
  quote: QuoteRequest
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const statusConfig = {
  pending: { label: 'Chờ phản hồi', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Đã báo giá', icon: DollarSign, className: 'bg-blue-100 text-blue-800' },
  accepted: { label: 'Đã chấp nhận', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Đã từ chối', icon: XCircle, className: 'bg-red-100 text-red-800' },
  expired: { label: 'Đã hết hạn', icon: AlertCircle, className: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-gray-100 text-gray-800' },
}

export const QuoteDetailDialog: React.FC<Props> = ({ quote, open, onClose, onSuccess }) => {
  const toast = useToast()
  const [acceptQuote, { isLoading: isAccepting }] = useAcceptQuoteMutation()
  const [rejectQuote, { isLoading: isRejecting }] = useRejectQuoteMutation()

  const status = statusConfig[quote.status]
  const StatusIcon = status.icon

  const handleAccept = async () => {
    try {
      await acceptQuote(quote.id).unwrap()
      toast.success('Thành công', 'Đã chấp nhận báo giá')
      onSuccess?.()
      onClose()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể chấp nhận báo giá')
    }
  }

  const handleReject = async () => {
    try {
      await rejectQuote(quote.id).unwrap()
      toast.success('Thành công', 'Đã từ chối báo giá')
      onSuccess?.()
      onClose()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Không thể từ chối báo giá')
    }
  }

  const isExpired = quote.validUntil && new Date(quote.validUntil) < new Date()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle>Chi tiết yêu cầu báo giá</DialogTitle>
              <DialogDescription>
                Tạo lúc {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
              </DialogDescription>
            </div>
            <Badge className={status.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Sản phẩm</h4>
            </div>
            <p className="text-gray-900 font-medium">{quote.product?.name}</p>
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
              <span>
                Số lượng: {quote.quantity} {quote.product?.stockUnit || 'sản phẩm'}
              </span>
              <span>•</span>
              <span>
                Vendor: {quote.product?.vendor?.businessName || quote.vendor?.businessName}
              </span>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-3">
            {quote.specifications && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Yêu cầu kỹ thuật</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{quote.specifications}</p>
              </div>
            )}

            {quote.deliveryAddress && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Địa chỉ giao hàng</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{quote.deliveryAddress}</p>
              </div>
            )}

            {quote.requestNotes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Ghi chú của bạn</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{quote.requestNotes}</p>
              </div>
            )}
          </div>

          {/* Vendor Response */}
          {quote.status === 'quoted' && quote.responsePrice && (
            <div className="p-4 bg-blue-50 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-900">Phản hồi từ vendor</h4>

              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600">Giá báo:</span>
                  <p className="text-xl font-bold text-blue-600">
                    {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>

              {quote.validUntil && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <span className="text-sm text-gray-600">Hạn báo giá:</span>
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(quote.validUntil), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </p>
                    {isExpired && <p className="text-xs text-red-600 mt-1">Báo giá đã hết hạn</p>}
                  </div>
                </div>
              )}

              {quote.responseNotes && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Ghi chú:</span>
                  <p className="text-sm text-gray-600 mt-1">{quote.responseNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {quote.status === 'quoted' && !isExpired && (
              <>
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={isRejecting || isAccepting}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </Button>
                <Button onClick={handleAccept} disabled={isAccepting || isRejecting}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isAccepting ? 'Đang xử lý...' : 'Chấp nhận'}
                </Button>
              </>
            )}
            {(quote.status !== 'quoted' || isExpired) && <Button onClick={onClose}>Đóng</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
