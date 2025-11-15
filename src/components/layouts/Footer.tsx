'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Heart, ArrowUp } from 'lucide-react'
import { Logo } from '@/components/common'
import { useTheme } from '@/contexts/ThemeContext'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'

const Footer = () => {
  const { theme } = useTheme()
  const neumorphismShadow = getNeumorphismShadow(theme)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    shopping: [
      { label: 'Danh mục sản phẩm', href: '/categories' },
      { label: 'Tìm kiếm', href: '/search' },
      { label: 'Giỏ hàng', href: '/cart' },
    ],
    account: [
      { label: 'Tài khoản', href: '/profile' },
      { label: 'Đơn hàng', href: '/orders' },
      { label: 'Yêu cầu báo giá', href: '/quote-requests' },
      { label: 'Địa chỉ', href: '/addresses' },
    ],
  }

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Logo showText={true} />
              <p className="mt-6 text-base leading-7 max-w-xs text-muted-foreground font-medium">
                Nền tảng mua sắm vật liệu xây dựng thông minh với sự hỗ trợ của AI. Tìm kiếm, so sánh và đặt mua vật liệu xây dựng chất lượng cao từ các nhà cung cấp uy tín.
              </p>
            </motion.div>
          </div>

          {/* Shopping Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-black mb-6 text-foreground">
              Mua sắm
            </h3>
            <ul className="space-y-4">
              {footerLinks.shopping.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-accent-primary transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Account Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-black mb-6 text-foreground">
              Tài khoản
            </h3>
            <ul className="space-y-4">
              {footerLinks.account.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-accent-primary transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-base font-medium text-muted-foreground flex items-center gap-2">
            © 2024 AICShop. Được tạo với{' '}
            <Heart className="w-4 h-4 text-error fill-error" /> Bảo lưu mọi quyền.
          </p>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-accent-primary hover:bg-accent-secondary text-white shadow-2xl hover:shadow-accent-primary/50 transition-all duration-300 flex items-center justify-center z-50"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  )
}

export default Footer
