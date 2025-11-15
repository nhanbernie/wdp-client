'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Gift, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NewsletterSignupSection = () => {
  const router = useRouter()
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 mb-20 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary p-12 lg:p-16 shadow-2xl shadow-accent-primary/50 max-w-7xl mx-auto"
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/30 dark:bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/30 dark:bg-white/20 rounded-full blur-3xl" />

        {/* Floating icons decoration */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-20 p-4 rounded-2xl bg-white/40 dark:bg-white/20 backdrop-blur-sm border border-white/50 dark:border-white/30"
        >
          <Gift className="h-8 w-8 text-foreground dark:text-white drop-shadow-md" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-10 left-20 p-4 rounded-2xl bg-white/40 dark:bg-white/20 backdrop-blur-sm border border-white/50 dark:border-white/30"
        >
          <Bell className="h-8 w-8 text-foreground dark:text-white drop-shadow-md" />
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left side - Text content */}
          <div className="text-foreground dark:text-white drop-shadow-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/30 backdrop-blur-sm border border-white/60 dark:border-white/40 mb-6"
            >
              <Mail className="h-5 w-5 text-foreground dark:text-white" />
              <span className="text-sm font-bold text-foreground dark:text-white">Newsletter</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl lg:text-4xl font-black mb-4 leading-tight text-foreground dark:text-white drop-shadow-md"
            >
              ĐĂNG KÝ
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-foreground dark:text-white leading-relaxed drop-shadow-sm"
            >
              Hãy đăng ký để mua những vật liệu chất lượng và ưu đãi nhất
            </motion.p>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 space-y-3"
            >
              {['Giảm giá 10% cho đơn đầu tiên', 'Thông tin sản phẩm mới', 'Ưu đãi độc quyền'].map(
                (benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-white/50 dark:bg-white/30">
                      <div className="w-2 h-2 rounded-full bg-foreground dark:bg-white" />
                    </div>
                    <span className="text-foreground dark:text-white drop-shadow-sm">{benefit}</span>
                  </div>
                ),
              )}
            </motion.div>
          </div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="p-8 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-2xl">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  {/* <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" /> */}
                  {/* <Input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    className="pl-12 h-14 rounded-2xl border-2 border-white/50 bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:border-white text-lg text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  /> */}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full h-14 rounded-2xl bg-white text-accent-primary hover:bg-white/90 font-bold text-lg shadow-xl cursor-pointer group"
                    onClick={() => router.push('/register')}
                  >
                    Đăng ký ngay
                    <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>

                <p className="text-center text-sm text-foreground/90 dark:text-white/90 mt-2 drop-shadow-sm">
                  Bằng việc đăng ký, bạn đồng ý với{' '}
                  <span className="underline cursor-pointer hover:text-foreground dark:hover:text-white font-semibold">
                    điều khoản dịch vụ
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default NewsletterSignupSection
