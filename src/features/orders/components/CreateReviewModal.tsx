'use client'

import { useState, useRef } from 'react'
import { Star, Upload, X, AlertCircle, Image as ImageIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { CreateReviewDto } from '@/services/reviews'
import type { OrderItem } from '@/services/orders/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface CreateReviewModalProps {
  open: boolean
  orderId: string
  orderItem: OrderItem
  onClose: () => void
  onSuccess: () => void
}

interface ImagePreview {
  file: File
  preview: string
}

export function CreateReviewModal({
  open,
  orderId,
  orderItem,
  onClose,
  onSuccess,
}: CreateReviewModalProps) {
  const { colors } = useTheme()
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    // Validate file count
    if (imageFiles.length + files.length > 5) {
      setError('Chỉ được upload tối đa 5 ảnh')
      return
    }

    // Validate each file
    const validFiles: ImagePreview[] = []
    const errors: string[] = []

    files.forEach((file) => {
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        errors.push(`${file.name} quá lớn (tối đa 5MB)`)
        return
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} không đúng định dạng (jpg, jpeg, png, gif, webp)`)
        return
      }

      // Create preview
      const preview = URL.createObjectURL(file)
      validFiles.push({ file, preview })
    })

    if (errors.length > 0) {
      setError(errors.join(', '))
    } else {
      setError('')
    }

    setImageFiles([...imageFiles, ...validFiles])

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    // Revoke preview URL to prevent memory leak
    URL.revokeObjectURL(imageFiles[index].preview)
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData()
      formData.append('productId', orderItem.productId)
      formData.append('orderId', orderId)
      formData.append('rating', rating.toString())

      if (comment.trim()) {
        formData.append('comment', comment.trim())
      }

      // Append image files
      imageFiles.forEach((imageFile) => {
        formData.append('images', imageFile.file)
      })

      await reviewService.createReview(formData)

      // Cleanup preview URLs
      imageFiles.forEach((img) => URL.revokeObjectURL(img.preview))

      onSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tạo đánh giá. Vui lòng thử lại.'

      // Parse backend error messages
      if (errorMessage.includes('đã đánh giá') || errorMessage.includes('already reviewed')) {
        setError('Bạn đã đánh giá sản phẩm này rồi. Vui lòng xem lại đánh giá của bạn.')
      } else if (errorMessage.includes('DELIVERED') || errorMessage.includes('giao thành công')) {
        setError('Bạn chỉ có thể đánh giá sau khi đơn hàng được giao thành công.')
      } else if (
        errorMessage.includes('không có trong đơn hàng') ||
        errorMessage.includes('not in order')
      ) {
        setError('Sản phẩm này không có trong đơn hàng.')
      } else if (errorMessage.includes('không tồn tại') || errorMessage.includes('not found')) {
        setError('Đơn hàng không tồn tại hoặc không thuộc về bạn.')
      } else if (errorMessage.includes('limit') || errorMessage.includes('tối đa')) {
        setError('Vượt quá giới hạn cho phép (tối đa 5 ảnh, mỗi ảnh 5MB).')
      } else if (errorMessage.includes('format') || errorMessage.includes('định dạng')) {
        setError('File không đúng định dạng. Chỉ hỗ trợ: jpg, jpeg, png, gif, webp.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: colors.text }}>Đánh giá sản phẩm</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
            {orderItem.thumbnail && (
              <img
                src={orderItem.thumbnail}
                alt={orderItem.productName}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2" style={{ color: colors.text }}>
                {orderItem.productName}
              </h3>
              {orderItem.variantName && (
                <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                  Phân loại: {orderItem.variantName}
                </p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: colors.text }}>
              Chất lượng sản phẩm
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className="w-8 h-8"
                    fill={(hoveredRating || rating) >= star ? colors.accent : 'none'}
                    stroke={
                      (hoveredRating || rating) >= star ? colors.accent : colors.textSecondary
                    }
                  />
                </button>
              ))}
              <span className="ml-2 text-lg font-semibold" style={{ color: colors.accent }}>
                {rating === 5
                  ? 'Tuyệt vời'
                  : rating === 4
                  ? 'Hài lòng'
                  : rating === 3
                  ? 'Bình thường'
                  : rating === 2
                  ? 'Không hài lòng'
                  : 'Rất tệ'}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Nhận xét của bạn
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
              maxLength={1000}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
            <div className="text-xs mt-1 text-right" style={{ color: colors.textSecondary }}>
              {comment.length}/1000
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Thêm hình ảnh (tối đa 5 ảnh, mỗi ảnh 5MB)
            </label>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageFiles.length >= 5}
              className="w-full px-4 py-8 rounded-lg border-2 border-dashed transition-colors hover:border-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-2"
              style={{
                borderColor: colors.border,
                backgroundColor: `${colors.accent}05`,
              }}
            >
              <ImageIcon className="w-12 h-12" style={{ color: colors.accent }} />
              <span className="font-medium" style={{ color: colors.text }}>
                {imageFiles.length >= 5 ? 'Đã đủ 5 ảnh' : 'Chọn ảnh từ thiết bị'}
              </span>
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                JPG, JPEG, PNG, GIF, WebP (Tối đa 5MB/ảnh)
              </span>
            </button>

            {/* Image Preview */}
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {imageFiles.map((imageFile, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={imageFile.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                      style={{ borderColor: colors.border }}
                    />
                    {/* File Size Badge */}
                    <div
                      className="absolute bottom-1 left-1 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}
                    >
                      {(imageFile.file.size / 1024 / 1024).toFixed(1)}MB
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="flex items-start gap-3 p-4 rounded-lg"
              style={{
                backgroundColor: `${colors.error}20`,
                borderLeft: `4px solid ${colors.error}`,
              }}
            >
              <AlertCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: colors.error }}
              />
              <p className="text-sm flex-1" style={{ color: colors.error }}>
                {error}
              </p>
            </div>
          )}
        </form>

        <DialogFooter className="gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-lg font-medium border transition-colors disabled:opacity-50"
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
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: colors.accent, color: '#fff' }}
          >
            {loading ? 'Đang gửi...' : 'Hoàn thành'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
