'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Truck, HandCoins, Headphones, Award } from 'lucide-react'
import { JSX } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { getTextEmbossShadow } from '@/common/constants/neumorphism'
import { SectionBadge } from '@/components/common'

type FeatureItem = {
  icon: JSX.Element
  title: string
}

const Features = () => {
  const { theme } = useTheme()
  const textEmbossShadow = getTextEmbossShadow(theme)
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


  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-visible">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-primary/5 rounded-3xl blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-16 relative">
          <SectionBadge icon={Award} text="Cam kết dịch vụ" className="mb-6" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-foreground"
            style={{
              textShadow: textEmbossShadow,
            }}
          >
            CAM KẾT DỊCH VỤ CỦA CHÚNG TÔI
          </motion.h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 p-2">
          {featureList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
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
                <p 
                  className="font-black text-center text-base sm:text-lg text-foreground leading-tight min-h-[48px] flex items-center justify-center"
                  style={{
                    textShadow: textEmbossShadow,
                  }}
                >
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
