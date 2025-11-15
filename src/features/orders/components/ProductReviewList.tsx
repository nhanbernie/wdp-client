'use client'

import { useState, useEffect } from 'react'
import { Star, ThumbsUp, MessageCircle, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { Review, ReviewStats } from '@/services/reviews'

interface ProductReviewListProps {
  productId: string
}

export function ProductReviewList({ productId }: ProductReviewListProps) {
  const { colors } = useTheme()
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterRating, setFilterRating] = useState<number | null>(null)

  useEffect(() => {
    loadReviews()
    loadStats()
  }, [productId])

  const loadReviews = async () => {
    try {
      const data = await reviewService.getProductReviews(productId)
      setReviews(data)
    } catch (error) {
      console.error('Failed to load reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await reviewService.getProductReviewStats(productId)
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const filteredReviews = filterRating ? reviews.filter((r) => r.rating === filterRating) : reviews

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
          style={{ borderColor: colors.accent }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: colors.accent }}>
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5"
                      fill={star <= Math.round(stats.averageRating) ? colors.accent : 'none'}
                      stroke={
                        star <= Math.round(stats.averageRating)
                          ? colors.accent
                          : colors.textSecondary
                      }
                    />
                  ))}
                </div>
                <div className="text-sm mt-2" style={{ color: colors.textSecondary }}>
                  {stats.totalReviews} đánh giá
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(filterRating === star ? null : star)}
                  className="w-full flex items-center gap-2 group"
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                      {star}
                    </span>
                    <Star className="w-4 h-4" fill={colors.accent} stroke={colors.accent} />
                  </div>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: colors.background }}
                  >
                    <div
                      className="h-full transition-all duration-300 group-hover:opacity-80"
                      style={{
                        backgroundColor: colors.accent,
                        width: `${
                          stats.totalReviews > 0
                            ? (stats.ratingDistribution[
                                star as keyof typeof stats.ratingDistribution
                              ] /
                                stats.totalReviews) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm w-12 text-right" style={{ color: colors.textSecondary }}>
                    {stats.ratingDistribution[star as keyof typeof stats.ratingDistribution]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Badge */}
          {filterRating && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                Đang lọc:
              </span>
              <button
                onClick={() => setFilterRating(null)}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: colors.accent, color: '#fff' }}
              >
                {filterRating} sao ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: colors.textSecondary }}
            />
            <p className="text-lg font-medium" style={{ color: colors.text }}>
              Chưa có đánh giá nào
            </p>
            <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
              Hãy là người đầu tiên đánh giá sản phẩm này
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                border: `1px solid ${colors.border}30`,
                boxShadow: `0 4px 12px ${colors.border}20`,
              }}
            >
              {/* User Info */}
              <div className="flex items-start gap-4">
                {review.user?.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {review.user?.firstName?.[0] || 'U'}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold" style={{ color: colors.text }}>
                        {review.user?.firstName} {review.user?.lastName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4"
                              fill={star <= review.rating ? colors.accent : 'none'}
                              stroke={star <= review.rating ? colors.accent : colors.textSecondary}
                            />
                          ))}
                        </div>
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          {formatDate(review.updatedAt)}
                        </span>
                        {review.editCount > 0 && (
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: colors.background,
                              color: colors.textSecondary,
                            }}
                          >
                            Đã chỉnh sửa
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: colors.text }}>
                      {review.comment}
                    </p>
                  )}

                  {/* Images */}
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Vendor Reply */}
                  {review.vendorReply && (
                    <div
                      className="mt-4 p-4 rounded-lg"
                      style={{ backgroundColor: colors.background }}
                    >
                      <p className="text-sm font-semibold mb-2" style={{ color: colors.accent }}>
                        Phản hồi từ người bán
                      </p>
                      <p className="text-sm" style={{ color: colors.text }}>
                        {review.vendorReply}
                      </p>
                      {review.vendorReplyAt && (
                        <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>
                          {formatDate(review.vendorReplyAt)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
