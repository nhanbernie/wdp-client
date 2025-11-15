'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, ShoppingCart, Loader2 } from 'lucide-react'
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
import { useGetAddressesQuery } from '@/services/addresses'
import type { Address } from '@/services/addresses/types'
import { AddressDisplay } from './AddressDisplay'
import { AddressSelectionDialog } from './AddressSelectionDialog'

interface CheckoutFormData {
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card' | 'e_wallet'
  addressId?: string
  customerNotes: string
}

const CheckoutPage: React.FC = () => {
  const router = useRouter()
  const { cart, isLoadingCart, clearCart } = useCartApi()
  const { checkoutFromCart } = useOrders()
  const { createPayment } = usePayment()
  const { colors } = useTheme()
  const {
    data: addressesData,
    isLoading: isLoadingAddresses,
    refetch: refetchAddresses,
  } = useGetAddressesQuery()

  const addresses = addressesData?.data || []
  const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0]
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)

  // Get selected items from sessionStorage
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('selectedCartItems')
      return stored ? JSON.parse(stored) : []
    }
    return []
  })

  // Filter cart items to only show selected items
  const itemsToCheckout =
    selectedCartItemIds.length > 0
      ? (cart?.items || []).filter((item) => selectedCartItemIds.includes(item.id))
      : cart?.items || []

  // Calculate summary for selected items only
  const selectedSubtotal = itemsToCheckout.reduce((sum, item) => sum + item.totalPrice, 0)
  const selectedTotal = selectedSubtotal + (selectedSubtotal >= 1000000 ? 0 : 5000) // Total equals subtotal for now (shipping is free)
  const selectedItemCount = itemsToCheckout.reduce((sum, item) => sum + item.quantity, 0)

  const [formData, setFormData] = useState<CheckoutFormData>({
    paymentMethod: 'cod',
    addressId: undefined,
    customerNotes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<any>(null)

  // Load default address when addresses are loaded
  useEffect(() => {
    if (!isLoadingAddresses) {
      if (defaultAddress && !selectedAddress) {
        setSelectedAddress(defaultAddress)
        setFormData((prev) => ({
          ...prev,
          addressId: defaultAddress.id,
        }))
      }
    }
  }, [defaultAddress, selectedAddress, isLoadingAddresses])

  // Update form data when selected address changes
  useEffect(() => {
    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        addressId: selectedAddress.id,
      }))
    }
  }, [selectedAddress])

  // Fix placeholder color for textarea
  useEffect(() => {
    const styleId = 'checkout-textarea-placeholder-style'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
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
    if (!itemsToCheckout.length) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán')
      return
    }

    // Validate: must have selected address
    if (!selectedAddress) {
      alert('Vui lòng chọn địa chỉ giao hàng')
      return
    }

    setIsSubmitting(true)
    try {
      const checkoutPayload: any = {
        paymentMethod: formData.paymentMethod,
        addressId: selectedAddress.id,
        customerNotes: formData.customerNotes,
      }

      // Only include cartItemIds if there are selected items
      if (selectedCartItemIds.length > 0) {
        checkoutPayload.cartItemIds = selectedCartItemIds
      }

      const order = await checkoutFromCart(checkoutPayload)

      // Clear selected items from sessionStorage after successful checkout
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('selectedCartItems')
      }
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

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address)
    setIsAddressDialogOpen(false)
  }

  const handleAddressChange = () => {
    setIsAddressDialogOpen(true)
  }

  const handleAddressFormSuccess = () => {
    refetchAddresses()
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
            <ShoppingCart
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: colors.textSecondary }}
            />
            <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
              Giỏ hàng trống
            </h1>
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

  // Nếu có selectedCartItemIds nhưng không có item nào match, redirect về cart
  if (selectedCartItemIds.length > 0 && itemsToCheckout.length === 0) {
    // Clear invalid selection and redirect
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('selectedCartItems')
    }
    router.push('/cart')
    return null
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
              <Button
                variant="outline"
                size="icon"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1
                className="text-2xl font-bold flex items-center gap-3"
                style={{ color: colors.text }}
              >
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
                <Card
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: colors.text }}>Thông tin giao hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Address Display */}
                      <AddressDisplay
                        address={selectedAddress}
                        onChange={handleAddressChange}
                        onManage={() => router.push('/addresses')}
                      />

                      {/* Customer Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="customerNotes" style={{ color: colors.text }}>
                          Ghi chú đơn hàng (tùy chọn)
                        </Label>
                        <Textarea
                          id="customerNotes"
                          value={formData.customerNotes}
                          onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                          placeholder="Ghi chú thêm cho người giao hàng..."
                          className="min-h-[100px] resize-none focus:ring-2 focus:ring-offset-1"
                          style={{
                            backgroundColor: colors.cardBackgroundSecondary,
                            borderColor: `${colors.border}60`,
                            color: colors.text,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.setProperty(
                              '--tw-ring-color',
                              `${colors.border}40`,
                            )
                            e.currentTarget.style.setProperty(
                              '--tw-ring-offset-color',
                              colors.cardBackground,
                            )
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
                <Card
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  }}
                >
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
                              borderColor:
                                formData.paymentMethod === method.value
                                  ? colors.accent
                                  : colors.border,
                              backgroundColor:
                                formData.paymentMethod === method.value
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
                            <span className="font-medium" style={{ color: colors.text }}>
                              {method.label}
                            </span>
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
                    borderColor: colors.border,
                  }}
                >
                  <CardHeader>
                    <CardTitle style={{ color: colors.text }}>
                      Đơn hàng ({selectedItemCount} sản phẩm)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Danh sách sản phẩm */}
                    <div className="max-h-80 space-y-3 overflow-y-auto">
                      {itemsToCheckout.map((item) => (
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
                            <h3
                              className="font-medium text-sm line-clamp-2 mb-1"
                              style={{ color: colors.text }}
                            >
                              {item.product.name}
                            </h3>
                            {/* Variant Info & SKU */}
                            {item.variant && (
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                {item.variant.optionValues &&
                                  item.variant.optionValues.length > 0 && (
                                    <span
                                      className="text-xs px-2 py-0.5 rounded"
                                      style={{
                                        backgroundColor: colors.cardBackgroundSecondary,
                                        color: colors.textSecondary,
                                      }}
                                    >
                                      {item.variant.optionValues
                                        .map((ov) => `${ov.optionName}: ${ov.value}`)
                                        .join(', ')}
                                    </span>
                                  )}
                                {item.variant.sku && (
                                  <span
                                    className="text-xs font-bold px-2 py-0.5 rounded"
                                    style={{
                                      backgroundColor: colors.cardBackgroundSecondary,
                                      color: colors.textSecondary,
                                    }}
                                  >
                                    SKU: {item.variant.sku}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="text-sm font-bold" style={{ color: colors.text }}>
                              {formatPrice(item.totalPrice)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ paddingTop: '1rem' }} />

                    {/* Chi tiết giá */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.textSecondary }}>Tạm tính</span>
                        <span className="font-bold" style={{ color: colors.text }}>
                          {formatPrice(selectedSubtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.textSecondary }}>Phí vận chuyển</span>
                        <span className="font-bold" style={{ color: colors.success }}>
                          {formatPrice(selectedSubtotal >= 1000000 ? 0 : 5000)}
                        </span>
                      </div>

                      <div style={{ paddingTop: '0.75rem' }} />

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold" style={{ color: colors.text }}>
                          Tổng cộng
                        </span>
                        <span className="text-2xl font-bold" style={{ color: colors.text }}>
                          {formatPrice(selectedTotal)}
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
                        color: 'white',
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

      {/* Address Selection Dialog */}
      <AddressSelectionDialog
        open={isAddressDialogOpen}
        onClose={() => setIsAddressDialogOpen(false)}
        addresses={addresses}
        selectedAddressId={selectedAddress?.id}
        onSelect={handleSelectAddress}
        onAddNew={handleAddressFormSuccess}
      />
    </div>
  )
}

export default CheckoutPage
