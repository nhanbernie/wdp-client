'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Sparkles, Truck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { getTextEmbossShadow, getNeumorphismTrustBadgeShadow } from '@/common/constants/neumorphism'
import { SectionBadge } from '@/components/common'
import { useRouter } from 'next/navigation'

const Banner = () => {
  const { theme } = useTheme()
  const router = useRouter()

  // Text emboss shadow for 3D floating effect
  const textEmbossShadow = getTextEmbossShadow(theme)
  
  // Neumorphism shadow for trust badges
  const trustBadgeNeumorphismShadow = getNeumorphismTrustBadgeShadow(theme)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-visible">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative flex flex-col items-center gap-10">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Hero Badge */}
          <SectionBadge
            icon={Zap}
            text="Công nghệ AI tiên tiến"
            animationType="animate"
          />

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-black text-5xl lg:text-7xl text-center max-w-5xl leading-tight text-foreground"
            style={{
              textShadow: textEmbossShadow,
            }}
          >
            Nền tảng mua sắm{' '}
            <span className="relative inline-block">
              <span 
                className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary), var(--accent-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: textEmbossShadow,
                  filter: theme === 'dark' 
                    ? 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))'
                    : 'drop-shadow(1px 1px 2px rgba(244, 168, 0, 0.2))',
                }}
              >
                vật liệu xây dựng
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-full" />
            </span>{' '}
            thông minh
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            AICShop giúp nhà thầu và thợ xây tìm kiếm, so sánh và đặt mua vật liệu xây dựng với sự hỗ
            trợ của AI. Tiết kiệm thời gian và tối ưu chi phí.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row text-lg gap-4 mt-4 p-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push('/categories')}
                className="relative overflow-hidden group cursor-pointer bg-accent-primary hover:bg-accent-secondary text-white font-bold px-8 py-7 text-lg rounded-2xl shadow-2xl shadow-accent-primary/50 border-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Bắt đầu mua sắm
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Button>
            </motion.div>

            <div>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer font-bold px-8 py-7 text-lg rounded-2xl bg-card border-0 hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-300 shadow-xl"
              >
                <Sparkles className="h-6 w-6 mr-2 text-accent-primary" />
                Xem demo AI
              </Button>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 p-4"
          >
            {[
              { icon: Shield, text: 'Bảo mật quốc gia' },
              { icon: Truck, text: 'Giao hàng toàn quốc' },
              { icon: Sparkles, text: 'Tư vấn AI 24/7' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div
                  className={`flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 ${
                    theme === 'dark' ? 'bg-card' : 'bg-white'
                  }`}
                  style={{
                    boxShadow: trustBadgeNeumorphismShadow,
                  }}
                >
                  <div className="p-2 rounded-xl bg-accent-primary">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`font-bold ${theme === 'dark' ? 'text-foreground' : 'text-gray-900'}`}>
                    {item.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Banner
