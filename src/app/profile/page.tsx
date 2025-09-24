"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Lock,
  Bell,
  Package,
  FileText,
  Settings,
  Camera,
  Plus,
  Edit,
  Trash2,
  Star,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Địa chỉ nhà",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
      phone: "0901234567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Địa chỉ công ty",
      address: "456 Đường DEF, Phường UVW, Quận 3, TP.HCM",
      phone: "0907654321",
      isDefault: false,
    },
  ]);

  const recentOrders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      total: "2,500,000đ",
      status: "Hoàn thành",
      items: 3,
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      total: "1,800,000đ",
      status: "Đang giao",
      items: 2,
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      total: "3,200,000đ",
      status: "Hoàn thành",
      items: 5,
    },
  ];

  const favoriteProducts = [
    {
      id: 1,
      name: "Xi măng Portland PCB40",
      price: "85,000đ",
      image: "/cement-bag.png",
    },
    {
      id: 2,
      name: "Thép xây dựng D10",
      price: "18,500đ/kg",
      image: "/drill-machine.png",
    },
    {
      id: 3,
      name: "Gạch ốp lát Viglacera",
      price: "320,000đ/m²",
      image: "/ceramic-tiles-collection.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/avatar-placeholder.png" />
          <AvatarFallback className="text-2xl">NV</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">Nguyễn Văn A</h1>
          <p className="text-muted-foreground">Thành viên từ tháng 3/2023</p>
          <Badge variant="secondary" className="mt-1">
            <Star className="h-3 w-3 mr-1" />
            Khách hàng VIP
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Hồ sơ
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Địa chỉ
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Đơn hàng
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Yêu thích
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Cài đặt
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin hồ sơ của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatar-placeholder.png" />
                    <AvatarFallback className="text-2xl">NV</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Ảnh đại diện</h3>
                  <p className="text-sm text-muted-foreground">
                    Tải lên ảnh đại diện mới
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ borderColor: "#C55E45", color: "#C55E45" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        "#C55E45";
                      (e.target as HTMLButtonElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        "transparent";
                      (e.target as HTMLButtonElement).style.color = "#C55E45";
                    }}
                  >
                    Thay đổi ảnh
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input id="fullName" defaultValue="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="nguyenvana@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue="0901234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Công ty</Label>
                  <Input id="company" defaultValue="Công ty TNHH ABC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxCode">Mã số thuế</Label>
                  <Input id="taxCode" defaultValue="0123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Loại hình kinh doanh</Label>
                  <Input id="businessType" defaultValue="Xây dựng dân dụng" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea
                  id="bio"
                  placeholder="Mô tả ngắn về bản thân hoặc công ty..."
                  defaultValue="Chuyên thi công các công trình dân dụng và công nghiệp với hơn 10 năm kinh nghiệm."
                />
              </div>

              <Button
                className="w-full md:w-auto"
                style={{ backgroundColor: "#C55E45", color: "white" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#A04A37")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#C55E45")
                }
              >
                Cập nhật thông tin
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Địa chỉ giao hàng</h2>
              <p className="text-muted-foreground">
                Quản lý các địa chỉ giao hàng của bạn
              </p>
            </div>
            <Button
              className="flex items-center gap-2"
              style={{ backgroundColor: "#C55E45", color: "white" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#A04A37")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor =
                  "#C55E45")
              }
            >
              <Plus className="h-4 w-4" />
              Thêm địa chỉ mới
            </Button>
          </div>

          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{address.name}</h3>
                        {address.isDefault && (
                          <Badge
                            variant="default"
                            style={{
                              backgroundColor: "#C55E45",
                              color: "white",
                            }}
                          >
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{address.address}</p>
                      <p className="text-sm text-muted-foreground">
                        SĐT: {address.phone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
              <CardDescription>
                Cập nhật mật khẩu để bảo mật tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button
                style={{ backgroundColor: "#C55E45", color: "white" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#A04A37")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor =
                    "#C55E45")
                }
              >
                Đổi mật khẩu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Xác thực hai yếu tố</CardTitle>
              <CardDescription>
                Tăng cường bảo mật cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Xác thực qua SMS</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận mã xác thực qua tin nhắn
                  </p>
                </div>
                <Button
                  variant="outline"
                  style={{ borderColor: "#C55E45", color: "#C55E45" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      "#C55E45";
                    (e.target as HTMLButtonElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      "transparent";
                    (e.target as HTMLButtonElement).style.color = "#C55E45";
                  }}
                >
                  Kích hoạt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Đơn hàng gần đây</h2>
              <p className="text-muted-foreground">
                Theo dõi các đơn hàng của bạn
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="/orders">Xem tất cả</a>
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold">#{order.id}</h3>
                        <Badge
                          variant={
                            order.status === "Hoàn thành"
                              ? "default"
                              : "secondary"
                          }
                          style={
                            order.status === "Hoàn thành"
                              ? { backgroundColor: "#C55E45", color: "white" }
                              : order.status === "Đang giao"
                              ? { backgroundColor: "#22C55E", color: "white" }
                              : {}
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.date} • {order.items} sản phẩm
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{order.total}</p>
                      <Button variant="outline" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Sản phẩm yêu thích</h2>
            <p className="text-muted-foreground">
              Các sản phẩm bạn đã lưu để mua sau
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-4">
                    {product.price}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      style={{ backgroundColor: "#C55E45", color: "white" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLButtonElement).style.backgroundColor =
                          "#A04A37")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLButtonElement).style.backgroundColor =
                          "#C55E45")
                      }
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>
                Quản lý các thông báo bạn muốn nhận
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email thông báo đơn hàng</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo về trạng thái đơn hàng
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Bật
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo khuyến mãi</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông tin về các chương trình ưu đãi
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Bật
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo sản phẩm mới</p>
                  <p className="text-sm text-muted-foreground">
                    Cập nhật về sản phẩm và dịch vụ mới
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Tắt
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hỗ trợ</CardTitle>
              <CardDescription>
                Liên hệ với chúng tôi khi cần hỗ trợ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat với AI Assistant
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <FileText className="h-4 w-4 mr-2" />
                Trung tâm trợ giúp
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Bell className="h-4 w-4 mr-2" />
                Liên hệ hỗ trợ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
