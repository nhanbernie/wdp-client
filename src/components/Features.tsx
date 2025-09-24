"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Search,
  ShoppingCart,
  Truck,
  MessageSquare,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Tư vấn thông minh",
    description:
      "Chatbot AI hỗ trợ 24/7, gợi ý sản phẩm phù hợp và tương thích với dự án của bạn.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Search,
    title: "Tìm kiếm nâng cao",
    description:
      "Lọc theo thông số kỹ thuật, kích thước, vật liệu và giá cả để tìm đúng sản phẩm cần thiết.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: ShoppingCart,
    title: "Đặt hàng dễ dàng",
    description:
      "Giỏ hàng thông minh với tính năng lưu đơn hàng và đặt lại sản phẩm thường mua.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: MessageSquare,
    title: "Báo giá nhanh chóng",
    description:
      "Gửi yêu cầu báo giá cho đơn hàng lớn và nhận phản hồi từ nhà cung cấp trong 24h.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    icon: Truck,
    title: "Theo dõi đơn hàng",
    description:
      "Cập nhật trạng thái giao hàng theo thời gian thực và lịch sử đơn hàng chi tiết.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Shield,
    title: "Thanh toán an toàn",
    description:
      "Tích hợp các cổng thanh toán uy tín: Stripe, VNPay, Momo với bảo mật cao.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
];

function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tại sao chọn AICShop?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nền tảng được thiết kế đặc biệt cho ngành xây dựng với công nghệ AI
            tiên tiến
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
