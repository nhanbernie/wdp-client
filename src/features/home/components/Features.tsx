'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Truck, HandCoins, Headphones, Award } from 'lucide-react'
import { JSX } from 'react'

type FeatureItem = {
  icon: JSX.Element
  title: string
  gradient: string
}

const Features = () => {
  const featureList: FeatureItem[] = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-white" />,
      title: 'CHẾ ĐỘ BẢO HÀNH',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: 'VẬN CHUYỂN MIỄN PHÍ',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <HandCoins className="w-8 h-8 text-white" />,
      title: 'THANH TOÁN KHI NHẬN HÀNG',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Headphones className="w-8 h-8 text-white" />,
      title: 'CHĂM SÓC KHÁCH HÀNG 24H',
      gradient: 'from-pink-500 to-rose-500',
    },
  ]

  // Animation variants
  const itemVariants: Record<string, any> = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="py-16 sm:py-24 mx-[var(--header-horizontal-padding)] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 rounded-3xl blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/50 shadow-lg mb-6"
          >
            <Award className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cam kết dịch vụ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent"
          >
            CAM KẾT DỊCH VỤ CỦA CHÚNG TÔI
          </motion.h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featureList.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative flex flex-col items-center justify-center gap-5 p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-indigo-300 transition-all duration-500 overflow-hidden">
                {/* Icon container with gradient */}
                <div
                  className={`relative p-5 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  {item.icon}
                  {/* Icon glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                  />
                </div>

                {/* Title */}
                <p className="font-black text-center text-base sm:text-lg text-slate-800 leading-tight">
                  {item.title}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Bottom gradient indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
