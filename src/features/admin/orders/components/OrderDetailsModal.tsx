import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import type { OrderDetails as OrderDetailsType } from '@/features/admin/types/orders.types'
import { useTheme } from '@/contexts/ThemeContext'
import { Package, User, MapPin, ShoppingCart } from 'lucide-react'

interface OrderDetailsModalProps {
  orderDetails: OrderDetailsType | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (status: string) => void
  onCancel: () => void
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  orderDetails,
  isOpen,
  onClose,
  onUpdateStatus,
  onCancel,
}) => {
  const { colors } = useTheme()

  if (!orderDetails) return null

  const { order, user, items } = orderDetails

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[85vh] overflow-y-auto"
        style={{ background: colors.background }}
      >
        <DialogHeader className="border-b pb-4" style={{ borderColor: colors.border }}>
          <DialogTitle className="flex items-center gap-3 text-2xl" style={{ color: colors.text }}>
            Chi tiết đơn hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {/* Order Info with modern card */}
          <div
            className="p-5 rounded-xl border-2 shadow-sm"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h3
              className="font-bold mb-4 flex items-center gap-2 text-lg"
              style={{ color: colors.text }}
            >
              <Package className="w-5 h-5" style={{ color: colors.accent }} /> Thông tin đơn hàng
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg shadow-sm" style={{ background: colors.background }}>
                <span className="block mb-1" style={{ color: colors.textSecondary }}>
                  Mã đơn:
                </span>
                <span className="font-bold" style={{ color: colors.text }}>
                  {order.orderNumber || order.id}
                </span>
              </div>
              <div className="p-3 rounded-lg shadow-sm" style={{ background: colors.background }}>
                <span className="block mb-1" style={{ color: colors.textSecondary }}>
                  Trạng thái:
                </span>
                <StatusBadge status={order.status} type="order" />
              </div>
              <div className="p-3 rounded-lg shadow-sm" style={{ background: colors.background }}>
                <span className="block mb-1" style={{ color: colors.textSecondary }}>
                  Thanh toán:
                </span>
                <StatusBadge status={order.paymentStatus} type="payment" />
              </div>
              <div className="p-3 rounded-lg shadow-sm" style={{ background: colors.background }}>
                <span className="block mb-1" style={{ color: colors.textSecondary }}>
                  Tổng tiền:
                </span>
                <span className="font-bold text-lg" style={{ color: colors.text }}>
                  {parseFloat(order.totalAmount).toLocaleString('vi-VN')} VND
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info with modern card */}
          <div
            className="p-5 rounded-xl border-2 shadow-sm"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h3
              className="font-bold mb-4 flex items-center gap-2 text-lg"
              style={{ color: colors.text }}
            >
              <User className="w-5 h-5" style={{ color: colors.accent }} /> Thông tin khách hàng
            </h3>
            <div className="text-sm space-y-3">
              <div
                className="flex items-center gap-2 p-3 rounded-lg shadow-sm"
                style={{ background: colors.background }}
              >
                <span className="font-medium" style={{ color: colors.textSecondary }}>
                  Email:
                </span>
                <span className="font-semibold" style={{ color: colors.text }}>
                  {user.email}
                </span>
              </div>
              <div
                className="flex items-center gap-2 p-3 rounded-lg shadow-sm"
                style={{ background: colors.background }}
              >
                <span className="font-medium" style={{ color: colors.textSecondary }}>
                  Họ tên:
                </span>
                <span className="font-semibold" style={{ color: colors.text }}>
                  {user.firstName} {user.lastName}
                </span>
              </div>
              {user.phoneNumber && (
                <div
                  className="flex items-center gap-2 p-3 rounded-lg shadow-sm"
                  style={{ background: colors.background }}
                >
                  <span className="font-medium" style={{ color: colors.textSecondary }}>
                    SĐT:
                  </span>
                  <span className="font-semibold" style={{ color: colors.text }}>
                    {user.phoneNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Info with modern card */}
          {order.shippingAddress && (
            <div
              className="p-5 rounded-xl border-2 shadow-sm"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              <h3
                className="font-bold mb-4 flex items-center gap-2 text-lg"
                style={{ color: colors.text }}
              >
                <MapPin className="w-5 h-5" style={{ color: colors.accent }} /> Địa chỉ giao hàng
              </h3>
              <div
                className="text-sm space-y-3 p-4 rounded-lg shadow-sm"
                style={{ background: colors.background }}
              >
                {order.shippingName && (
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {order.shippingName}
                  </p>
                )}
                {order.shippingPhone && (
                  <p style={{ color: colors.textSecondary }}>SĐT: {order.shippingPhone}</p>
                )}
                <p className="leading-relaxed" style={{ color: colors.textSecondary }}>
                  {order.shippingAddress}
                  {order.shippingWard && `, ${order.shippingWard}`}
                  {order.shippingDistrict && `, ${order.shippingDistrict}`}
                  {order.shippingCity && `, ${order.shippingCity}`}
                </p>
              </div>
            </div>
          )}

          {/* Items with modern design */}
          <div
            className="p-5 rounded-xl border-2 shadow-sm"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h3
              className="font-bold mb-4 flex items-center gap-2 text-lg"
              style={{ color: colors.text }}
            >
              <ShoppingCart className="w-5 h-5" style={{ color: colors.accent }} /> Sản phẩm
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 rounded-lg shadow-sm border transition-all hover:shadow-md"
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    border: `1px solid ${colors.border}30`,
                    boxShadow: `0 4px 12px ${colors.border}20`,
                  }}
                >
                  <div className="flex-1">
                    <p className="font-bold" style={{ color: colors.text }}>
                      {item.productName}
                    </p>
                    {item.variantName && (
                      <p
                        className="text-sm mt-1 inline-block px-2 py-1 rounded"
                        style={{
                          color: colors.textSecondary,
                          background: colors.cardBackgroundSecondary,
                        }}
                      >
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-sm mt-2 font-medium" style={{ color: colors.textSecondary }}>
                      Số lượng: <span style={{ color: colors.accent }}>{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg" style={{ color: colors.text }}>
                      {parseFloat(item.totalPrice || item.subtotal || '0').toLocaleString('vi-VN')}{' '}
                      VND
                    </p>
                    <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                      {parseFloat(item.unitPrice || item.price).toLocaleString('vi-VN')} VND/sp
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions with modern buttons */}
          <div
            className="flex gap-3 justify-end pt-4 border-t"
            style={{ borderColor: colors.border }}
          >
            {order.status === 'pending' && (
              <>
                <Button
                  onClick={() => onUpdateStatus('admin_confirm')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Xác nhận đơn
                </Button>
                <Button
                  onClick={onCancel}
                  className="shadow-lg hover:shadow-xl transition-all"
                  style={{ background: colors.error, color: 'white' }}
                >
                  Hủy đơn
                </Button>
              </>
            )}
            {order.status === 'delivered' && (
              <Button
                onClick={() => onUpdateStatus('complete')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Hoàn thành đơn hàng
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
