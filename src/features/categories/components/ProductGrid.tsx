"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/categories.types";

interface ProductGridProps {
  viewMode: "grid" | "list";
}

export function ProductGrid({ viewMode }: ProductGridProps) {
  const { products, loading } = useProducts({
    inStock: true,
    sort: "newest",
    page: 1,
    withFacets: true,
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Đang tải sản phẩm...
      </div>
    );

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {products.map((product: Product) => {
        const discount =
          product.salePrice &&
          Math.round((1 - product.salePrice / product.price) * 100);

        const inStock = product.stock?.quantity > 0;

        return (
          <motion.div
            key={product.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Card className="group relative overflow-hidden border border-border/60 rounded-2xl bg-background hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Image Section */}
                <div className="relative">
                  <div className="overflow-hidden rounded-t-2xl">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className={`w-full ${
                        viewMode === "grid" ? "h-56" : "h-44"
                      } object-cover transition-transform duration-500 group-hover:scale-110`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Favorite */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm hover:scale-110 transition-transform"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>

                  {/* Discount Badge */}
                  {discount && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                      -{discount}%
                    </Badge>
                  )}

                  {/* Out of Stock Overlay */}
                  {!inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge
                        variant="destructive"
                        className="px-3 py-1 text-sm"
                      >
                        Hết hàng
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 p-5 flex flex-col">
                  <Badge
                    variant="outline"
                    className="mb-2 text-xs font-medium w-fit"
                  >
                    {product.category?.name}
                  </Badge>

                  <h3 className="font-semibold text-base mb-1 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    {product.brand}
                  </p>

                  {/* Dynamic badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="secondary"
                          className="text-xs capitalize px-2 py-0.5"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {inStock && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Còn {product.stock.quantity} {product.stock.unit}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-lg font-bold text-primary">
                      {(product.salePrice || product.price).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      {product.currency}
                    </span>
                    {product.salePrice && (
                      <span className="ml-2 text-sm line-through text-muted-foreground">
                        {product.price.toLocaleString("vi-VN")}{" "}
                        {product.currency}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-background/60 hover:bg-primary/10 transition-all"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="flex-1 font-medium hover:scale-[1.03] transition-transform"
                      disabled={!inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {inStock ? "Thêm giỏ " : "Hết hàng"}
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
