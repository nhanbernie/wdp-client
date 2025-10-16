'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, MapPin, User, Banknote, Wallet, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCartApi, useOrders } from '../hooks'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // Thêm Image component của Next.js

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
        await clearCart()
        router.push(`/orders/${order.id}`)
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
      label: 'Thanh toán khi nhận hàng (COD)',
      icon: <User className="h-6 w-6 text-muted-foreground" />,
    },
    {
      value: 'bank_transfer',
      label: 'Chuyển khoản ngân hàng',
      icon: <Banknote className="h-6 w-6 text-muted-foreground" />,
    },
    {
      value: 'credit_card',
      label: 'Thẻ tín dụng/Ghi nợ',
      icon: <CreditCard className="h-6 w-6 text-muted-foreground" />,
    },
    {
      value: 'e_wallet',
      label: 'Ví điện tử',
      icon: <Wallet className="h-6 w-6 text-muted-foreground" />,
    },
  ]

  // Trạng thái loading
  if (isLoadingCart) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Trạng thái giỏ hàng trống
  if (!cart?.items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background pt-20 text-center">
        <ShoppingCart className="h-20 w-20 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-3">Giỏ hàng của bạn đang trống</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
        </p>
        <Link href="/categories">
          <Button size="lg">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    )
  }

  // Giao diện chính
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex items-center justify-center mb-8 lg:mb-12"
        >
          <Link href="/cart" className="absolute left-0">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-center">Hoàn tất đơn hàng</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Cột thông tin (trái) */}
            <div className="lg:col-span-7">
              <div className="space-y-8 rounded-lg border bg-card p-6 shadow-sm">
                {/* 1. Thông tin giao hàng */}
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
                    <MapPin className="h-6 w-6 text-primary" />
                    Thông tin giao hàng
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingName">Họ và tên *</Label>
                        <Input
                          id="shippingName"
                          value={formData.shippingName}
                          onChange={(e) => handleInputChange('shippingName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingPhone">Số điện thoại *</Label>
                        <Input
                          id="shippingPhone"
                          type="tel"
                          value={formData.shippingPhone}
                          onChange={(e) => handleInputChange('shippingPhone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="shippingAddress">Địa chỉ *</Label>
                      <Input
                        id="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shippingWard">Phường/Xã</Label>
                        <Input
                          id="shippingWard"
                          value={formData.shippingWard}
                          onChange={(e) => handleInputChange('shippingWard', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingDistrict">Quận/Huyện</Label>
                        <Input
                          id="shippingDistrict"
                          value={formData.shippingDistrict}
                          onChange={(e) => handleInputChange('shippingDistrict', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingCity">Tỉnh/Thành phố</Label>
                        <Input
                          id="shippingCity"
                          value={formData.shippingCity}
                          onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="customerNotes">Ghi chú đơn hàng (tùy chọn)</Label>
                      <Textarea
                        id="customerNotes"
                        value={formData.customerNotes}
                        onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                        placeholder="Ghi chú thêm cho người giao hàng..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-border/50" />

                {/* 2. Phương thức thanh toán */}
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
                    <CreditCard className="h-6 w-6 text-primary" />
                    Phương thức thanh toán
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <label key={method.value} className="relative">
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
                        <div className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-md hover:bg-muted/50">
                          {method.icon}
                          <span className="font-medium">{method.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cột tóm tắt đơn hàng (phải) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Tóm tắt đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Danh sách sản phẩm */}
                      <div className="max-h-64 space-y-4 overflow-y-auto pr-2">
                        {cart.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                              <Image
                                src={item.product.images?.[0] || '/placeholder.svg'} // Thay '/placeholder.svg' bằng ảnh mặc định
                                alt={item.product.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Số lượng: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">{formatPrice(item.totalPrice)}</p>
                          </div>
                        ))}
                      </div>

                      <hr className="border-dashed" />

                      {/* Chi tiết giá */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Tạm tính</span>
                          <span>{formatPrice(cart.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Phí vận chuyển</span>
                          <span className="font-medium text-green-600">Miễn phí</span>
                        </div>
                        <hr className="border-dashed" />
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Tổng cộng</span>
                          <span className="text-primary text-xl">{formatPrice(cart.total)}</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
