'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Truck, Tag, Star, Eye } from 'lucide-react'
import type { Order } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'
import { CreateReviewModal } from '@/features/orders/components/CreateReviewModal'
import { ViewReviewModal } from '@/features/orders/components/ViewReviewModal'
import { OrderStatus } from '@/services/orders/types'
import { reviewService } from '@/services/reviews'

interface OrderItemsCardProps {
  order: Order
}

interface ReviewStatus {
  [productId: string]: boolean
}

export function OrderItemsCard({ order }: OrderItemsCardProps) {
  const { colors } = useTheme()
  const [selectedItemForReview, setSelectedItemForReview] = useState<any>(null)
  const [selectedItemForView, setSelectedItemForView] = useState<any>(null)
  const [reviewedProducts, setReviewedProducts] = useState<ReviewStatus>({})
  const [loadingReviews, setLoadingReviews] = useState(true)

  const isDelivered = order.status === OrderStatus.DELIVERED

  // Check which products have been reviewed
  useEffect(() => {
    const checkReviewedProducts = async () => {
      if (!order.items) return

      setLoadingReviews(true)
      const reviewStatus: ReviewStatus = {}

      try {
        // Check each product for existing reviews
        await Promise.all(
          order.items.map(async (item) => {
            try {
              const reviews = await reviewService.getProductReviews(item.productId)
              const hasReview = reviews.some((review) => review.orderId === order.id)
              reviewStatus[item.productId] = hasReview
            } catch (err) {
              reviewStatus[item.productId] = false
            }
          }),
        )

        setReviewedProducts(reviewStatus)
      } catch (err) {
        console.error('Error checking reviews:', err)
      } finally {
        setLoadingReviews(false)
      }
    }

    checkReviewedProducts()
  }, [order.id, order.items])

  const handleReviewSuccess = () => {
    setSelectedItemForReview(null)
    // Refresh review status
    if (selectedItemForReview) {
      setReviewedProducts((prev) => ({
        ...prev,
        [selectedItemForReview.productId]: true,
      }))
    }
  }

  const handleViewReview = (item: any) => {
    setSelectedItemForView(item)
  }

  const handleCreateReview = (item: any) => {
    setSelectedItemForReview(item)
  }

  return (
    <Card
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      <CardHeader
        className="p-4 border-b"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.cardBackground,
        }}
      >
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${colors.accent}15` }}>
            <Package className="h-5 w-5" style={{ color: colors.accent }} />
          </div>
          <span style={{ color: colors.text }}>Sản phẩm đã đặt</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4" style={{ backgroundColor: colors.cardBackground }}>
        <div className="space-y-4">
          {/* Product Items */}
          {order.items?.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border transition-colors hover:border-opacity-50"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div
                  className="relative w-20 h-20 rounded-lg overflow-hidden border"
                  style={{ borderColor: colors.border }}
                >
                  <Image
                    src={item.thumbnail || '/placeholder.png'}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute top-1 right-1 px-2 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.background,
                    }}
                  >
                    ×{item.quantity}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-base font-bold mb-2 line-clamp-2"
                    style={{ color: colors.text }}
                  >
                    {item.productName}
                  </h4>

                    {/* Variant Name & SKU */}
                    {(item.variantName || item.sku) && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {item.variantName && (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                            {item.variantName}
                          </span>
                        )}
                        {item.sku && (
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1">
                            <span className="text-slate-500">SKU:</span>
                            <span>{item.sku}</span>
                          </span>
                        )}
                      </div>
                    )}

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs"
                        style={{
                          backgroundColor: `${colors.textSecondary}10`,
                          color: colors.textSecondary,
                        }}
                      >
                        <Package className="h-3 w-3" />
                        <span className="font-medium">SL: {item.quantity}</span>
                      </div>

                      <div
                        className="px-3 py-1 rounded-lg"
                        style={{
                          backgroundColor: `${colors.accent}15`,
                        }}
                      >
                        <span className="text-base font-bold" style={{ color: colors.accent }}>
                          {item.totalPrice.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>

                    {/* Review Button - Show for all orders */}
                    <div className="flex gap-2">
                      {loadingReviews ? (
                        <div className="px-4 py-2">
                          <div
                            className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"
                            style={{ borderColor: colors.accent, borderTopColor: 'transparent' }}
                          />
                        </div>
                      ) : reviewedProducts[item.productId] ? (
                        <button
                          onClick={() => handleViewReview(item)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md border"
                          style={{
                            borderColor: colors.accent,
                            color: colors.accent,
                            backgroundColor: `${colors.accent}10`,
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          Xem đánh giá
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCreateReview(item)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                          style={{
                            backgroundColor: colors.accent,
                            color: '#fff',
                          }}
                        >
                          <Star className="h-4 w-4" />
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Separator style={{ backgroundColor: colors.border }} />

          {/* Order Summary */}
          <div
            className="space-y-3 p-4 rounded-lg border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              borderColor: colors.border,
            }}
          >
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                <Package className="h-4 w-4" />
                Tạm tính:
              </span>
              <span className="text-base font-bold" style={{ color: colors.text }}>
                {order.subtotal.toLocaleString('vi-VN')}₫
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center">
              <span
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                <Truck className="h-4 w-4" />
                Phí vận chuyển:
              </span>
              <span className="text-base font-bold" style={{ color: colors.text }}>
                {order.shippingFee.toLocaleString('vi-VN')}₫
              </span>
            </div>

            {/* Discount */}
            {order.discountAmount && order.discountAmount > 0 && (
              <div
                className="flex justify-between items-center p-3 rounded-lg border"
                style={{
                  backgroundColor: `${colors.success}10`,
                  borderColor: `${colors.success}30`,
                }}
              >
                <span
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: colors.success }}
                >
                  <Tag className="h-4 w-4" />
                  Giảm giá:
                </span>
                <span className="text-base font-bold" style={{ color: colors.success }}>
                  -{order.discountAmount.toLocaleString('vi-VN')}₫
                </span>
              </div>
            )}

            <Separator style={{ backgroundColor: colors.border }} />

            {/* Total */}
            <div
              className="flex justify-between items-center p-4 rounded-lg"
              style={{
                backgroundColor: colors.accent,
              }}
            >
              <span className="font-bold text-base" style={{ color: colors.background }}>
                Tổng cộng:
              </span>
              <span className="text-xl font-bold" style={{ color: colors.background }}>
                {order.totalAmount.toLocaleString('vi-VN')}₫
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Create Review Modal */}
      <CreateReviewModal
        open={selectedItemForReview !== null}
        orderId={order.id}
        orderItem={selectedItemForReview || ({} as any)}
        onClose={() => setSelectedItemForReview(null)}
        onSuccess={handleReviewSuccess}
      />

      {/* View Review Modal */}
      {selectedItemForView && (
        <ViewReviewModal
          open={selectedItemForView !== null}
          productId={selectedItemForView.productId}
          orderId={order.id}
          productName={selectedItemForView.productName}
          productThumbnail={selectedItemForView.thumbnail}
          onClose={() => setSelectedItemForView(null)}
          onReviewUpdated={() => {
            // Refresh if needed
            console.log('Review updated')
          }}
        />
      )}
    </Card>
  )
}
