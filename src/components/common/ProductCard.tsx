'use client'
import { calculateDiscountPercentage, formatCurrency } from '@/lib/utils'
import { ProductDto } from '@/services/api/product.type'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Heart, Zap } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {
  data: ProductDto
}

const ProductCard = ({ data }: Props) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { colors } = useTheme()

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('application/json', JSON.stringify(data))
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="w-full h-full min-h-[420px] cursor-grab active:cursor-grabbing"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 0.95 : 1 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative flex flex-col"
        style={{
          backgroundColor: colors.cardBackground,
        }}
        onClick={() => router.push(`/products/${data.id}`)}
      >
        {/* Image Container */}
        <div className="flex-shrink-0 h-[252px] relative overflow-hidden rounded-t-2xl">
          {/* Discount Badge */}
          {data.salePrice && (
            <div
              className="absolute z-20 top-4 left-4 rounded-full px-3 py-1.5 text-white shadow-lg"
              style={{ backgroundColor: colors.error }}
            >
              <div className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" fill="currentColor" />
                <p className="text-xs font-bold">
                  -{calculateDiscountPercentage(data.price, data.salePrice)}%
                </p>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 top-4 right-4 flex flex-col gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                // Handle wishlist
              }}
              className="p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-accent-primary hover:text-white"
              style={{
                backgroundColor: colors.cardBackground,
                color: colors.text,
              }}
            >
              <Heart className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                // Handle quick view
              }}
              className="p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-accent-primary hover:text-white"
              style={{
                backgroundColor: colors.cardBackground,
                color: colors.text,
              }}
            >
              <Eye className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Product Image */}
          <Image
            src={data.thumbnail || '/images/placeholders/category-default.png'}
            alt={data.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        {/* Content Container */}
        <div
          className="flex-1 min-h-0 p-5 flex flex-col justify-between rounded-b-3xl"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <div className="space-y-2.5 flex-shrink-0">
            {/* Brand Badge */}
            <div
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${colors.accent}15`,
                color: colors.accent,
              }}
            >
              {data.brand}
            </div>

            {/* Product Name */}
            <h2
              className="font-semibold text-base line-clamp-2 transition-colors duration-200 group-hover:text-accent-primary"
              style={{ color: colors.text }}
            >
              {data.name}
            </h2>

            {/* Stock Info */}
            {data.stock?.quantity > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.success }}
                />
                <p className="font-medium" style={{ color: colors.textSecondary }}>
                  Còn {data.stock.quantity} {data.stock.unit}
                </p>
              </div>
            )}
          </div>

          {/* Price Container */}
          <div className="flex items-end justify-between pt-3 mt-auto flex-shrink-0">
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              {data.salePrice ? (
                <>
                  <span
                    className="text-xs line-through font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    {formatCurrency(data.price, data.currency)}
                  </span>
                  <span className="text-xl font-bold" style={{ color: colors.accent }}>
                    {formatCurrency(data.salePrice, data.currency)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold" style={{ color: colors.accent }}>
                  {formatCurrency(data.price, data.currency)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: colors.accentSecondary }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                // Handle add to cart
              }}
              className="p-2.5 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ backgroundColor: colors.accent }}
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductCard
