"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductInfoProps {
  category?: string;
  name: string;
  brand?: string;
  price: number;
  salePrice?: number;
  colors: any;
  brandColors: any;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  name,
  brand,
  price,
  salePrice,
  colors,
  brandColors,
}) => {
  return (
    <div>
      {category && (
        <Badge
          variant="outline"
          className="mb-2"
          style={{ borderColor: colors.border, color: colors.text }}
        >
          {category}
        </Badge>
      )}

      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-lg mb-4" style={{ color: colors.textSecondary }}>
        {brand}
      </p>

      {/* Fake rating */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">4.0</span>
          <span className="ml-1 text-gray-500">(12 đánh giá)</span>
        </div>
      </div>

      {/* Giá */}
      <div className="flex items-center space-x-4 mb-6">
        {salePrice ? (
          <>
            <span
              className="text-3xl font-bold"
              style={{ color: brandColors.primary }}
            >
              {salePrice.toLocaleString("vi-VN")} ₫
            </span>
            <span className="text-lg line-through text-gray-500">
              {price.toLocaleString("vi-VN")} ₫
            </span>
          </>
        ) : (
          <span
            className="text-3xl font-bold"
            style={{ color: brandColors.primary }}
          >
            {price.toLocaleString("vi-VN")} ₫
          </span>
        )}
      </div>
    </div>
  );
};
