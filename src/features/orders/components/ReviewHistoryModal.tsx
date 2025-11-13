'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, Store, Star, Edit, MessageCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { ReviewHistory } from '@/services/reviews'

interface ReviewHistoryModalProps {
  reviewId: string
  onClose: () => void
}

export function ReviewHistoryModal({ reviewId, onClose }: ReviewHistoryModalProps) {
  const { colors } = useTheme()
  const [history, setHistory] = useState<ReviewHistory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [reviewId])

  const loadHistory = async () => {
    try {
      const data = await reviewService.getReviewHistory(reviewId)
      setHistory(data)
    } catch (error) {
      console.error('Failed to load review history:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'review_created':
        return 'Tạo đánh giá'
      case 'review_updated':
        return 'Cập nhật đánh giá'
      case 'vendor_replied':
        return 'Phản hồi từ người bán'
      case 'vendor_reply_updated':
        return 'Cập nhật phản hồi'
      default:
        return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review_created':
        return <Star className="w-5 h-5" />
      case 'review_updated':
        return <Edit className="w-5 h-5" />
      case 'vendor_replied':
      case 'vendor_reply_updated':
        return <MessageCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
        style={{ backgroundColor: colors.cardBackground }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 border-b"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Lịch sử đánh giá
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
                style={{ borderColor: colors.accent }}
              />
              <p className="mt-4" style={{ color: colors.textSecondary }}>
                Đang tải...
              </p>
            </div>
          ) : history ? (
            <div className="space-y-6">
              {/* Current State */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
                <h3 className="font-semibold mb-3" style={{ color: colors.text }}>
                  Trạng thái hiện tại
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" fill={colors.accent} stroke={colors.accent} />
                    <span style={{ color: colors.text }}>
                      Đánh giá: {history.currentRating} sao
                    </span>
                  </div>
                  {history.currentComment && (
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {history.currentComment}
                    </p>
                  )}
                  {history.currentVendorReply && (
                    <div
                      className="mt-3 p-3 rounded-lg"
                      style={{ backgroundColor: colors.cardBackground }}
                    >
                      <p className="text-xs font-semibold mb-1" style={{ color: colors.accent }}>
                        Phản hồi từ người bán:
                      </p>
                      <p className="text-sm" style={{ color: colors.text }}>
                        {history.currentVendorReply}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* History Timeline */}
              <div>
                <h3 className="font-semibold mb-4" style={{ color: colors.text }}>
                  Lịch sử thay đổi ({history.totalChanges})
                </h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div
                    className="absolute left-[17px] top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: colors.border }}
                  />

                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {history.history.map((item, index) => (
                      <div key={item.id} className="relative pl-12">
                        {/* Timeline Dot */}
                        <div
                          className="absolute left-0 w-9 h-9 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              item.actorType === 'customer' ? colors.accent : colors.success,
                          }}
                        >
                          {getTypeIcon(item.type)}
                        </div>

                        {/* Content */}
                        <div
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: colors.background }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {item.actorType === 'customer' ? (
                                <User className="w-4 h-4" style={{ color: colors.accent }} />
                              ) : (
                                <Store className="w-4 h-4" style={{ color: colors.success }} />
                              )}
                              <span
                                className="font-semibold text-sm"
                                style={{ color: colors.text }}
                              >
                                {item.actorName}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${
                                    item.actorType === 'customer' ? colors.accent : colors.success
                                  }15`,
                                  color:
                                    item.actorType === 'customer' ? colors.accent : colors.success,
                                }}
                              >
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <span className="text-xs" style={{ color: colors.textSecondary }}>
                              {formatDate(item.createdAt)}
                            </span>
                          </div>

                          {item.rating && (
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4"
                                  fill={star <= item.rating! ? colors.accent : 'none'}
                                  stroke={
                                    star <= item.rating! ? colors.accent : colors.textSecondary
                                  }
                                />
                              ))}
                            </div>
                          )}

                          {item.content && (
                            <p className="text-sm" style={{ color: colors.text }}>
                              {item.content}
                            </p>
                          )}

                          {item.images && item.images.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {item.images.map((image, idx) => (
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`Review image ${idx + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p style={{ color: colors.text }}>Không thể tải lịch sử</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 p-6 border-t"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.accent, color: '#fff' }}
          >
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  )
}
