"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";

// Mock product data
const products = [
  {
    id: 1,
    name: "Xi măng Portland PCB40 Holcim",
    brand: "Holcim",
    price: 165000,
    originalPrice: 180000,
    rating: 4.8,
    reviews: 234,
    image: "cement-bag.png",
    inStock: true,
    category: "Xi măng",
  },
  {
    id: 2,
    name: "Máy khoan búa Bosch GBH 2-28 DV",
    brand: "Bosch",
    price: 4500000,
    rating: 4.9,
    reviews: 156,
    image: "/drill-machine.png",
    inStock: true,
    category: "Dụng cụ điện",
  },
  {
    id: 3,
    name: "Vít gỗ đầu chìm 4x50mm (100 cái)",
    brand: "Việt Tiến",
    price: 45000,
    originalPrice: 50000,
    rating: 4.6,
    reviews: 89,
    image: "/wood-screws.jpg",
    inStock: true,
    category: "Đinh vít",
  },
  {
    id: 4,
    name: "Sơn nước nội thất Dulux 5L",
    brand: "Dulux",
    price: 890000,
    originalPrice: 950000,
    rating: 4.7,
    reviews: 312,
    image: "/paint-bucket.png",
    inStock: false,
    category: "Sơn",
  },
];

interface ProductGridProps {
  viewMode: "grid" | "list";
}

export function ProductGrid({ viewMode }: ProductGridProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {products.map((product) => {
        const discount =
          product.originalPrice &&
          Math.round((1 - product.price / product.originalPrice) * 100);

        return (
          <motion.div
            key={product.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Image + badges */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full ${
                      viewMode === "grid" ? "h-48" : "h-40"
                    } object-cover group-hover:scale-105 transition-transform duration-300`}
                  />

                  {/* Favorite */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>

                  {/* Discount */}
                  {discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{discount}%
                    </Badge>
                  )}

                  {/* Out of stock */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Hết hàng</Badge>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 p-4 flex flex-col">
                  <Badge variant="outline" className="mb-2 text-xs w-fit">
                    {product.category}
                  </Badge>

                  <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    {product.brand}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                    <span className="ml-1 text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm line-through text-muted-foreground">
                        {product.originalPrice.toLocaleString("vi-VN")} ₫
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.inStock ? "Thêm" : "Hết hàng"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
