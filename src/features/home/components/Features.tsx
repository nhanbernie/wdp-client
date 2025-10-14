'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Truck, HandCoins, Headphones } from 'lucide-react'
import { JSX } from 'react'

type FeatureItem = {
  icon: JSX.Element
  title: string
}

const Features = () => {
  const featureList: FeatureItem[] = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-[var(--primary)]" />,
      title: 'CHẾ ĐỘ BẢO HÀNH',
    },
    { icon: <Truck className="w-8 h-8 text-[var(--primary)]" />, title: 'VẬN CHUYỂN MIỄN PHÍ' },
    {
      icon: <HandCoins className="w-8 h-8 text-[var(--primary)]" />,
      title: 'THANH TOÁN KHI NHẬN HÀNG',
    },
    {
      icon: <Headphones className="w-8 h-8 text-[var(--primary)]" />,
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
      transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
    }),
  }

  return (
    <div className="py-12 sm:py-16 mx-[var(--header-horizontal-padding)]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-8"
        >
          CAM KẾT DỊCH VỤ CỦA CHÚNG TÔI
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {featureList.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl bg-[var(--card-background)] shadow-sm hover:shadow-md transition"
            >
              {item.icon}
              <p className="font-semibold text-center text-sm sm:text-base md:text-lg text-gray-800">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
