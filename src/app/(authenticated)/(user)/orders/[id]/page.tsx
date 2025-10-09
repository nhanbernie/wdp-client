"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layouts/second-layout/Header";
import { Footer } from "@/components/layouts/second-layout/Footer";
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
} from "lucide-react";

// Mock orders database
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
];

export default function OrderDetailPage() {
  const params = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Find order by ID
  const orderData = ordersDatabase.find((order) => order.id === params.id);

  // If order not found, show 404
  if (!orderData) {
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

  const getProgressValue = () => {
    const completedSteps = orderData.timeline.filter(
      (step) => step.completed
    ).length;
    return (completedSteps / orderData.timeline.length) * 100;
  };

  const getStatusConfig = (status: string) => {
    const statusMap = {
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
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.processing;
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
              <h1 className="text-3xl font-bold">Đơn hàng #{orderData.id}</h1>
            </div>
            <p className="text-muted-foreground">
              Đặt ngày {new Date(orderData.date).toLocaleDateString("vi-VN")} •
              Tổng tiền:{" "}
              <span className="font-semibold text-primary">
                {orderData.total.toLocaleString("vi-VN")} ₫
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Tải hóa đơn
            </Button>
            {orderData.status === "delivered" && (
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

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tiến độ giao hàng</span>
                    <span>{getProgressValue()}%</span>
                  </div>
                  <Progress
                    value={getProgressValue()}
                    variant="delivery"
                    className="h-2 delivery-progress"
                  />
                </div>

                <div className="space-y-4">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-primary-accent text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-medium ${
                            step.completed
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        {step.completed && step.date && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(step.date).toLocaleString("vi-VN")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
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
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.price.toLocaleString("vi-VN")} ₫/cái
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{orderData.subtotal.toLocaleString("vi-VN")} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{orderData.shipping.toLocaleString("vi-VN")} ₫</span>
                  </div>
                  {orderData.discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Giảm giá:</span>
                      <span>
                        -{orderData.discount.toLocaleString("vi-VN")} ₫
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {orderData.total.toLocaleString("vi-VN")} ₫
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
                  <p className="text-sm">{orderData.shippingAddress.name}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Địa chỉ</h4>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Điện thoại
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingAddress.phone}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingAddress.email}
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
