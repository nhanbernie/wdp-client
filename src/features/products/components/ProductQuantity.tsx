'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
  Zap,
  Package,
} from 'lucide-react'
import { useCartApi } from '@/features/cart/hooks'
import { RequestQuoteButton } from '@/features/quote-requests/components'
import { useToast } from '@/hooks/useToast'
import { motion } from 'framer-motion'

interface ProductQuantityProps {
  stock?: number
  colors: any
  productId?: string
  variantId?: string
  hasVariants?: boolean
  selectedVariant?: { id: string; sku: string; price?: number; stockQty: number } | null
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({ 
  stock, 
  colors, 
  productId, 
  variantId,
  hasVariants = false,
  selectedVariant 
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart, isAddingToCart } = useCartApi()
  const toast = useToast()

  // Reset quantity khi variant thay đổi hoặc stock thay đổi
  useEffect(() => {
    setQuantity(1)
  }, [variantId, stock])

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(stock ?? 9999, prev + change)))
  }

  const handleAddToCart = async () => {
    if (!productId) {
      console.error('Product ID is required to add to cart')
      toast.error('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng')
      return
    }

    // Nếu product có variants nhưng chưa chọn variant, không cho add to cart
    if (hasVariants && !variantId) {
      toast.error('Vui lòng chọn biến thể', 'Bạn cần chọn biến thể sản phẩm trước khi thêm vào giỏ hàng')
      return
    }

    await addToCart(productId, quantity, variantId)
  }

  // Disable button nếu có variants nhưng chưa chọn variant
  const isAddToCartDisabled = !productId || isAddingToCart || (hasVariants && !variantId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-4"
    >
      {/* Stock & Quantity */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl shadow-sm"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: colors.success }}
          ></span>
          <span className="text-xs" style={{ color: colors.textSecondary }}>
            {stock && stock > 0 ? stock : 'N/A'} sản phẩm
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
            Số lượng:
          </span>
          <div className="flex items-center rounded-lg"
            style={{
              backgroundColor: colors.background,
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-l-lg transition-all disabled:opacity-50"
              style={{
                color: colors.text,
              }}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <div className="px-3 py-1.5 min-w-[50px] text-center">
              <span className="text-sm font-bold" style={{ color: colors.text }}>
                {quantity}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (stock ?? 9999)}
              className="h-8 w-8 rounded-r-lg transition-all disabled:opacity-50"
              style={{
                color: colors.text,
              }}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          className="w-full text-white rounded-lg h-11 text-sm font-bold shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled}
          style={{ 
            backgroundColor: isAddToCartDisabled ? colors.textSecondary : colors.accent 
          }}
          onMouseEnter={(e) => {
            if (!isAddToCartDisabled) {
              e.currentTarget.style.backgroundColor = colors.accentSecondary
            }
          }}
          onMouseLeave={(e) => {
            if (!isAddToCartDisabled) {
              e.currentTarget.style.backgroundColor = colors.accent
            }
          }}
          title={hasVariants && !variantId ? 'Vui lòng chọn biến thể sản phẩm' : ''}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAddingToCart 
            ? 'Đang thêm...' 
            : hasVariants && !variantId 
            ? 'Vui lòng chọn biến thể' 
            : 'Thêm vào giỏ hàng'}
        </Button>

        {productId && <RequestQuoteButton productId={productId} />}
      </div>

      {/* Extra Actions */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          title="Yêu thích"
          onClick={() => setIsFavorite(!isFavorite)}
          className="rounded-lg h-9 w-9 transition-all"
          style={{
            color: isFavorite ? colors.error : colors.textSecondary,
          }}
        >
          <Heart
            className={`h-4 w-4 transition-all ${isFavorite ? 'fill-red-500' : ''}`}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="Chia sẻ"
          className="rounded-lg h-9 w-9 transition-all"
          style={{
            color: colors.textSecondary,
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Info Cards */}
      <div 
        className="grid grid-cols-3 gap-2 pt-4 border-t"
        style={{ borderColor: colors.border }}
      >
        {[
          {
            icon: Truck,
            title: 'Giao hàng',
            desc: '2-3 ngày',
          },
          {
            icon: ShieldCheck,
            title: 'Bảo hành',
            desc: '6 tháng',
          },
          {
            icon: RefreshCw,
            title: 'Đổi trả',
            desc: '7 ngày',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
            }}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" style={{ color: colors.textSecondary }} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs" style={{ color: colors.text }}>
                {item.title}
              </p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
