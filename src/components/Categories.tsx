"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Hammer,
  Wrench,
  Zap,
  Paintbrush,
  Home,
  Truck,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Xi măng & Vữa",
    icon: Home,
    backgroundImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTfdsEUxEleYPmA_De3YBGcbBWSAur0rNPQ&s",
    count: "2,450 sản phẩm",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    id: 2,
    name: "Đinh, Vít & Bu lông",
    icon: Hammer,
    count: "5,230 sản phẩm",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    id: 3,
    name: "Dụng cụ điện",
    icon: Zap,
    count: "1,890 sản phẩm",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: 4,
    name: "Máy móc xây dựng",
    icon: Truck,
    count: "890 sản phẩm",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    id: 5,
    name: "Dụng cụ cầm tay",
    icon: Wrench,
    count: "3,120 sản phẩm",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: 6,
    name: "Sơn & Hoàn thiện",
    icon: Paintbrush,
    count: "1,560 sản phẩm",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
];

function Categories() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Khám phá vật liệu xây dựng
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tìm kiếm trong hàng nghìn sản phẩm chất lượng cao từ các nhà cung
            cấp uy tín
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer 
                    border-border/50 hover:border-primary/50 bg-[url('https://vattumro.com/wp-content/uploads/may-khoan-dung-cu-co-khi-cropped-keyang.jpg')] bg-cover bg-center"
              >
                <CardContent>
                  <div className="flex items-start justify-end mb-4">
                    <ArrowRight className="h-4 w-4 text-black group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white">{category.count}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
