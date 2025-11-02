'use client'

import { useState } from 'react'
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
import { motion } from 'framer-motion'

interface ProductQuantityProps {
  stock?: number
  colors: any
  productId?: string
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({ stock, colors, productId }) => {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart, isAddingToCart } = useCartApi()

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, Math.min(stock ?? 9999, prev + change)))
  }

  const handleAddToCart = async () => {
    if (!productId) {
      console.error('Product ID is required to add to cart')
      return
    }

    await addToCart(productId, quantity)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-8"
    >
      {/* Stock Badge - Ultra Premium */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-lg"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
            Còn hàng
          </span>
          <span className="text-base font-black text-emerald-700">
            {stock && stock > 0 ? stock : 'N/A'} sản phẩm có sẵn
          </span>
        </div>
      </motion.div>

      {/* Quantity Selector - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <label className="text-lg font-black text-slate-900 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Package className="h-5 w-5 text-white" />
          </div>
          Chọn số lượng
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-2xl border-2 border-slate-300 bg-white shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="h-14 w-14 hover:bg-slate-100 rounded-xl transition-all hover:scale-110 disabled:opacity-50"
            >
              <Minus className="h-5 w-5 text-slate-700" />
            </Button>
            <div className="px-8 py-3 min-w-[100px] text-center">
              <span className="text-3xl font-black text-slate-900">{quantity}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (stock ?? 9999)}
              className="h-14 w-14 hover:bg-slate-100 rounded-xl transition-all hover:scale-110 disabled:opacity-50"
            >
              <Plus className="h-5 w-5 text-slate-700" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <Button
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl h-16 text-lg font-black shadow-2xl shadow-indigo-300 hover:shadow-indigo-400 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAddingToCart || !productId}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

          <ShoppingCart className="h-6 w-6 mr-3 relative z-10" />
          <span className="relative z-10">
            {isAddingToCart ? 'Đang thêm vào giỏ...' : 'Thêm vào giỏ hàng'}
          </span>
        </Button>

        {productId && <RequestQuoteButton productId={productId} />}
      </motion.div>

      {/* Extra Actions - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3"
      >
        <Button
          variant="outline"
          size="icon"
          title="Yêu thích"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`rounded-2xl h-14 w-14 border-2 transition-all duration-300 hover:scale-110 ${
            isFavorite
              ? 'bg-red-50 border-red-300 text-red-500 shadow-lg shadow-red-200'
              : 'hover:bg-red-50 hover:border-red-300'
          }`}
        >
          <Heart
            className={`h-6 w-6 transition-all ${isFavorite ? 'fill-red-500 scale-110' : ''}`}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="Chia sẻ"
          className="rounded-2xl h-14 w-14 border-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:scale-110"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Info Cards - Ultra Premium */}
      <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-slate-200">
        {[
          {
            icon: Truck,
            title: 'Giao hàng',
            desc: '2-3 ngày',
            color: 'from-blue-500 via-cyan-500 to-blue-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-200',
          },
          {
            icon: ShieldCheck,
            title: 'Bảo hành',
            desc: '6 tháng',
            color: 'from-emerald-500 via-teal-500 to-emerald-500',
            bgColor: 'from-emerald-50 to-teal-50',
            borderColor: 'border-emerald-200',
          },
          {
            icon: RefreshCw,
            title: 'Đổi trả',
            desc: '7 ngày',
            color: 'from-purple-500 via-pink-500 to-purple-500',
            bgColor: 'from-purple-50 to-pink-50',
            borderColor: 'border-purple-200',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${item.bgColor} border-2 ${item.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden`}
          >
            {/* Decorative blob */}
            <div
              className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            ></div>

            <div
              className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon className="h-7 w-7 text-white" />
            </div>
            <div className="text-center relative z-10">
              <p className="font-black text-sm text-slate-900 mb-1">{item.title}</p>
              <p className="text-xs text-slate-600 font-bold">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
