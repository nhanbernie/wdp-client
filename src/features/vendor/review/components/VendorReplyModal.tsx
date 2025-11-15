'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { Review } from '@/services/reviews'

interface VendorReplyModalProps {
  review: Review
  onClose: () => void
  onSuccess: () => void
}

export function VendorReplyModal({ review, onClose, onSuccess }: VendorReplyModalProps) {
  const { colors } = useTheme()
  const [vendorReply, setVendorReply] = useState(review.vendorReply || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await reviewService.vendorReply(review.id, { vendorReply: vendorReply.trim() })
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Không thể gửi phản hồi. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-2xl rounded-2xl shadow-xl"
          style={{ backgroundColor: colors.cardBackground }}
        >
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                {review.vendorReply ? 'Cập nhật phản hồi' : 'Phản hồi đánh giá'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.hoverBackground }}
              >
                <X className="w-5 h-5" style={{ color: colors.text }} />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Review */}
            <div className="p-4 rounded-lg space-y-3" style={{ backgroundColor: colors.background }}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: colors.text }}>
                  {review.user?.firstName} {review.user?.lastName}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4"
                      fill={star <= review.rating ? colors.accent : 'none'}
                      stroke={star <= review.rating ? colors.accent : colors.textSecondary}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              
              {review.comment && (
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {review.comment}
                </p>
              )}

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: colors.text }}>
                    Hình ảnh từ khách hàng ({review.images.length}):
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ borderColor: colors.border }}
                        onClick={() => window.open(image, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reply Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                Phản hồi của bạn
              </label>
              <textarea
                value={vendorReply}
                onChange={(e) => setVendorReply(e.target.value)}
                placeholder="Cảm ơn bạn đã ủng hộ shop..."
                maxLength={500}
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <div className="text-xs mt-1 text-right" style={{ color: colors.textSecondary }}>
                {vendorReply.length}/500
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.error}20` }}>
                <p className="text-sm" style={{ color: colors.error }}>
                  {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
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
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || !vendorReply.trim()}
                className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.accent, color: '#fff' }}
              >
                <Send className="w-5 h-5" />
                {loading ? 'Đang gửi...' : 'Gửi phản hồi'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
