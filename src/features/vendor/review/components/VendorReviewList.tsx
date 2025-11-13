'use client'

import { useState, useEffect } from 'react'
import { Star, MessageCircle, Reply, TrendingUp, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { VendorReviewOverview, Review } from '@/services/reviews'
import { VendorReplyModal } from './VendorReplyModal'

interface VendorReviewListProps {
  vendorId: string
}

export function VendorReviewList({ vendorId }: VendorReviewListProps) {
  const { colors } = useTheme()
  const [overview, setOverview] = useState<VendorReviewOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  useEffect(() => {
    loadOverview()
  }, [vendorId])

  const loadOverview = async () => {
    try {
      const data = await reviewService.getVendorReviewOverview(vendorId)
      setOverview(data)
    } catch (error) {
      console.error('Failed to load vendor reviews:', error)
    } finally {
      setLoading(false)
    }
  }

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
      <div className="p-12 text-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
          style={{ borderColor: colors.accent }}
        />
        <p className="mt-4" style={{ color: colors.textSecondary }}>
          Đang tải đánh giá...
        </p>
      </div>
    )
  }

  if (!overview) {
    return (
      <div className="p-12 text-center">
        <MessageCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textSecondary }} />
        <p className="text-lg font-medium" style={{ color: colors.text }}>
          Không thể tải dữ liệu đánh giá
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Reviews */}
        <div
          className="p-6 rounded-xl border"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                Tổng đánh giá
              </p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>
                {overview.totalReviews}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.accent}15` }}>
              <MessageCircle className="w-6 h-6" style={{ color: colors.accent }} />
            </div>
          </div>
        </div>

        {/* Average Rating */}
        <div
          className="p-6 rounded-xl border"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                Đánh giá trung bình
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold" style={{ color: colors.accent }}>
                  {overview.averageRating.toFixed(1)}
                </p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5"
                      fill={star <= Math.round(overview.averageRating) ? colors.accent : 'none'}
                      stroke={
                        star <= Math.round(overview.averageRating)
                          ? colors.accent
                          : colors.textSecondary
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.success}15` }}>
              <TrendingUp className="w-6 h-6" style={{ color: colors.success }} />
            </div>
          </div>
        </div>

        {/* 5 Star Reviews */}
        <div
          className="p-6 rounded-xl border"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
                Đánh giá 5 sao
              </p>
              <p className="text-3xl font-bold" style={{ color: colors.text }}>
                {overview.ratingDistribution[5]}
              </p>
              {overview.totalReviews > 0 && (
                <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                  {((overview.ratingDistribution[5] / overview.totalReviews) * 100).toFixed(1)}%
                  tổng số
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.accent}15` }}>
              <Star className="w-6 h-6" fill={colors.accent} stroke={colors.accent} />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div
        className="p-6 rounded-xl border"
        style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.text }}>
          Phân bổ đánh giá
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-medium" style={{ color: colors.text }}>
                  {star}
                </span>
                <Star className="w-4 h-4" fill={colors.accent} stroke={colors.accent} />
              </div>
              <div
                className="flex-1 h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: colors.background }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.accent,
                    width: `${
                      overview.totalReviews > 0
                        ? (overview.ratingDistribution[
                            star as keyof typeof overview.ratingDistribution
                          ] /
                            overview.totalReviews) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm w-16 text-right font-medium" style={{ color: colors.text }}>
                {overview.ratingDistribution[star as keyof typeof overview.ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reviews */}
      <div
        className="rounded-xl border"
        style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
      >
        <div className="p-6 border-b" style={{ borderColor: colors.border }}>
          <h3 className="text-lg font-bold" style={{ color: colors.text }}>
            Đánh giá gần đây
          </h3>
        </div>

        <div className="divide-y" style={{ borderColor: colors.border }}>
          {overview.recentReviews.length === 0 ? (
            <div className="p-12 text-center">
              <MessageCircle
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: colors.textSecondary }}
              />
              <p className="text-lg font-medium" style={{ color: colors.text }}>
                Chưa có đánh giá nào
              </p>
            </div>
          ) : (
            overview.recentReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-opacity-50 transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  {review.product?.thumbnail && (
                    <img
                      src={review.product.thumbnail}
                      alt={review.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    {review.product?.name && (
                      <p
                        className="text-sm font-medium mb-2 line-clamp-1"
                        style={{ color: colors.accent }}
                      >
                        {review.product.name}
                      </p>
                    )}

                    {/* User and Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold" style={{ color: colors.text }}>
                        {review.user?.firstName} {review.user?.lastName}
                      </p>
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
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: colors.text }}>
                        {review.comment}
                      </p>
                    )}

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-3">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                              style={{ borderColor: colors.border }}
                              onClick={() => window.open(image, '_blank')}
                            />
                          ))}
                        </div>
                        <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                          {review.images.length} ảnh
                        </p>
                      </div>
                    )}

                    {/* Vendor Reply or Reply Button */}
                    {review.vendorReply ? (
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.background }}
                      >
                        <p className="text-xs font-semibold mb-1" style={{ color: colors.accent }}>
                          Phản hồi của bạn:
                        </p>
                        <p className="text-sm" style={{ color: colors.text }}>
                          {review.vendorReply}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                        style={{ backgroundColor: colors.accent, color: '#fff' }}
                      >
                        <Reply className="w-4 h-4" />
                        Phản hồi
                      </button>
                    )}

                    {/* Update Reply Button */}
                    {review.vendorReply && (
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="mt-2 text-sm font-medium hover:underline"
                        style={{ color: colors.accent }}
                      >
                        Cập nhật phản hồi
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {selectedReview && (
        <VendorReplyModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onSuccess={() => {
            setSelectedReview(null)
            loadOverview() // Refresh the list
          }}
        />
      )}
    </div>
  )
}
