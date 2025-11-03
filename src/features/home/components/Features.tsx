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
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 p-2">
          {featureList.map((item, index) => (
            <div key={index} className="relative w-full">
              <div
                className={`relative flex flex-col items-center justify-center gap-5 p-8 rounded-3xl bg-card w-full h-full min-h-[220px] ${
                  theme === 'light'
                    ? 'border-0 shadow-2xl'
                    : 'border border-border shadow-xl'
                }`}
                style={
                  theme === 'light'
                    ? {
                        boxShadow:
                          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -4px 6px -1px rgba(0, 0, 0, 0.02)',
                      }
                    : undefined
                }
              >
                {/* Icon container */}
                <div className="relative p-5 rounded-2xl bg-accent-primary shadow-lg flex-shrink-0">
                  {item.icon}
                </div>

                {/* Title */}
                <p className="font-black text-center text-base sm:text-lg text-foreground leading-tight min-h-[48px] flex items-center justify-center">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
