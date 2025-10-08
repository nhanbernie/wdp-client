"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  MessageCircle,
  RotateCcw,
  Star,
  Loader2,
} from "lucide-react";
import {
  useGetOrderByIdQuery,
  useCancelOrderMutation,
} from "@/redux/slices/ordersApiSlice";
import { OrderStatus } from "@/services/orders/types";

// Mock orders database (kept for fallback)
const ordersDatabase = [
  {
    id: "AIC123456789",
    date: "2024-01-15",
    status: "delivered",
    total: 4830000,
    subtotal: 4780000,
    shipping: 50000,
    discount: 0,
    paymentMethod: "VNPay",
    items: [
      {
        id: 1,
        name: "Xi măng Portland PCB40 Holcim",
        brand: "Holcim",
        quantity: 2,
        price: 165000,
        image: "/cement-bag.png",
      },
      {
        id: 2,
        name: "Máy khoan búa Bosch GBH 2-28 DV",
        brand: "Bosch",
        quantity: 1,
        price: 4500000,
        image: "/drill-machine.png",
      },
    ],
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      address: "123 Đường ABC, Phường 1, Quận 1, TP.HCM",
    },
    timeline: [
      {
        status: "confirmed",
        title: "Đơn hàng được xác nhận",
        description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
        date: "2024-01-15T10:00:00",
        completed: true,
      },
      {
        status: "processing",
        title: "Đang chuẩn bị hàng",
        description: "Sản phẩm đang được đóng gói",
        date: "2024-01-15T14:30:00",
        completed: true,
      },
      {
        status: "shipped",
        title: "Đã giao cho đơn vị vận chuyển",
        description: "Mã vận đơn: VN123456789",
        date: "2024-01-16T09:15:00",
        completed: true,
      },
      {
        status: "delivered",
        title: "Đã giao hàng thành công",
        description: "Giao hàng thành công tại địa chỉ đã đăng ký",
        date: "2024-01-17T15:45:00",
        completed: true,
      },
    ],
    trackingNumber: "VN123456789",
    estimatedDelivery: "2024-01-18",
    actualDelivery: "2024-01-17",
  },
  {
    id: "AIC987654321",
    date: "2024-01-20",
    status: "shipping",
    total: 330000,
    subtotal: 280000,
    shipping: 50000,
    discount: 0,
    paymentMethod: "COD",
    items: [
      {
        id: 3,
        name: "Vít gỗ đầu chìm 4x50mm (100 cái)",
        brand: "Stanley",
        quantity: 3,
        price: 45000,
        image: "/screws.png",
      },
      {
        id: 4,
        name: "Búa cán gỗ 500g Stanley",
        brand: "Stanley",
        quantity: 1,
        price: 285000,
        image: "/hammer.png",
      },
    ],
    shippingAddress: {
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@email.com",
      address: "456 Đường XYZ, Phường 2, Quận 2, TP.HCM",
    },
    timeline: [
      {
        status: "confirmed",
        title: "Đơn hàng được xác nhận",
        description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
        date: "2024-01-20T10:00:00",
        completed: true,
      },
      {
        status: "processing",
        title: "Đang chuẩn bị hàng",
        description: "Sản phẩm đang được đóng gói",
        date: "2024-01-20T14:30:00",
        completed: true,
      },
      {
        status: "shipped",
        title: "Đã giao cho đơn vị vận chuyển",
        description: "Mã vận đơn: VN987654321",
        date: "2024-01-21T09:15:00",
        completed: true,
      },
      {
        status: "delivered",
        title: "Đang giao hàng",
        description: "Dự kiến giao hàng trong ngày hôm nay",
        date: "2024-01-23T15:45:00",
        completed: false,
      },
    ],
    trackingNumber: "VN987654321",
    estimatedDelivery: "2024-01-23",
    actualDelivery: null,
  },
  {
    id: "AIC456789123",
    date: "2024-01-22",
    status: "processing",
    total: 940000,
    subtotal: 890000,
    shipping: 50000,
    discount: 0,
    paymentMethod: "VNPay",
    items: [
      {
        id: 5,
        name: "Sơn nước nội thất Dulux 5L",
        brand: "Dulux",
        quantity: 1,
        price: 890000,
        image: "/paint.png",
      },
    ],
    shippingAddress: {
      name: "Lê Văn C",
      phone: "0456789123",
      email: "levanc@email.com",
      address: "789 Đường DEF, Phường 3, Quận 3, TP.HCM",
    },
    timeline: [
      {
        status: "confirmed",
        title: "Đơn hàng được xác nhận",
        description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
        date: "2024-01-22T10:00:00",
        completed: true,
      },
      {
        status: "processing",
        title: "Đang chuẩn bị hàng",
        description: "Sản phẩm đang được đóng gói",
        date: "2024-01-22T14:30:00",
        completed: false,
      },
      {
        status: "shipped",
        title: "Chờ giao cho đơn vị vận chuyển",
        description: "Đang chờ xử lý",
        date: null,
        completed: false,
      },
      {
        status: "delivered",
        title: "Chờ giao hàng",
        description: "Chưa được giao",
        date: null,
        completed: false,
      },
    ],
    trackingNumber: null,
    estimatedDelivery: "2024-01-25",
    actualDelivery: null,
  },
  {
    id: "AIC789123456",
    date: "2024-01-10",
    status: "cancelled",
    total: 370000,
    subtotal: 320000,
    shipping: 50000,
    discount: 0,
    paymentMethod: "VNPay",
    items: [
      {
        id: 6,
        name: "Gạch ốp lát Viglacera 60x60cm",
        brand: "Viglacera",
        quantity: 1,
        price: 320000,
        image: "/tiles.png",
      },
    ],
    shippingAddress: {
      name: "Phạm Thị D",
      phone: "0789123456",
      email: "phamthid@email.com",
      address: "321 Đường GHI, Phường 4, Quận 4, TP.HCM",
    },
    timeline: [
      {
        status: "confirmed",
        title: "Đơn hàng được xác nhận",
        description: "Đơn hàng đã được xác nhận",
        date: "2024-01-10T10:00:00",
        completed: true,
      },
      {
        status: "cancelled",
        title: "Đơn hàng đã bị hủy",
        description: "Hủy theo yêu cầu của khách hàng",
        date: "2024-01-10T15:30:00",
        completed: true,
      },
    ],
    trackingNumber: null,
    estimatedDelivery: null,
    actualDelivery: null,
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch order by ID from API
  const {
    data: orderResponse,
    isLoading,
    error,
  } = useGetOrderByIdQuery(params.id as string);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  // Get order data from response
  const orderData = orderResponse?.data;

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!orderData) return;
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    try {
      await cancelOrder(orderData.id).unwrap();
      alert("Hủy đơn hàng thành công");
      router.push("/orders");
    } catch (err: any) {
      alert(err?.data?.message || "Không thể hủy đơn hàng");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">
              Đang tải thông tin đơn hàng...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy đơn hàng
          </h1>
          <p className="text-gray-600 mb-4">
            Đơn hàng với ID {params.id} không tồn tại.
          </p>
          <Link href="/orders">
            <Button>Quay lại danh sách đơn hàng</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    const statusMap = {
      pending: {
        label: "Đang chờ xử lý",
        badgeClass: "bg-gray-500 text-white",
        message: "Đơn hàng đang chờ xác nhận",
        icon: Clock,
      },
      processing: {
        label: "Đang xử lý",
        badgeClass: "bg-yellow-500 text-white",
        message: "Đơn hàng đang được xử lý",
        icon: Clock,
      },
      shipping: {
        label: "Đang giao hàng",
        badgeClass: "bg-blue-500 text-white",
        message: `Dự kiến giao hàng ngày ${
          orderData.estimatedDelivery
            ? new Date(orderData.estimatedDelivery).toLocaleDateString("vi-VN")
            : "chưa xác định"
        }`,
        icon: Package,
      },
      delivered: {
        label: "Đã giao hàng",
        badgeClass: "bg-success text-white",
        message: `Giao thành công ngày ${
          orderData.actualDelivery
            ? new Date(orderData.actualDelivery).toLocaleDateString("vi-VN")
            : ""
        }`,
        icon: CheckCircle,
      },
      cancelled: {
        label: "Đã hủy",
        badgeClass: "bg-red-500 text-white",
        message: "Đơn hàng đã được hủy",
        icon: Clock,
      },
      refunded: {
        label: "Đã hoàn tiền",
        badgeClass: "bg-purple-500 text-white",
        message: "Đơn hàng đã được hoàn tiền",
        icon: RotateCcw,
      },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const statusConfig = getStatusConfig(orderData.status);

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              <h1 className="text-3xl font-bold">
                Đơn hàng #{orderData.orderNumber}
              </h1>
            </div>
            <p className="text-muted-foreground">
              Đặt ngày{" "}
              {new Date(orderData.createdAt).toLocaleDateString("vi-VN")} • Tổng
              tiền:{" "}
              <span className="font-semibold text-primary">
                {Number(orderData.totalAmount).toLocaleString("vi-VN")} ₫
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {(orderData.status === OrderStatus.PENDING ||
              orderData.status === OrderStatus.PROCESSING) && (
              <Button
                variant="destructive"
                onClick={handleCancelOrder}
                disabled={isCancelling}
              >
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
                  <span className="text-sm text-muted-foreground">
                    {statusConfig.message}
                  </span>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  {orderData.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mã vận đơn:</span>
                      <span className="font-mono font-medium">
                        {orderData.trackingNumber}
                      </span>
                    </div>
                  )}
                  {orderData.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Dự kiến giao:
                      </span>
                      <span>
                        {new Date(
                          orderData.estimatedDelivery
                        ).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  )}
                  {orderData.actualDelivery && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Đã giao:</span>
                      <span>
                        {new Date(orderData.actualDelivery).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  )}
                  {orderData.notes && (
                    <div className="pt-2">
                      <p className="text-muted-foreground mb-1">Ghi chú:</p>
                      <p className="text-sm">{orderData.notes}</p>
                    </div>
                  )}
                  {orderData.customerNotes && (
                    <div className="pt-2">
                      <p className="text-muted-foreground mb-1">
                        Ghi chú của bạn:
                      </p>
                      <p className="text-sm">{orderData.customerNotes}</p>
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
                      className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                    >
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.productName}</h4>
                        {item.variantName && (
                          <p className="text-sm text-muted-foreground">
                            {item.variantName}
                          </p>
                        )}
                        {item.sku && (
                          <p className="text-xs text-muted-foreground">
                            SKU: {item.sku}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {Number(item.totalPrice).toLocaleString("vi-VN")} ₫
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Number(item.unitPrice).toLocaleString("vi-VN")} ₫/cái
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>
                      {Number(orderData.subtotal).toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>
                      {Number(orderData.shippingFee).toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                  {Number(orderData.discountAmount) > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Giảm giá:</span>
                      <span>
                        -
                        {Number(orderData.discountAmount).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        ₫
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {Number(orderData.totalAmount).toLocaleString("vi-VN")} ₫
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
                  <h4 className="font-medium mb-2">Người nhận</h4>
                  <p className="text-sm">{orderData.shippingName}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Địa chỉ</h4>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress}
                    {orderData.shippingWard && `, ${orderData.shippingWard}`}
                    {orderData.shippingDistrict &&
                      `, ${orderData.shippingDistrict}`}
                    {orderData.shippingCity && `, ${orderData.shippingCity}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Điện thoại
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingPhone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Phương thức thanh toán</h4>
                    <p className="text-sm text-muted-foreground uppercase">
                      {orderData.paymentMethod}
                    </p>
                  </div>
                </div>

                {orderData.trackingNumber && (
                  <div>
                    <h4 className="font-medium mb-2">Mã vận đơn</h4>
                    <p className="text-sm font-mono bg-muted p-2 rounded">
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
                  <div className="flex justify-between">
                    <span>Phương thức:</span>
                    <span className="font-medium">
                      {orderData.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trạng thái:</span>
                    <Badge className="bg-success text-white">
                      Đã thanh toán
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

      <Footer />
    </div>
  );
}
