'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, MapPin, ShoppingCart, Loader2 } from 'lucide-react'
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
import { useTheme } from '@/contexts/ThemeContext'

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
  const { colors } = useTheme()

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

  // Fix placeholder color for all inputs
  useEffect(() => {
    const styleId = 'checkout-input-placeholder-style'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      #shippingName::placeholder,
      #shippingPhone::placeholder,
      #shippingAddress::placeholder,
      #shippingWard::placeholder,
      #shippingDistrict::placeholder,
      #shippingCity::placeholder,
      #customerNotes::placeholder {
        color: ${colors.textSecondary};
        opacity: 0.6;
      }
    `

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors.textSecondary])

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
    },
    {
      value: 'bank_transfer',
      label: 'Chuyển khoản ngân hàng (PayOS)',
    },
    {
      value: 'credit_card',
      label: 'Thẻ tín dụng/Ghi nợ',
    },
    {
      value: 'e_wallet',
      label: 'Ví điện tử',
    },
  ]

  // Trạng thái loading
  if (isLoadingCart) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto relative z-10 py-12 px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
          </div>
        </div>
      </div>
    )
  }

  // Trạng thái giỏ hàng trống
  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto relative z-10 py-12 px-6">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textSecondary }} />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>Giỏ hàng trống</h1>
            <p className="mb-8" style={{ color: colors.textSecondary }}>
              Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá các sản phẩm của chúng tôi!
            </p>
            <Link href="/categories">
              <Button className="gap-2" style={{ backgroundColor: colors.accent }}>
                <ShoppingCart className="w-5 h-5" />
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Giao diện chính
  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto relative z-10 py-6 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" style={{ 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.text 
              }}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
                {/* <ShoppingCart className="w-6 h-6" style={{ color: colors.textSecondary }} /> */}
                Thanh toán
              </h1>
              <p style={{ color: colors.textSecondary }}>Hoàn tất đơn hàng của bạn</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cột thông tin (trái) */}
              <div className="lg:col-span-2 space-y-4">
                {/* 1. Thông tin giao hàng */}
                <Card style={{ 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border 
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
                      <MapPin className="h-5 w-5" style={{ color: colors.textSecondary }} />
                      Thông tin giao hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shippingName" style={{ color: colors.text }}>
                            Họ và tên <span style={{ color: colors.error }}>*</span>
                          </Label>
                                                     <Input
                             id="shippingName"
                             value={formData.shippingName}
                             onChange={(e) => handleInputChange('shippingName', e.target.value)}
                             required
                             placeholder="Nhập họ và tên đầy đủ"
                             style={{
                               backgroundColor: colors.cardBackground,
                               borderColor: `${colors.border}60`,
                               color: colors.text,
                             }}
                             className="focus:ring-2 focus:ring-offset-1"
                             onFocus={(e) => {
                               e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                               e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                               e.currentTarget.style.borderColor = colors.accent
                             }}
                             onBlur={(e) => {
                               e.currentTarget.style.borderColor = `${colors.border}60`
                             }}
                           />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingPhone" style={{ color: colors.text }}>
                            Số điện thoại <span style={{ color: colors.error }}>*</span>
                          </Label>
                                                     <Input
                             id="shippingPhone"
                             type="tel"
                             value={formData.shippingPhone}
                             onChange={(e) => handleInputChange('shippingPhone', e.target.value)}
                             required
                             placeholder="Nhập số điện thoại"
                             style={{
                               backgroundColor: colors.cardBackground,
                               borderColor: `${colors.border}60`,
                               color: colors.text,
                             }}
                             className="focus:ring-2 focus:ring-offset-1"
                             onFocus={(e) => {
                               e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                               e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                               e.currentTarget.style.borderColor = colors.accent
                             }}
                             onBlur={(e) => {
                               e.currentTarget.style.borderColor = `${colors.border}60`
                             }}
                           />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shippingAddress" style={{ color: colors.text }}>
                          Địa chỉ chi tiết <span style={{ color: colors.error }}>*</span>
                        </Label>
                                                 <Input
                           id="shippingAddress"
                           value={formData.shippingAddress}
                           onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                           required
                           placeholder="Số nhà, tên đường..."
                           style={{
                             backgroundColor: colors.cardBackground,
                             borderColor: `${colors.border}60`,
                             color: colors.text,
                           }}
                           className="focus:ring-2 focus:ring-offset-1"
                           onFocus={(e) => {
                             e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                             e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                             e.currentTarget.style.borderColor = colors.accent
                           }}
                           onBlur={(e) => {
                             e.currentTarget.style.borderColor = `${colors.border}60`
                           }}
                         />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shippingWard" style={{ color: colors.text }}>Phường/Xã</Label>
                                                     <Input
                             id="shippingWard"
                             value={formData.shippingWard}
                             onChange={(e) => handleInputChange('shippingWard', e.target.value)}
                             placeholder="Phường/Xã"
                             style={{
                               backgroundColor: colors.cardBackground,
                               borderColor: `${colors.border}60`,
                               color: colors.text,
                             }}
                             className="focus:ring-2 focus:ring-offset-1"
                             onFocus={(e) => {
                               e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                               e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                               e.currentTarget.style.borderColor = colors.accent
                             }}
                             onBlur={(e) => {
                               e.currentTarget.style.borderColor = `${colors.border}60`
                             }}
                           />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingDistrict" style={{ color: colors.text }}>Quận/Huyện</Label>
                                                     <Input
                             id="shippingDistrict"
                             value={formData.shippingDistrict}
                             onChange={(e) => handleInputChange('shippingDistrict', e.target.value)}
                             placeholder="Quận/Huyện"
                             style={{
                               backgroundColor: colors.cardBackground,
                               borderColor: `${colors.border}60`,
                               color: colors.text,
                             }}
                             className="focus:ring-2 focus:ring-offset-1"
                             onFocus={(e) => {
                               e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                               e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                               e.currentTarget.style.borderColor = colors.accent
                             }}
                             onBlur={(e) => {
                               e.currentTarget.style.borderColor = `${colors.border}60`
                             }}
                           />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingCity" style={{ color: colors.text }}>Tỉnh/Thành phố</Label>
                                                     <Input
                             id="shippingCity"
                             value={formData.shippingCity}
                             onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                             placeholder="Tỉnh/Thành phố"
                             style={{
                               backgroundColor: colors.cardBackground,
                               borderColor: `${colors.border}60`,
                               color: colors.text,
                             }}
                             className="focus:ring-2 focus:ring-offset-1"
                             onFocus={(e) => {
                               e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                               e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                               e.currentTarget.style.borderColor = colors.accent
                             }}
                             onBlur={(e) => {
                               e.currentTarget.style.borderColor = `${colors.border}60`
                             }}
                           />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerNotes" style={{ color: colors.text }}>Ghi chú đơn hàng (tùy chọn)</Label>
                                                 <Textarea
                           id="customerNotes"
                           value={formData.customerNotes}
                           onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                           placeholder="Ghi chú thêm cho người giao hàng..."
                           className="min-h-[100px] resize-none focus:ring-2 focus:ring-offset-1"
                           style={{
                             backgroundColor: colors.cardBackground,
                             borderColor: `${colors.border}60`,
                             color: colors.text,
                           }}
                           onFocus={(e) => {
                             e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                             e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                             e.currentTarget.style.borderColor = colors.accent
                           }}
                           onBlur={(e) => {
                             e.currentTarget.style.borderColor = `${colors.border}60`
                           }}
                         />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Phương thức thanh toán */}
                <Card style={{ 
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border 
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
                      <CreditCard className="h-5 w-5" style={{ color: colors.textSecondary }} />
                      Phương thức thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <label key={method.value} className="relative cursor-pointer">
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
                          <div 
                            className="p-4 rounded-lg border cursor-pointer transition-all duration-200 peer-checked:bg-card-secondary"
                            style={{
                              borderColor: formData.paymentMethod === method.value ? colors.accent : colors.border,
                              backgroundColor: formData.paymentMethod === method.value 
                                ? `${colors.accent}10` 
                                : colors.cardBackground,
                            }}
                            onMouseEnter={(e) => {
                              if (formData.paymentMethod !== method.value) {
                                e.currentTarget.style.backgroundColor = colors.hoverBackground
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.paymentMethod !== method.value) {
                                e.currentTarget.style.backgroundColor = colors.cardBackground
                              }
                            }}
                          >
                            <span className="font-medium" style={{ color: colors.text }}>{method.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cột tóm tắt đơn hàng (phải) */}
              <div className="lg:col-span-1">
                <Card 
                  className="sticky top-24"
                  style={{ 
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border 
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: colors.text }}>
                      Đơn hàng ({cart.items.length} sản phẩm)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Danh sách sản phẩm */}
                    <div className="max-h-80 space-y-3 overflow-y-auto">
                      {cart.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg"
                          style={{
                            backgroundColor: colors.cardBackgroundSecondary,
                          }}
                        >
                          <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.product.images?.[0] || '/placeholder.svg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <div 
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: colors.accent }}
                            >
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm line-clamp-2 mb-1" style={{ color: colors.text }}>
                              {item.product.name}
                            </h3>
                            <p className="text-sm font-bold" style={{ color: colors.text }}>
                              {formatPrice(item.totalPrice)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '1rem' }} />

                    {/* Chi tiết giá */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.textSecondary }}>Tạm tính</span>
                        <span className="font-bold" style={{ color: colors.text }}>{formatPrice(cart.subtotal)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.textSecondary }}>Phí vận chuyển</span>
                        <span className="font-bold" style={{ color: colors.success }}>Miễn phí</span>
                      </div>

                      <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '0.75rem' }} />

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold" style={{ color: colors.text }}>Tổng cộng</span>
                        <span className="text-2xl font-bold" style={{ color: colors.text }}>
                          {formatPrice(cart.total)}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base gap-2"
                      style={{ 
                        backgroundColor: colors.textSecondary,
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = colors.text
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = colors.textSecondary
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Xác nhận đặt hàng
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CheckoutPage
