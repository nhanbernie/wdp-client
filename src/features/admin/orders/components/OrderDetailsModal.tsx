import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import type { OrderDetails as OrderDetailsType } from '@/features/admin/types/orders.types'

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
  if (!orderDetails) return null

  const { order, user, items } = orderDetails

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="border-b border-primary/10 pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">Chi tiết đơn hàng</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {/* Order Info with modern card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-xl border-2 border-primary/20 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900">
              <span className="text-xl"></span> Thông tin đơn hàng
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-1">Mã đơn:</span>
                <span className="font-bold text-primary">{order.orderNumber || order.id}</span>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-1">Trạng thái:</span>
                <StatusBadge status={order.status} type="order" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-1">Thanh toán:</span>
                <StatusBadge status={order.paymentStatus} type="payment" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-1">Tổng tiền:</span>
                <span className="font-bold text-primary text-lg">
                  {parseFloat(order.totalAmount).toLocaleString('vi-VN')} VND
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info with modern card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900">
              <span className="text-xl"></span> Thông tin khách hàng
            </h3>
            <div className="text-sm space-y-3">
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="font-semibold text-gray-900">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-600 font-medium">Họ tên:</span>
                <span className="font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">SĐT:</span>
                  <span className="font-semibold text-gray-900">{user.phoneNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Info with modern card */}
          {order.shippingAddress && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900">
                <span className="text-xl"></span> Địa chỉ giao hàng
              </h3>
              <div className="text-sm space-y-3 bg-white p-4 rounded-lg shadow-sm">
                {order.shippingName && (
                  <p className="font-semibold text-gray-900">{order.shippingName}</p>
                )}
                {order.shippingPhone && <p className="text-gray-700">SĐT: {order.shippingPhone}</p>}
                <p className="text-gray-700 leading-relaxed">
                  {order.shippingAddress}
                  {order.shippingWard && `, ${order.shippingWard}`}
                  {order.shippingDistrict && `, ${order.shippingDistrict}`}
                  {order.shippingCity && `, ${order.shippingCity}`}
                </p>
              </div>
            </div>
          )}

          {/* Items with modern design */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900">
              <span className="text-xl"></span> Sản phẩm
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{item.productName}</p>
                    {item.variantName && (
                      <p className="text-sm text-gray-600 mt-1 bg-gray-100 inline-block px-2 py-1 rounded">
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      Số lượng: <span className="text-primary">{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      {parseFloat(item.totalPrice || item.subtotal || '0').toLocaleString('vi-VN')}{' '}
                      VND
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {parseFloat(item.unitPrice || item.price).toLocaleString('vi-VN')} VND/sp
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions with modern buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
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
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all"
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
