"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  Share2,
} from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { useTheme } from "@/contexts/ThemeContext";

// Mock product data
const product = {
  id: 1,
  name: "Xi măng Portland PCB40 Holcim",
  brand: "Holcim",
  price: 165000,
  originalPrice: 180000,
  rating: 4.8,
  reviews: 234,
  images: [
    "/cement-bag-front.jpg",
    "/cement-bag-side.jpg",
    "/cement-bag-back.jpg",
    "/cement-bag-detail.jpg",
  ],
  inStock: true,
  stockQuantity: 150,
  category: "Xi măng",
  sku: "HLC-PCB40-50KG",
  description:
    "Xi măng Portland PCB40 Holcim là sản phẩm xi măng chất lượng cao, được sản xuất theo tiêu chuẩn quốc tế. Phù hợp cho mọi loại công trình xây dựng từ dân dụng đến công nghiệp.",
  specifications: {
    "Trọng lượng": "50kg",
    Loại: "Portland PCB40",
    "Cường độ nén": "40 MPa",
    "Thời gian đông kết": "45-60 phút",
    "Xuất xứ": "Việt Nam",
    "Bảo hành": "6 tháng",
  },
  features: [
    "Cường độ nén cao 40 MPa",
    "Thời gian đông kết ổn định",
    "Chất lượng đồng đều",
    "Phù hợp mọi loại công trình",
    "Tiêu chuẩn quốc tế ISO 9001",
  ],
};

const aiRecommendations = [
  {
    id: 2,
    name: "Cát xây dựng loại 1",
    reason: "Thường được sử dụng cùng xi măng để tạo vữa",
    price: 450000,
    image: "/construction-sand.png",
  },
  {
    id: 3,
    name: "Đá dăm 1x2cm",
    reason: "Cần thiết để tạo bê tông chất lượng cao",
    price: 380000,
    image: "/gravel-stones.jpg",
  },
  {
    id: 4,
    name: "Phụ gia bê tông Sika",
    reason: "Tăng cường độ bền và chống thấm",
    price: 125000,
    image: "/concrete-additive.jpg",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { colors, brandColors } = useTheme();

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(product.stockQuantity, prev + change))
    );
  };

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: colors.backgroundGradient, color: colors.text }}
    >
      <Header />

      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm mb-8"
          style={{ color: colors.textSecondary }}
        >
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-blue-600">
            Danh mục
          </Link>
          <span>/</span>
          <Link href="/categories/xi-mang" className="hover:text-blue-600">
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: colors.text }}>{product.name}</span>
        </motion.nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div
              className="aspect-square rounded-lg overflow-hidden shadow"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <Badge
                variant="outline"
                className="mb-2"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p
                className="text-lg mb-4"
                style={{ color: colors.textSecondary }}
              >
                {product.brand}
              </p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{product.rating}</span>
                  <span className="ml-1 text-gray-500">
                    ({product.reviews} đánh giá)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span
                  className="text-3xl font-bold"
                  style={{ color: brandColors.primary }}
                >
                  {product.price.toLocaleString("vi-VN")} ₫
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl line-through text-gray-500">
                      {product.originalPrice.toLocaleString("vi-VN")} ₫
                    </span>
                    <Badge
                      style={{
                        backgroundColor: brandColors.accent,
                        color: "#fff",
                      }}
                    >
                      -
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      %
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Quantity + Actions */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Số lượng
                </label>
                <div className="flex items-center space-x-4">
                  <div
                    className="flex items-center border rounded-md"
                    style={{ borderColor: colors.border }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stockQuantity} sản phẩm có sẵn
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1"
                  style={{
                    backgroundColor: brandColors.primary,
                    color: "#fff",
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{ borderColor: colors.border }}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  style={{ borderColor: colors.border }}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBackground,
                  color: colors.text,
                }}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Yêu cầu báo giá
              </Button>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <Truck className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">Giao hàng nhanh</span>
                <span className="text-xs text-gray-500">2-3 ngày</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">Bảo hành</span>
                <span className="text-xs text-gray-500">6 tháng</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2"
              >
                <RotateCcw className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">Đổi trả</span>
                <span className="text-xs text-gray-500">7 ngày</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList
            className="grid w-full grid-cols-3 border rounded-lg"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
            }}
          >
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Mô tả
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Thông số
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Đánh giá
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {product.description}
                </p>

                <h4 className="font-semibold mb-3">Tính năng nổi bật:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Thông số kỹ thuật
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b"
                        style={{ borderColor: colors.border }}
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Đánh giá khách hàng
                </h3>
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Tính năng đánh giá sẽ được cập nhật sớm</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <div
              className="h-8 w-8 rounded flex items-center justify-center mr-3"
              style={{ backgroundColor: brandColors.secondary, color: "#fff" }}
            >
              AI
            </div>
            <h2 className="text-2xl font-bold">Sản phẩm AI gợi ý</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl shadow-sm"
                style={{
                  backgroundColor: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.reason}
                      </p>
                      <p
                        className="font-bold"
                        style={{ color: brandColors.primary }}
                      >
                        {item.price.toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-4"
                    style={{
                      backgroundColor: brandColors.primary,
                      color: "#fff",
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </CardContent>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
