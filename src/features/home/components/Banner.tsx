'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Sparkles, Truck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <div className="relative flex flex-col items-center py-20 lg:py-32 gap-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-200/40 via-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/50 shadow-lg shadow-indigo-200/50">
          <Zap className="h-5 w-5 text-indigo-600" />
          <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Công nghệ AI tiên tiến
          </span>
        </div>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-black text-5xl lg:text-7xl text-center max-w-5xl leading-tight"
      >
        Nền tảng mua sắm{' '}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            vật liệu xây dựng
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full" />
        </span>{' '}
        thông minh
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center text-xl lg:text-2xl text-slate-600 max-w-3xl leading-relaxed"
      >
        AICShop giúp nhà thầu và thợ xây tìm kiếm, so sánh và đặt mua vật liệu xây dựng với sự hỗ
        trợ của AI. Tiết kiệm thời gian và tối ưu chi phí.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row text-lg gap-4 mt-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="relative overflow-hidden group cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-indigo-500/50 border-2 border-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Bắt đầu mua sắm
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer font-bold px-8 py-7 text-lg rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 shadow-xl"
          >
            <Sparkles className="h-6 w-6 mr-2 text-indigo-600" />
            Xem demo AI
          </Button>
        </motion.div>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        {[
          { icon: Shield, text: 'Bảo mật quốc gia', gradient: 'from-emerald-500 to-teal-500' },
          { icon: Truck, text: 'Giao hàng toàn quốc', gradient: 'from-indigo-500 to-purple-500' },
          { icon: Sparkles, text: 'Tư vấn AI 24/7', gradient: 'from-pink-500 to-rose-500' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${item.gradient}`}>
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-slate-700">{item.text}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Banner
