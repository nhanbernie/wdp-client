'use client'

import { useState } from 'react'
import Link from 'next/link'
import AICMainLayout from '@/components/layouts/second-layout/AICMainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  MessageCircle,
} from 'lucide-react'

// Mock orders data
const orders = [
  {
    id: 'AIC123456789',
    date: '2024-01-15',
    status: 'delivered',
    total: 4830000,
    items: [
      { name: 'Xi măng Portland PCB40 Holcim', quantity: 2, price: 165000 },
      { name: 'Máy khoan búa Bosch GBH 2-28 DV', quantity: 1, price: 4500000 },
    ],
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
    estimatedDelivery: '2024-01-18',
    actualDelivery: '2024-01-17',
    trackingNumber: 'VN123456789',
  },
  {
    id: 'AIC987654321',
    date: '2024-01-20',
    status: 'shipping',
    total: 275000,
    items: [
      { name: 'Vít gỗ đầu chìm 4x50mm (100 cái)', quantity: 3, price: 45000 },
      { name: 'Búa cán gỗ 500g Stanley', quantity: 1, price: 285000 },
    ],
    shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
    estimatedDelivery: '2024-01-23',
    actualDelivery: null,
    trackingNumber: 'VN987654321',
  },
  {
    id: 'AIC456789123',
    date: '2024-01-22',
    status: 'processing',
    total: 890000,
    items: [{ name: 'Sơn nước nội thất Dulux 5L', quantity: 1, price: 890000 }],
    shippingAddress: '789 Đường DEF, Quận 3, TP.HCM',
    estimatedDelivery: '2024-01-25',
    actualDelivery: null,
    trackingNumber: null,
  },
  {
    id: 'AIC789123456',
    date: '2024-01-10',
    status: 'cancelled',
    total: 320000,
    items: [{ name: 'Gạch ốp lát Viglacera 60x60cm', quantity: 1, price: 320000 }],
    shippingAddress: '321 Đường GHI, Quận 4, TP.HCM',
    estimatedDelivery: null,
    actualDelivery: null,
    trackingNumber: null,
  },
]

const statusConfig = {
  processing: { label: 'Đang xử lý', color: 'bg-yellow-500', icon: Clock },
  shipping: { label: 'Đang giao', color: 'bg-blue-500', icon: Truck },
  delivered: { label: 'Đã giao', color: 'bg-success', icon: CheckCircle },
  cancelled: { label: 'Đã hủy', color: 'bg-red-500', icon: XCircle },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && ['processing', 'shipping'].includes(order.status)) ||
      (activeTab === 'completed' && ['delivered', 'cancelled'].includes(order.status))

    return matchesSearch && matchesStatus && matchesTab
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Đơn hàng của tôi</h1>
        <p className="text-muted-foreground">Theo dõi và quản lý tất cả đơn hàng của bạn</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo mã đơn hàng..."
              className="pl-10 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="processing">Đang xử lý</SelectItem>
            <SelectItem value="shipping">Đang giao</SelectItem>
            <SelectItem value="delivered">Đã giao</SelectItem>
            <SelectItem value="cancelled">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tất cả ({orders.length})</TabsTrigger>
          <TabsTrigger value="active">
            Đang xử lý ({orders.filter((o) => ['processing', 'shipping'].includes(o.status)).length}
            )
          </TabsTrigger>
          <TabsTrigger value="completed">
            Hoàn thành ({orders.filter((o) => ['delivered', 'cancelled'].includes(o.status)).length}
            )
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Không tìm thấy đơn hàng</h3>
              <p className="text-muted-foreground mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
              <Button asChild>
                <Link href="/categories">Bắt đầu mua sắm</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                return (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                          <div>
                            <h3 className="font-semibold text-lg">Đơn hàng #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Đặt ngày {new Date(order.date).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Badge
                            className={`${
                              statusConfig[order.status as keyof typeof statusConfig].color
                            } text-white`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                          <span className="font-bold text-lg">
                            {order.total.toLocaleString('vi-VN')} ₫
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="lg:col-span-2">
                          <h4 className="font-medium mb-3">Sản phẩm ({order.items.length})</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-border last:border-0"
                              >
                                <div>
                                  <span className="font-medium">{item.name}</span>
                                  <span className="text-muted-foreground ml-2">
                                    x{item.quantity}
                                  </span>
                                </div>
                                <span className="font-medium">
                                  {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Info */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Địa chỉ giao hàng</h4>
                            <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                          </div>

                          {order.estimatedDelivery && (
                            <div>
                              <h4 className="font-medium mb-2">Dự kiến giao hàng</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.estimatedDelivery).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                          )}

                          {order.trackingNumber && (
                            <div>
                              <h4 className="font-medium mb-2">Mã vận đơn</h4>
                              <p className="text-sm text-muted-foreground font-mono">
                                {order.trackingNumber}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </Link>
                        </Button>

                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Mua lại
                          </Button>
                        )}

                        {['processing', 'shipping'].includes(order.status) && (
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Liên hệ hỗ trợ
                          </Button>
                        )}

                        {order.status === 'processing' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive bg-transparent"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Hủy đơn hàng
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
