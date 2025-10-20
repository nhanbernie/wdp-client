'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
  Banknote,
  Wallet,
  ShoppingCart,
  Sparkles,
  Shield,
  Truck,
  CheckCircle,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCartApi, useOrders } from '../hooks'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { usePayment } from '@/features/payment/hooks'

interface CheckoutFormData {
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card' | 'e_wallet'
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingDistrict: string
  shippingWard: string
  shippingPostalCode: string
  customerNotes: string
}

const CheckoutPage: React.FC = () => {
  const router = useRouter()
  const { cart, isLoadingCart, clearCart } = useCartApi()
  const { checkoutFromCart } = useOrders()
  const { createPayment } = usePayment()

  const [formData, setFormData] = useState<CheckoutFormData>({
    paymentMethod: 'cod',
    shippingName: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingDistrict: '',
    shippingWard: '',
    shippingPostalCode: '',
    customerNotes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<any>(null)

  // Giữ nguyên logic xử lý
  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cart?.items?.length) {
      return
    }
    setIsSubmitting(true)
    try {
      const order = await checkoutFromCart(formData)
      if (order) {
        setCreatedOrder(order)

        if (formData.paymentMethod === 'bank_transfer') {
          try {
            const payment = await createPayment({
              orderId: order.id,
              amount: Number(order.totalAmount),
              description: `Đơn hàng #${order.orderNumber}`,
            })

            if ((payment as any)?.data?.data?.payosData?.data?.checkoutUrl) {
              window.open((payment as any).data.data.payosData?.data?.checkoutUrl, '_blank')
              router.push(`/orders/${order.id}`)
            } else {
              console.error('No checkout URL found in payment response')
              router.push(`/orders/${order.id}`)
            }
          } catch (paymentError) {
            console.error('Payment creation failed:', paymentError)
            router.push(`/orders/${order.id}`)
          }
        } else {
          router.push(`/orders/${order.id}`)
        }
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price)
  }

  const paymentMethods = [
    {
      value: 'cod',
      label: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán tiền mặt khi nhận hàng',
      icon: <User className="h-7 w-7" />,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      value: 'bank_transfer',
      description: 'Chuyển khoản qua ngân hàng',
      color: 'from-blue-500 to-indigo-500',
      label: 'Chuyển khoản ngân hàng (PayOS)',
      icon: <Banknote className="h-6 w-6 text-muted-foreground" />,
    },
    {
      value: 'credit_card',
      label: 'Thẻ tín dụng/Ghi nợ',
      description: 'Visa, Mastercard, JCB...',
      icon: <CreditCard className="h-7 w-7" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      value: 'e_wallet',
      label: 'Ví điện tử',
      description: 'MoMo, ZaloPay, VNPay...',
      icon: <Wallet className="h-7 w-7" />,
      color: 'from-orange-500 to-red-500',
    },
  ]

  // Trạng thái loading
  if (isLoadingCart) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Animated Loading Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mb-8"
            >
              {/* Outer rotating circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500"
              />

              {/* Inner icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-3">
                Đang tải...
              </h3>
              <div className="flex items-center gap-2 text-slate-600">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-indigo-500"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-purple-500"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-pink-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Trạng thái giỏ hàng trống
  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Empty cart illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              {/* Background decoration */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200/50 via-purple-200/50 to-pink-200/50 blur-3xl"
              />

              {/* Main icon */}
              <div className="relative w-48 h-48 rounded-3xl flex items-center justify-center bg-white border-2 border-dashed border-slate-300 shadow-2xl">
                <ShoppingCart className="w-20 h-20 text-slate-400" />

                {/* Floating sparkle */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-4 -right-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center max-w-lg"
            >
              <h1 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Giỏ hàng trống
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá các sản phẩm tuyệt vời của chúng
                tôi!
              </p>

              {/* Action button */}
              <Link href="/categories">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Tiếp tục mua sắm
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Giao diện chính
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-6">
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
            </Link>

            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
                Thanh toán
              </h1>
              <p className="text-xl text-slate-600">Hoàn tất đơn hàng của bạn</p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-slate-900">Giỏ hàng</span>
            </div>

            <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-slate-900">Thanh toán</span>
            </div>

            <div className="flex-1 h-1 bg-slate-200 rounded-full" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-slate-400" />
              </div>
              <span className="font-bold text-slate-400">Hoàn tất</span>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cột thông tin (trái) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* 1. Thông tin giao hàng */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">Thông tin giao hàng</h2>
                      <p className="text-sm text-slate-600">
                        Vui lòng điền đầy đủ thông tin để chúng tôi có thể giao hàng
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Thông tin cá nhân */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                        Thông tin cá nhân
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="shippingName"
                            className="text-sm font-medium text-slate-700"
                          >
                            Họ và tên <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shippingName"
                            value={formData.shippingName}
                            onChange={(e) => handleInputChange('shippingName', e.target.value)}
                            required
                            className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                            placeholder="Nhập họ và tên đầy đủ"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="shippingPhone"
                            className="text-sm font-medium text-slate-700"
                          >
                            Số điện thoại <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shippingPhone"
                            type="tel"
                            value={formData.shippingPhone}
                            onChange={(e) => handleInputChange('shippingPhone', e.target.value)}
                            required
                            className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                            placeholder="Nhập số điện thoại"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Địa chỉ giao hàng */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                        Địa chỉ giao hàng
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="shippingAddress"
                            className="text-sm font-medium text-slate-700"
                          >
                            Địa chỉ chi tiết <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                            required
                            className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                            placeholder="Số nhà, tên đường, tên khu phố..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="shippingWard"
                              className="text-sm font-medium text-slate-700"
                            >
                              Phường/Xã
                            </Label>
                            <Input
                              id="shippingWard"
                              value={formData.shippingWard}
                              onChange={(e) => handleInputChange('shippingWard', e.target.value)}
                              className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                              placeholder="Phường/Xã"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="shippingDistrict"
                              className="text-sm font-medium text-slate-700"
                            >
                              Quận/Huyện
                            </Label>
                            <Input
                              id="shippingDistrict"
                              value={formData.shippingDistrict}
                              onChange={(e) =>
                                handleInputChange('shippingDistrict', e.target.value)
                              }
                              className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                              placeholder="Quận/Huyện"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="shippingCity"
                              className="text-sm font-medium text-slate-700"
                            >
                              Tỉnh/Thành phố
                            </Label>
                            <Input
                              id="shippingCity"
                              value={formData.shippingCity}
                              onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                              className="h-11 border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200"
                              placeholder="Tỉnh/Thành phố"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ghi chú */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                        Ghi chú bổ sung
                      </h3>
                      <div className="space-y-2">
                        <Label
                          htmlFor="customerNotes"
                          className="text-sm font-medium text-slate-700"
                        >
                          Ghi chú đơn hàng <span className="text-slate-400">(tùy chọn)</span>
                        </Label>
                        <Textarea
                          id="customerNotes"
                          value={formData.customerNotes}
                          onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                          placeholder="Ghi chú thêm cho người giao hàng (ví dụ: giao vào giờ hành chính, để ở cổng...)"
                          className="min-h-[100px] border-slate-300 focus:border-primary focus:ring-primary/20 transition-all duration-200 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Phương thức thanh toán */}
                <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                      <CreditCard className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">Phương thức thanh toán</h2>
                      <p className="text-slate-600">Chọn cách thanh toán phù hợp</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {paymentMethods.map((method, index) => (
                      <motion.label
                        key={method.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative group cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={(e) =>
                            handleInputChange('paymentMethod', e.target.value as any)
                          }
                          className="peer absolute opacity-0"
                        />
                        <div className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 peer-checked:border-orange-400 peer-checked:bg-orange-50 hover:bg-muted/50">
                          {method.icon}
                          <span className="font-medium">{method.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cột tóm tắt đơn hàng (phải) */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="sticky top-24"
              >
                <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-xl">
                      <ShoppingCart className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">Đơn hàng</h2>
                      <p className="text-slate-600">{cart.items.length} sản phẩm</p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="mb-8">
                    <div className="max-h-80 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                      {cart.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
                        >
                          {/* Product Image */}
                          <div className="relative h-20 w-20 rounded-xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
                            <Image
                              src={item.product.images?.[0] || '/placeholder.svg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />

                            {/* Quantity badge */}
                            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-black text-white shadow-lg border-2 border-white">
                              {item.quantity}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-slate-900 mb-1 line-clamp-2 leading-tight">
                              {item.product.name}
                            </h3>
                            <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                              {formatPrice(item.totalPrice)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

                  {/* Chi tiết giá */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-slate-600">
                      <span className="font-bold">Tạm tính</span>
                      <span className="text-xl font-black text-slate-900">
                        {formatPrice(cart.subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-slate-600">Phí vận chuyển</span>
                      </div>
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Miễn phí
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                    {/* Total */}
                    <div className="flex justify-between items-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200">
                      <div>
                        <p className="text-sm font-bold text-slate-600 mb-1">Tổng cộng</p>
                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                          {formatPrice(cart.total)}
                        </p>
                      </div>
                      <Sparkles className="w-10 h-10 text-purple-500" />
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                      <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-black text-emerald-900">
                        Thanh toán an toàn
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border-2 border-blue-200">
                      <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-xs font-black text-blue-900">Giao hàng nhanh</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full h-16 rounded-2xl font-black text-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shine effect */}
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

                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                          />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-6 h-6" />
                          Xác nhận đặt hàng
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #9333ea);
        }
      `}</style>
    </div>
  )
}

export default CheckoutPage
