'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Truck, HandCoins, Headphones, Award } from 'lucide-react'
import { JSX } from 'react'

type FeatureItem = {
  icon: JSX.Element
  title: string
}

const Features = () => {
  const featureList: FeatureItem[] = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-white" />,
      title: 'CHẾ ĐỘ BẢO HÀNH',
    },
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: 'VẬN CHUYỂN MIỄN PHÍ',
    },
    {
      icon: <HandCoins className="w-8 h-8 text-white" />,
      title: 'THANH TOÁN KHI NHẬN HÀNG',
    },
    {
      icon: <Headphones className="w-8 h-8 text-white" />,
      title: 'CHĂM SÓC KHÁCH HÀNG 24H',
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
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-visible">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 rounded-3xl blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary/10 border border-accent-primary/30 shadow-lg mb-6"
          >
            <Award className="h-5 w-5 text-accent-primary" />
            <span className="text-sm font-bold text-accent-primary">
              Cam kết dịch vụ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-foreground"
          >
            CAM KẾT DỊCH VỤ CỦA CHÚNG TÔI
          </motion.h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-2">
          {featureList.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative w-full"
            >
              <div className="relative flex flex-col items-center justify-center gap-5 p-8 rounded-3xl bg-card border border-border shadow-xl hover:shadow-2xl hover:border-accent-primary transition-all duration-500 w-full h-full min-h-[220px]">
                {/* Icon container */}
                <div className="relative p-5 rounded-2xl bg-accent-primary shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                  {item.icon}
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-accent-primary blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                </div>

                {/* Title */}
                <p className="font-black text-center text-base sm:text-lg text-foreground leading-tight min-h-[48px] flex items-center justify-center">
                  {item.title}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Bottom gradient indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
