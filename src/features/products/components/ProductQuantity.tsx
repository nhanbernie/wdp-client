"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  FileText,
  Truck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

interface ProductQuantityProps {
  stock?: number;
  colors: any;
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({
  stock,
  colors,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(stock ?? 9999, prev + change)));
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div>
        <label className="text-sm font-medium mb-2 block text-foreground">Số lượng</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-border shadow-sm overflow-hidden bg-card">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-6 py-2 min-w-[70px] text-center font-semibold text-lg text-foreground">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (stock ?? 9999)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {stock ?? "N/A"} sản phẩm có sẵn
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white shadow-md rounded-lg"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Thêm vào giỏ
        </Button>
        <Button variant="outline" size="lg" className="rounded-lg">
          <FileText className="h-5 w-5 mr-2" />
          Yêu cầu báo giá
        </Button>
      </div>

      {/* Extra Actions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          title="Yêu thích"
          className="rounded-full hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="Chia sẻ"
          className="rounded-full hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-950"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Extra Info Section */}
      <div className="border-t border-border pt-6 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="flex flex-col items-center gap-1">
          <Truck className="h-5 w-5 text-orange-500" />
          <p className="font-medium text-foreground">Giao nhanh</p>
          <p className="text-muted-foreground">2-3 ngày</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <p className="font-medium text-foreground">Bảo hành</p>
          <p className="text-muted-foreground">6 tháng</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RefreshCw className="h-5 w-5 text-blue-500" />
          <p className="font-medium text-foreground">Đổi trả</p>
          <p className="text-muted-foreground">7 ngày</p>
        </div>
      </div>
    </div>
  );
};
