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
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  quote: QuoteRequest
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const getStatusConfig = (colors: any) => ({
  pending: { label: 'Chờ phản hồi', icon: Clock, color: colors.warning },
  quoted: { label: 'Đã báo giá', icon: DollarSign, color: colors.accent },
  accepted: { label: 'Đã chấp nhận', icon: CheckCircle, color: colors.success },
  rejected: { label: 'Đã từ chối', icon: XCircle, color: colors.error },
  expired: { label: 'Đã hết hạn', icon: AlertCircle, color: colors.textSecondary },
  cancelled: { label: 'Đã hủy', icon: XCircle, color: colors.textSecondary },
})

export const QuoteDetailDialog: React.FC<Props> = ({ quote, open, onClose, onSuccess }) => {
  const toast = useToast()
  const { colors } = useTheme()
  const [acceptQuote, { isLoading: isAccepting }] = useAcceptQuoteMutation()
  const [rejectQuote, { isLoading: isRejecting }] = useRejectQuoteMutation()

  const statusConfig = getStatusConfig(colors)
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
      <DialogContent className="max-w-2xl" style={{ backgroundColor: colors.cardBackground }}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle style={{ color: colors.text }}>Chi tiết yêu cầu báo giá</DialogTitle>
              <DialogDescription style={{ color: colors.textSecondary }}>
                Tạo lúc {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
              </DialogDescription>
            </div>
            <div
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg"
              style={{ backgroundColor: `${status.color}20`, color: status.color }}
            >
              <StatusIcon className="w-3 h-3" />
              <span className="font-medium">{status.label}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5" style={{ color: colors.accent }} />
              <h4 className="font-semibold" style={{ color: colors.text }}>
                Sản phẩm
              </h4>
            </div>
            <p className="font-medium" style={{ color: colors.text }}>
              {quote.product?.name}
            </p>
            <div
              className="mt-2 flex items-center gap-4 text-sm"
              style={{ color: colors.textSecondary }}
            >
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
                  <FileText className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    Yêu cầu kỹ thuật
                  </span>
                </div>
                <p className="text-sm ml-6" style={{ color: colors.textSecondary }}>
                  {quote.specifications}
                </p>
              </div>
            )}

            {quote.deliveryAddress && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    Địa chỉ giao hàng
                  </span>
                </div>
                <p className="text-sm ml-6" style={{ color: colors.textSecondary }}>
                  {quote.deliveryAddress}
                </p>
              </div>
            )}

            {quote.requestNotes && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    Ghi chú của bạn
                  </span>
                </div>
                <p className="text-sm ml-6" style={{ color: colors.textSecondary }}>
                  {quote.requestNotes}
                </p>
              </div>
            )}
          </div>

          {/* Vendor Response */}
          {quote.status === 'quoted' && quote.responsePrice && (
            <div
              className="p-4 rounded-lg space-y-3"
              style={{ backgroundColor: `${colors.accent}10` }}
            >
              <h4 className="font-semibold" style={{ color: colors.text }}>
                Phản hồi từ vendor
              </h4>

              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" style={{ color: colors.accent }} />
                <div>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>
                    Giá báo:
                  </span>
                  <p className="text-xl font-bold" style={{ color: colors.accent }}>
                    {parseInt(quote.responsePrice).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>

              {quote.validUntil && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <div>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      Hạn báo giá:
                    </span>
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      {format(new Date(quote.validUntil), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </p>
                    {isExpired && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        Báo giá đã hết hạn
                      </p>
                    )}
                  </div>
                </div>
              )}

              {quote.responseNotes && (
                <div>
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    Ghi chú:
                  </span>
                  <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                    {quote.responseNotes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div
            className="flex justify-end gap-3 pt-4 border-t"
            style={{ borderColor: colors.border }}
          >
            {quote.status === 'quoted' && !isExpired && (
              <>
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={isRejecting || isAccepting}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={isAccepting || isRejecting}
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.background,
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isAccepting ? 'Đang xử lý...' : 'Chấp nhận'}
                </Button>
              </>
            )}
            {(quote.status !== 'quoted' || isExpired) && (
              <Button
                onClick={onClose}
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                Đóng
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
