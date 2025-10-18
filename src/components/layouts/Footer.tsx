'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Github, X, Linkedin, Mail, Sparkles, Heart, ArrowUp } from 'lucide-react'
import { Logo } from '@/components/common'
import { useTheme } from '@/contexts/ThemeContext'

const Footer = () => {
  const { colors } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API', href: '/api' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Status', href: '/status' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: X, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
  ]

  return (
    <footer className="relative border-t-2 border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
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
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Logo showText={true} />
              <p className="mt-6 text-base leading-7 max-w-xs text-slate-600 font-medium">
                Premium construction materials and building supplies for your projects. Quality you
                can trust, service you can rely on.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-white border-2 border-slate-200 hover:border-indigo-300 hover:shadow-xl text-slate-700 hover:text-white relative overflow-hidden group"
                    aria-label={social.label}
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <social.icon size={20} className="relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Product
            </h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-0 h-0 group-hover:w-2 group-hover:h-2 rounded-full bg-indigo-500 transition-all duration-300" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Legal
            </h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-medium text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Stay Updated
                </h3>
              </div>
              <p className="text-slate-600 font-medium">
                Subscribe to our newsletter for the latest updates and exclusive offers
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-200 outline-none transition-all duration-300 font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10">Subscribe</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <p className="text-base font-medium text-slate-600 flex items-center gap-2">
            © 2024 Viral Predictor. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-base font-bold text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-base font-bold text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              Terms
            </a>
          </div>
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
        className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center z-50"
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  )
}

export default Footer
