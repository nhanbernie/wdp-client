"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Loader2,
} from "lucide-react";
import {
  useGetOrdersQuery,
  useGetOrderStatisticsQuery,
  useCancelOrderMutation,
} from "@/redux/slices/ordersApiSlice";
import { OrderStatus } from "@/services/orders/types";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Simple toast replacement
const toast = {
  success: (message: string) => alert(message),
  error: (message: string) => alert(message),
};

const statusConfig = {
  pending: { label: "Chờ xử lý", color: "bg-gray-500", icon: Clock },
  processing: { label: "Đang xử lý", color: "bg-yellow-500", icon: Clock },
  shipping: { label: "Đang giao", color: "bg-blue-500", icon: Truck },
  delivered: { label: "Đã giao", color: "bg-green-500", icon: CheckCircle },
  cancelled: { label: "Đã hủy", color: "bg-red-500", icon: XCircle },
  refunded: { label: "Hoàn tiền", color: "bg-purple-500", icon: RotateCcw },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch orders
  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useGetOrdersQuery({
    orderNumber: searchQuery || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  });

  // Fetch statistics
  const { data: statsData } = useGetOrderStatisticsQuery();

  // Cancel order mutation
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const orders = ordersData?.data || [];
  const meta = ordersData?.meta;
  const stats = statsData?.data;

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    try {
      await cancelOrder(orderId).unwrap();
      toast.success("Hủy đơn hàng thành công");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Không thể hủy đơn hàng");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" &&
        ["pending", "processing", "shipping"].includes(order.status)) ||
      (activeTab === "completed" &&
        ["delivered", "cancelled", "refunded"].includes(order.status));

    return matchesTab;
  });

  const activeOrdersCount =
    (stats?.byStatus.pending || 0) +
    (stats?.byStatus.processing || 0) +
    (stats?.byStatus.shipping || 0);

  const completedOrdersCount =
    (stats?.byStatus.delivered || 0) + (stats?.byStatus.cancelled || 0);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <XCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
            <p className="text-muted-foreground mb-6">
              Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.
            </p>
            <Button onClick={() => refetch()}>Thử lại</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Đơn hàng của tôi</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý tất cả đơn hàng của bạn
          </p>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as OrderStatus | "all");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
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
            <TabsTrigger value="all">Tất cả ({stats?.total || 0})</TabsTrigger>
            <TabsTrigger value="active">
              Đang xử lý ({activeOrdersCount})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Hoàn thành ({completedOrdersCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
                <p className="text-muted-foreground">Đang tải đơn hàng...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Không tìm thấy đơn hàng
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? "Thử thay đổi từ khóa tìm kiếm"
                    : "Bạn chưa có đơn hàng nào"}
                </p>
                <Button asChild>
                  <Link href="/categories">Bắt đầu mua sắm</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const config =
                      statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = config?.icon || Clock;

                    return (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          {/* Order Header */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
                            <div className="mb-4 md:mb-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">
                                  Mã đơn hàng: {order.orderNumber}
                                </span>
                                <Badge
                                  className={`${
                                    config?.color || "bg-gray-500"
                                  } text-white`}
                                >
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {config?.label || order.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Đặt ngày:{" "}
                                {new Date(order.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/orders/${order.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Chi tiết
                                </Link>
                              </Button>
                              {(order.status === OrderStatus.PENDING ||
                                order.status === OrderStatus.PROCESSING) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelOrder(order.id)}
                                  disabled={isCancelling}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Hủy đơn
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-3 mb-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4"
                              >
                                {item.thumbnail && (
                                  <img
                                    src={item.thumbnail}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    {item.productName}
                                  </h4>
                                  {item.variantName && (
                                    <p className="text-sm text-muted-foreground">
                                      {item.variantName}
                                    </p>
                                  )}
                                  <p className="text-sm text-muted-foreground">
                                    x{item.quantity}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    {formatCurrency(Number(item.unitPrice))}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Footer */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground mb-2 md:mb-0">
                              <p>
                                Giao đến: {order.shippingAddress}
                                {order.shippingDistrict &&
                                  `, ${order.shippingDistrict}`}
                                {order.shippingCity &&
                                  `, ${order.shippingCity}`}
                              </p>
                              {order.trackingNumber && (
                                <p>Mã vận đơn: {order.trackingNumber}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                Tổng tiền
                              </p>
                              <p className="text-xl font-bold text-primary">
                                {formatCurrency(Number(order.totalAmount))}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Trước
                    </Button>
                    <span className="flex items-center px-4">
                      Trang {page} / {meta.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPage((p) => Math.min(meta.totalPages, p + 1))
                      }
                      disabled={page === meta.totalPages}
                    >
                      Sau
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
