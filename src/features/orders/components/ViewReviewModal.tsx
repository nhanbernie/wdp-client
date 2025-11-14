'use client'

import { useState, useEffect } from 'react'
import { Star, Edit2, Clock, User, Package } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { Review } from '@/services/reviews'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { EditReviewModal } from './EditReviewModal'

interface ViewReviewModalProps {
  open: boolean
  productId: string
  orderId: string
  productName: string
  productThumbnail?: string
  onClose: () => void
  onReviewUpdated?: () => void
}

export function ViewReviewModal({
  open,
  productId,
  orderId,
  productName,
  productThumbnail,
  onClose,
  onReviewUpdated,
}: ViewReviewModalProps) {
  const { colors } = useTheme()
  const [review, setReview] = useState<Review | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (open) {
      loadReview()
    }
  }, [open, productId, orderId])

  const loadReview = async () => {
    setLoading(true)
    setError('')
    try {
      // Fetch all reviews for product and find the one for this order
      const reviews = await reviewService.getProductReviews(productId)
      const userReview = reviews.find((r) => r.orderId === orderId)

      if (userReview) {
        setReview(userReview)
      } else {
        setError('Không tìm thấy đánh giá của bạn')
      }
    } catch (err: any) {
      setError(err.message || 'Không thể tải đánh giá')
    } finally {
      setLoading(false)
    }
  }

  const handleEditSuccess = () => {
    setShowEditModal(false)
    loadReview() // Reload review
    onReviewUpdated?.()
  }

  const canEdit = review && review.editCount < 3
  const createdDate = review ? new Date(review.createdAt) : null
  const oneMonthLater = createdDate
    ? new Date(createdDate.setMonth(createdDate.getMonth() + 1))
    : null
  const isWithinOneMonth = oneMonthLater ? new Date() < oneMonthLater : false

  return (
    <>
      <Dialog open={open && !showEditModal} onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: colors.text }}>Đánh giá của bạn</DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div
                className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent"
                style={{ borderColor: colors.accent, borderTopColor: 'transparent' }}
              />
            </div>
          ) : error ? (
            <div
              className="flex items-center justify-center py-12 rounded-lg"
              style={{ backgroundColor: `${colors.error}20` }}
            >
              <p style={{ color: colors.error }}>{error}</p>
            </div>
          ) : review ? (
            <div className="space-y-6">
              {/* Product Info */}
              <div
                className="flex gap-4 p-4 rounded-lg"
                style={{ backgroundColor: colors.background }}
              >
                {productThumbnail && (
                  <img
                    src={productThumbnail}
                    alt={productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2" style={{ color: colors.text }}>
                    {productName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4" style={{ color: colors.textSecondary }} />
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      Đánh giá: {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  {review.updatedAt !== review.createdAt && (
                    <div className="flex items-center gap-2 mt-1">
                      <Edit2 className="w-4 h-4" style={{ color: colors.textSecondary }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Cập nhật: {new Date(review.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Edit Info */}
              <div
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: `${colors.accent}10` }}
              >
                <span className="text-sm font-medium" style={{ color: colors.text }}>
                  Số lần chỉnh sửa: {review.editCount}/3
                </span>
                {canEdit && isWithinOneMonth && (
                  <span className="text-xs" style={{ color: colors.textSecondary }}>
                    Còn {3 - review.editCount} lần chỉnh sửa
                  </span>
                )}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  Đánh giá của bạn
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-6 h-6"
                      fill={review.rating >= star ? colors.accent : 'none'}
                      stroke={review.rating >= star ? colors.accent : colors.textSecondary}
                    />
                  ))}
                  <span className="ml-2 font-semibold" style={{ color: colors.accent }}>
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* Comment */}
              {review.comment && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Nhận xét
                  </label>
                  <div
                    className="p-4 rounded-lg whitespace-pre-wrap"
                    style={{ backgroundColor: colors.background }}
                  >
                    <p style={{ color: colors.text }}>{review.comment}</p>
                  </div>
                </div>
              )}

              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Hình ảnh
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Vendor Reply */}
              {review.vendorReply && (
                <div
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: `${colors.accent}05`,
                    borderColor: colors.accent,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" style={{ color: colors.accent }} />
                    <span className="text-sm font-semibold" style={{ color: colors.accent }}>
                      Phản hồi từ người bán
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: colors.text }}>
                    {review.vendorReply}
                  </p>
                  {review.vendorReplyAt && (
                    <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>
                      {new Date(review.vendorReplyAt).toLocaleDateString('vi-VN')}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null}

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg font-medium border transition-colors"
              style={{
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.background,
              }}
            >
              Đóng
            </button>
            {review && canEdit && isWithinOneMonth && (
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.accent, color: '#fff' }}
              >
                <Edit2 className="w-4 h-4" />
                Chỉnh sửa
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      {review && (
        <EditReviewModal
          open={showEditModal}
          review={review}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  )
}
