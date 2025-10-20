'use client'
import { calculateDiscountPercentage, formatCurrency } from '@/lib/utils'
import { ProductDto } from '@/services/api/product.type'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Heart, Zap } from 'lucide-react'
import { useState } from 'react'

type Props = {
  data: ProductDto
}

const ProductCard = ({ data }: Props) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-[420px] cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:border-purple-400 relative"
      onClick={() => router.push(`/products/${data.id}`)}
    >
      {/* Image Container */}
      <div className="h-3/5 relative overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
        {/* Discount Badge */}
        {data.salePrice && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute z-20 top-3 left-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full px-3 py-1.5 text-white shadow-lg"
          >
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" fill="currentColor" />
              <p className="text-sm font-black">
                -{calculateDiscountPercentage(data.price, data.salePrice)}%
              </p>
            </div>
          </motion.div>
        )}

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 top-3 right-3 flex flex-col gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200"
          >
            <Heart className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200"
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

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
        />
      </div>

      {/* Content Container */}
      <div className="h-2/5 p-4 flex flex-col justify-between bg-gradient-to-br from-white to-purple-50/30">
        <div className="space-y-2">
          {/* Brand Badge */}
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-blue-100 to-purple-100 border-purple-300 text-purple-700 font-bold text-xs"
          >
            ✨ {data.brand}
          </Badge>

          {/* Product Name */}
          <h1 className="font-bold text-base line-clamp-2 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200">
            {data.name}
          </h1>

          {/* Stock Info */}
          {data.stock?.quantity > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-green-600 font-semibold">
                Còn {data.stock.quantity} {data.stock.unit}
              </p>
            </div>
          )}
        </div>

        {/* Price Container */}
        <div className="flex items-end justify-between pt-2 border-t-2 border-purple-200/50">
          <div className="flex flex-col gap-1">
            {data.salePrice ? (
              <>
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatCurrency(data.price, data.currency)}
                </span>
                <span className="text-lg font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {formatCurrency(data.salePrice, data.currency)}
                </span>
              </>
            ) : (
              <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(data.price, data.currency)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
