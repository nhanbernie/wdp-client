'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Download,
  MessageCircle,
  RotateCcw,
  Star,
  Loader2,
} from 'lucide-react'
import { useGetOrderByIdQuery, useCancelOrderMutation } from '@/redux/slices/ordersApiSlice'
import { OrderStatus } from '@/services/orders/types'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showReviewModal, setShowReviewModal] = useState(false)

  // Fetch order by ID from API
  const { data: orderResponse, isLoading, error } = useGetOrderByIdQuery(params.id as string)
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation()

  // Get order data from response
  const orderData = orderResponse?.data

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!orderData) return
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return

    try {
      await cancelOrder(orderData.id).unwrap()
      alert('Hủy đơn hàng thành công')
      router.push('/orders')
    } catch (err: any) {
      alert(err?.data?.message || 'Không thể hủy đơn hàng')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-500" />
            <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đơn hàng</h1>
          <p className="text-gray-600 mb-4">Đơn hàng với ID {params.id} không tồn tại.</p>
          <Link href="/orders">
            <Button>Quay lại danh sách đơn hàng</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusConfig = (status: string) => {
    const statusMap = {
      pending: {
        label: 'Đang chờ xử lý',
        badgeClass: 'bg-gray-500 text-white',
        message: 'Đơn hàng đang chờ xác nhận',
        icon: Clock,
      },
      processing: {
        label: 'Đang xử lý',
        badgeClass: 'bg-yellow-500 text-white',
        message: 'Đơn hàng đang được xử lý',
        icon: Clock,
      },
      shipping: {
        label: 'Đang giao hàng',
        badgeClass: 'bg-blue-500 text-white',
        message: `Dự kiến giao hàng ngày ${
          orderData.estimatedDelivery
            ? new Date(orderData.estimatedDelivery).toLocaleDateString('vi-VN')
            : 'chưa xác định'
        }`,
        icon: Package,
      },
      delivered: {
        label: 'Đã giao hàng',
        badgeClass: 'bg-success text-white',
        message: `Giao thành công ngày ${
          orderData.actualDelivery
            ? new Date(orderData.actualDelivery).toLocaleDateString('vi-VN')
            : ''
        }`,
        icon: CheckCircle,
      },
      cancelled: {
        label: 'Đã hủy',
        badgeClass: 'bg-red-500 text-white',
        message: 'Đơn hàng đã được hủy',
        icon: Clock,
      },
      refunded: {
        label: 'Đã hoàn tiền',
        badgeClass: 'bg-purple-500 text-white',
        message: 'Đơn hàng đã được hoàn tiền',
        icon: RotateCcw,
      },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const statusConfig = getStatusConfig(orderData.status)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/orders">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">
                Đơn hàng #{orderData.orderNumber}
              </h1>
            </div>
            <p className="text-gray-600">
              Đặt ngày {new Date(orderData.createdAt).toLocaleDateString('vi-VN')} • Tổng tiền:{' '}
              <span className="font-semibold text-orange-500">
                {Number(orderData.totalAmount).toLocaleString('vi-VN')} ₫
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {(orderData.status === OrderStatus.PENDING ||
              orderData.status === OrderStatus.PROCESSING) && (
              <Button variant="destructive" onClick={handleCancelOrder} disabled={isCancelling}>
                {isCancelling ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                Hủy đơn hàng
              </Button>
            )}
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Tải hóa đơn
            </Button>
            {orderData.status === OrderStatus.DELIVERED && (
              <Button className="bg-primary-accent hover:bg-primary-accent/90 text-white">
                <Star className="h-4 w-4 mr-2" />
                Đánh giá
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Trạng thái đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className={statusConfig.badgeClass}>
                    <statusConfig.icon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                  <span className="text-sm text-gray-600">{statusConfig.message}</span>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  {orderData.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã vận đơn:</span>
                      <span className="font-mono font-medium text-gray-900">
                        {orderData.trackingNumber}
                      </span>
                    </div>
                  )}
                  {orderData.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dự kiến giao:</span>
                      <span className="text-gray-900">
                        {new Date(orderData.estimatedDelivery).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {orderData.actualDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đã giao:</span>
                      <span className="text-gray-900">
                        {new Date(orderData.actualDelivery).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                  {orderData.notes && (
                    <div className="pt-2">
                      <p className="text-gray-600 mb-1">Ghi chú:</p>
                      <p className="text-sm text-gray-900">{orderData.notes}</p>
                    </div>
                  )}
                  {orderData.customerNotes && (
                    <div className="pt-2">
                      <p className="text-gray-600 mb-1">Ghi chú của bạn:</p>
                      <p className="text-sm text-gray-900">{orderData.customerNotes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm đã đặt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.productName}</h4>
                        {item.variantName && (
                          <p className="text-sm text-gray-600">{item.variantName}</p>
                        )}
                        {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {Number(item.totalPrice).toLocaleString('vi-VN')} ₫
                        </p>
                        <p className="text-sm text-gray-600">
                          {Number(item.unitPrice).toLocaleString('vi-VN')} ₫/cái
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Tạm tính:</span>
                    <span>{Number(orderData.subtotal).toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Phí vận chuyển:</span>
                    <span>{Number(orderData.shippingFee).toLocaleString('vi-VN')} ₫</span>
                  </div>
                  {Number(orderData.discountAmount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{Number(orderData.discountAmount).toLocaleString('vi-VN')} ₫</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-500">
                      {Number(orderData.totalAmount).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Thông tin giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-gray-900">Người nhận</h4>
                  <p className="text-sm text-gray-700">{orderData.shippingName}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-gray-900">Địa chỉ</h4>
                  <p className="text-sm text-gray-600">
                    {orderData.shippingAddress}
                    {orderData.shippingWard && `, ${orderData.shippingWard}`}
                    {orderData.shippingDistrict && `, ${orderData.shippingDistrict}`}
                    {orderData.shippingCity && `, ${orderData.shippingCity}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-gray-900">
                      <Phone className="h-4 w-4 mr-1" />
                      Điện thoại
                    </h4>
                    <p className="text-sm text-gray-600">{orderData.shippingPhone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900">Phương thức thanh toán</h4>
                    <p className="text-sm text-gray-600 uppercase">{orderData.paymentMethod}</p>
                  </div>
                </div>

                {orderData.trackingNumber && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900">Mã vận đơn</h4>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {orderData.trackingNumber}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Phương thức:</span>
                    <span className="font-medium uppercase text-gray-900">
                      {orderData.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Trạng thái:</span>
                    <Badge
                      className={
                        orderData.paymentStatus?.toLowerCase() === 'paid'
                          ? 'bg-green-500 text-white'
                          : orderData.paymentStatus?.toLowerCase() === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }
                    >
                      {orderData.paymentStatus?.toLowerCase() === 'paid'
                        ? 'Đã thanh toán'
                        : orderData.paymentStatus?.toLowerCase() === 'pending'
                        ? 'Đang chờ thanh toán'
                        : 'Chưa thanh toán'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Mua lại
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Liên hệ hỗ trợ
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Tải hóa đơn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
