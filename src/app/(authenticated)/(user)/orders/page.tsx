'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RotateCcw,
  ShoppingBag,
  ClipboardList,
} from 'lucide-react'
import { useGetOrdersQuery, useCancelOrderMutation } from '@/redux/slices/ordersApiSlice'
import type { Order } from '@/services/orders/types'

import { OrderStatus } from '@/services/orders/types'

// Cấu hình trạng thái chi tiết hơn để hỗ trợ Progress Tracker
const statusConfig = {
  [OrderStatus.PENDING]: {
    label: 'Chờ xử lý',
    className: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-500',
    icon: Clock,
    step: 1,
  },
  [OrderStatus.PROCESSING]: {
    label: 'Đang xử lý',
    className: 'bg-blue-500 hover:bg-blue-600 border-blue-500',
    icon: Clock,
    step: 1,
  },
  [OrderStatus.SHIPPING]: {
    label: 'Đang giao',
    className: 'bg-indigo-500 hover:bg-indigo-600 border-indigo-500',
    icon: Truck,
    step: 2,
  },
  [OrderStatus.DELIVERED]: {
    label: 'Đã giao',
    className: 'bg-green-500 hover:bg-green-600 border-green-500',
    icon: CheckCircle,
    step: 3,
  },
  [OrderStatus.CANCELLED]: {
    label: 'Đã hủy',
    className: 'bg-red-500 hover:bg-red-600 border-red-500',
    icon: XCircle,
    step: 0,
  },
  [OrderStatus.REFUNDED]: {
    label: 'Đã hoàn tiền',
    className: 'bg-purple-500 hover:bg-purple-600 border-purple-500',
    icon: RotateCcw,
    step: 0,
  },
}

const progressSteps = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPING,
  OrderStatus.DELIVERED,
]

// Giữ nguyên toàn bộ logic xử lý
export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    refetch: refetchOrders,
  } = useGetOrdersQuery({
    page: 1,
    limit: 100,
    status: statusFilter !== 'all' ? (statusFilter as any) : undefined,
  })

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation()

  const orders = ordersData?.data || []

  const handleCancelOrder = async (orderId: string, orderNumber: string) => {
    if (!confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${orderNumber}?`)) {
      return
    }

    try {
      await cancelOrder(orderId).unwrap()
      alert('Hủy đơn hàng thành công')
      // RTK Query sẽ tự động refetch do invalidatesTags
      // nhưng ta vẫn gọi thêm để chắc chắn
      await refetchOrders()
    } catch (err: any) {
      alert(err?.data?.message || 'Không thể hủy đơn hàng')
    }
  }

  // Sử dụng useMemo để tối ưu hóa việc lọc, chỉ tính toán lại khi dependencies thay đổi
  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()),
        )

      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' &&
          [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPING].includes(
            order.status,
          )) ||
        (activeTab === 'completed' &&
          [OrderStatus.DELIVERED, OrderStatus.CANCELLED, OrderStatus.REFUNDED].includes(
            order.status,
          ))

      return matchesSearch && matchesTab
    })
  }, [orders, searchQuery, activeTab])

  const tabCounts = useMemo(() => {
    const active = orders.filter((o: Order) =>
      [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPING].includes(o.status),
    ).length
    const completed = orders.filter((o: Order) =>
      [OrderStatus.DELIVERED, OrderStatus.CANCELLED, OrderStatus.REFUNDED].includes(o.status),
    ).length
    return { all: orders.length, active, completed }
  }, [orders])

  if (isLoadingOrders) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted/40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Đơn hàng của tôi
          </h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi, quản lý và xem lại tất cả các đơn hàng của bạn ở một nơi.
          </p>
        </header>

        <Card className="mb-8 p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Tìm theo mã đơn hàng hoặc tên sản phẩm..."
                className="pl-10 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56 h-10">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value={OrderStatus.PENDING}>Chờ xử lý</SelectItem>
                <SelectItem value={OrderStatus.PROCESSING}>Đang xử lý</SelectItem>
                <SelectItem value={OrderStatus.SHIPPING}>Đang giao</SelectItem>
                <SelectItem value={OrderStatus.DELIVERED}>Đã giao</SelectItem>
                <SelectItem value={OrderStatus.CANCELLED}>Đã hủy</SelectItem>
                <SelectItem value={OrderStatus.REFUNDED}>Đã hoàn tiền</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-fit">
            <TabsTrigger value="all">Tất cả ({tabCounts.all})</TabsTrigger>
            <TabsTrigger value="active">Đang xử lý ({tabCounts.active})</TabsTrigger>
            <TabsTrigger value="completed">Hoàn tất ({tabCounts.completed})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center rounded-lg border-2 border-dashed border-gray-300 py-16">
                <ClipboardList className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy đơn hàng</h3>
                <p className="text-muted-foreground mb-6">
                  Bạn chưa có đơn hàng nào phù hợp với bộ lọc hiện tại.
                </p>
                <Button asChild>
                  <Link href="/categories">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Bắt đầu mua sắm
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order: Order) => {
                  const currentStatusInfo =
                    statusConfig[order.status] || statusConfig[OrderStatus.PENDING]
                  const StatusIcon = currentStatusInfo.icon || Clock
                  const currentStep = currentStatusInfo.step || 0

                  console.log('Order status:', order.status, 'Step:', currentStep)

                  return (
                    <Card
                      key={order.id}
                      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 border-b">
                        <div className="flex items-center gap-4">
                          <div className="grid gap-0.5">
                            <p className="font-semibold text-gray-900">
                              Mã đơn hàng:{' '}
                              <span className="text-primary">#{order.orderNumber}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Đặt ngày:{' '}
                              {new Date(order.createdAt || '').toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={`${currentStatusInfo.className} text-white border`}>
                            <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                            {currentStatusInfo.label}
                          </Badge>
                          <span className="font-bold text-lg text-gray-800">
                            {order.totalAmount.toLocaleString('vi-VN')} ₫
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6">
                        {/* Progress Tracker */}
                        {[
                          OrderStatus.PENDING,
                          OrderStatus.PROCESSING,
                          OrderStatus.SHIPPING,
                          OrderStatus.DELIVERED,
                        ].includes(order.status) && (
                          <div className="mb-6">
                            <div className="flex justify-between items-start">
                              {progressSteps.map((statusKey, index) => {
                                const stepInfo = statusConfig[statusKey]
                                const isActive = stepInfo.step <= currentStep
                                return (
                                  <div
                                    key={statusKey}
                                    className="flex-1 flex flex-col items-center"
                                  >
                                    <div className="flex items-center w-full">
                                      {index > 0 && (
                                        <div
                                          className={`h-0.5 flex-1 ${
                                            stepInfo.step < currentStep
                                              ? 'bg-primary'
                                              : 'bg-gray-300'
                                          }`}
                                        ></div>
                                      )}
                                      <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                                          isActive
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}
                                      >
                                        <stepInfo.icon className="h-5 w-5" />
                                      </div>
                                      {index < progressSteps.length - 1 && (
                                        <div
                                          className={`h-0.5 flex-1 ${
                                            stepInfo.step < currentStep
                                              ? 'bg-primary'
                                              : 'bg-gray-300'
                                          }`}
                                        ></div>
                                      )}
                                    </div>
                                    <p
                                      className={`text-xs mt-3 text-center whitespace-nowrap ${
                                        isActive
                                          ? 'font-semibold text-primary'
                                          : 'text-muted-foreground'
                                      }`}
                                    >
                                      {stepInfo.label}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Items */}
                        <div className="space-y-4">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden border bg-gray-100">
                                {item.thumbnail ? (
                                  <Image
                                    src={item.thumbnail}
                                    alt={item.productName}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                  Số lượng: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-gray-900">
                                {item.totalPrice.toLocaleString('vi-VN')} ₫
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-wrap gap-2 justify-end p-4 bg-muted/50 border-t">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </Link>
                        </Button>
                        {order.status === OrderStatus.DELIVERED && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" /> Mua lại
                          </Button>
                        )}
                        {(order.status === OrderStatus.PENDING ||
                          order.status === OrderStatus.PROCESSING) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleCancelOrder(order.id, order.orderNumber)}
                            disabled={isCancelling}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {isCancelling ? 'Đang hủy...' : 'Hủy đơn'}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
