'use client'

import React, { useState } from 'react'
import { Order } from '@/services/vendor/vendor.types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useUpdateVendorOrderStatusMutation } from '@/services/vendor/vendor.service'
import { useToast } from '@/hooks/useToast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface OrderCardProps {
  order: Order
  onStatusUpdated?: () => void
}
const statusConfig: Record<string, { label: string; icon: any; className: string }> = {
  pending: { label: 'Chờ admin xác nhận', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  admin_confirmed: { label: 'Đã xác nhận', icon: CheckCircle, className: 'bg-blue-100 text-blue-800' },
  shipping: { label: 'Bắt đầu giao hàng', icon: Truck, className: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Đã giao hàng', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  completed: { label: 'Hoàn thành', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  processing: { label: 'Đang xử lý', icon: Package, className: 'bg-blue-100 text-blue-800' },
  cancelled: { label: 'Đã hủy', icon: XCircle, className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Đã hoàn tiền', icon: XCircle, className: 'bg-orange-100 text-orange-800' },
}

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: 'Chưa thanh toán', className: 'bg-gray-100 text-gray-800' },
  paid: { label: 'Đã thanh toán', className: 'bg-green-100 text-green-800' },
  failed: { label: 'Thanh toán thất bại', className: 'bg-red-100 text-red-800' },
  refunded: { label: 'Đã hoàn tiền', className: 'bg-orange-100 text-orange-800' },
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusUpdated }) => {
  const router = useRouter()
  const { colors } = useTheme()
  const toast = useToast()
  const [updateStatus, { isLoading: isUpdating }] = useUpdateVendorOrderStatusMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<'shipping' | 'delivered' | null>(null)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [notes, setNotes] = useState('')

  const status = statusConfig[order.status] || statusConfig.pending
  const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.pending
  const StatusIcon = status.icon

  const canUpdateToShippingStarted = order.status === 'admin_confirmed'
  const canUpdateToDelivered = order.status === 'shipping'

  const handleUpdateStatus = async () => {
    if (!newStatus) return

    try {
      await updateStatus({
        orderId: order.id,
        body: {
          status: newStatus,
          trackingNumber: trackingNumber || undefined,
          notes: notes || undefined,
        },
      }).unwrap()

      toast.success('Cập nhật trạng thái đơn hàng thành công')
      setIsDialogOpen(false)
      setTrackingNumber('')
      setNotes('')
      setNewStatus(null)
      onStatusUpdated?.()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Cập nhật trạng thái thất bại')
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={status.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <Badge className={paymentStatus.className}>{paymentStatus.label}</Badge>
          </div>
        </div>

        <div className="space-y-3">
          {/* Total */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-600">Tổng tiền:</span>
            <span className="text-lg font-bold text-blue-600">
              {parseInt(order.totalAmount || order.total || '0').toLocaleString('vi-VN')} VND
            </span>
          </div>

          {/* Customer */}
          {order.user && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.user.lastName} {order.user.firstName}
                </p>
                <p className="text-sm text-gray-500">{order.user.phoneNumber}</p>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1" />
            <p className="text-sm text-gray-600">{order.shippingAddress}</p>
          </div>

          {/* Items Count */}
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{order.items.length} sản phẩm</span>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Quick Action Buttons */}
            {canUpdateToShippingStarted && (
              <Button
                onClick={() => {
                  setNewStatus('shipping')
                  setIsDialogOpen(true)
                }}
                className="w-full"
                style={{ backgroundColor: '#8b5cf6', color: 'white' }}
              >
                <Truck className="w-4 h-4 mr-2" />
                Bắt đầu giao hàng
              </Button>
            )}

            {canUpdateToDelivered && (
              <Button
                onClick={() => {
                  setNewStatus('delivered')
                  setIsDialogOpen(true)
                }}
                className="w-full"
                style={{ backgroundColor: '#10b981', color: 'white' }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Đã giao hàng thành công
              </Button>
            )}

            {/* View Details Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/vendor/orders/${order.id}`)}
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Xem chi tiết
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Update Status Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: colors.text }}>
              {newStatus === 'shipping' ? 'Bắt đầu giao hàng' : 'Đánh dấu đã giao hàng'}
            </DialogTitle>
            <DialogDescription style={{ color: colors.textSecondary }}>
              {newStatus === 'shipping'
                ? 'Cập nhật trạng thái đơn hàng sang "Bắt đầu giao hàng"'
                : 'Cập nhật trạng thái đơn hàng sang "Đã giao hàng"'}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleUpdateStatus()
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="trackingNumber" style={{ color: colors.text }}>
                Mã vận đơn (tùy chọn)
              </Label>
              <Input
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Nhập mã vận đơn"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                className="focus:ring-2 focus:ring-offset-0"
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent
                  e.target.style.boxShadow = `0 0 0 2px ${colors.accent}20`
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" style={{ color: colors.text }}>
                Ghi chú (tùy chọn)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú thêm..."
                rows={3}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
                className="focus:ring-2 focus:ring-offset-0 resize-none"
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent
                  e.target.style.boxShadow = `0 0 0 2px ${colors.accent}20`
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setTrackingNumber('')
                  setNotes('')
                  setNewStatus(null)
                }}
                className="flex-1"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverBackground
                  e.currentTarget.style.borderColor = colors.textSecondary
                  e.currentTarget.style.color = colors.text
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                  e.currentTarget.style.borderColor = colors.border
                  e.currentTarget.style.color = colors.textSecondary
                }}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="flex-1"
                style={{
                  backgroundColor: colors.accent,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  if (!isUpdating) {
                    e.currentTarget.style.backgroundColor = colors.accentSecondary
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUpdating) {
                    e.currentTarget.style.backgroundColor = colors.accent
                  }
                }}
              >
                {isUpdating ? 'Đang xử lý...' : 'Xác nhận'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
