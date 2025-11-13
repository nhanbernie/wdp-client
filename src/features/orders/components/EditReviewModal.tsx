'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, Upload, X, AlertCircle, Clock, Image as ImageIcon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { reviewService } from '@/services/reviews'
import type { UpdateReviewDto, Review } from '@/services/reviews'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface EditReviewModalProps {
  open: boolean
  review: Review
  onClose: () => void
  onSuccess: () => void
}

interface ImagePreview {
  file?: File
  preview: string
  isExisting?: boolean
}

export function EditReviewModal({ open, review, onClose, onSuccess }: EditReviewModalProps) {
  const { colors } = useTheme()
  const [rating, setRating] = useState(review.rating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(review.comment || '')
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check if can edit
  const canEdit = review.editCount < 3
  const createdDate = new Date(review.createdAt)
  const oneMonthLater = new Date(createdDate)
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1)
  const isWithinOneMonth = new Date() < oneMonthLater

  const editsRemaining = 3 - review.editCount

  useEffect(() => {
    if (open) {
      setRating(review.rating)
      setComment(review.comment || '')

      // Convert existing image URLs to preview format
      const existingImages: ImagePreview[] = (review.images || []).map((url) => ({
        preview: url,
        isExisting: true,
      }))
      setImageFiles(existingImages)
      setError('')
    }
  }, [open, review])

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
      validFiles.push({ file, preview, isExisting: false })
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
    const imageToRemove = imageFiles[index]
    // Revoke preview URL if it's a new file
    if (!imageToRemove.isExisting && imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview)
    }
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canEdit) {
      setError('Bạn đã hết lượt chỉnh sửa đánh giá này.')
      return
    }

    if (!isWithinOneMonth) {
      setError('Bạn chỉ có thể chỉnh sửa đánh giá trong vòng 1 tháng sau khi tạo.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Check if there are any new files to upload
      const hasNewFiles = imageFiles.some((img) => !img.isExisting)

      if (hasNewFiles || imageFiles.length === 0) {
        // Use FormData if uploading new files or clearing all images
        const formData = new FormData()
        formData.append('rating', rating.toString())

        if (comment.trim()) {
          formData.append('comment', comment.trim())
        }

        // Add only new image files
        imageFiles.forEach((imageFile) => {
          if (imageFile.file) {
            formData.append('images', imageFile.file)
          }
        })

        await reviewService.updateReview(review.id, formData)
      } else {
        // Use JSON if no new files (only text changes)
        const updateData: UpdateReviewDto = {
          rating,
          comment: comment.trim() || undefined,
        }

        await reviewService.updateReview(review.id, updateData)
      }

      // Cleanup preview URLs
      imageFiles.forEach((img) => {
        if (!img.isExisting && img.preview) {
          URL.revokeObjectURL(img.preview)
        }
      })

      onSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể cập nhật đánh giá. Vui lòng thử lại.'

      if (errorMessage.includes('3 lần') || errorMessage.includes('maximum')) {
        setError('Bạn đã hết lượt chỉnh sửa (tối đa 3 lần).')
      } else if (errorMessage.includes('1 tháng') || errorMessage.includes('month')) {
        setError('Đã quá thời gian cho phép chỉnh sửa (1 tháng).')
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
          <DialogTitle style={{ color: colors.text }}>Chỉnh sửa đánh giá</DialogTitle>
        </DialogHeader>

        {/* Edit Info Banner */}
        <div
          className="flex items-start gap-3 p-4 rounded-lg"
          style={{
            backgroundColor:
              canEdit && isWithinOneMonth ? `${colors.accent}10` : `${colors.warning}20`,
            borderLeft: `4px solid ${canEdit && isWithinOneMonth ? colors.accent : colors.warning}`,
          }}
        >
          <Clock
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: canEdit && isWithinOneMonth ? colors.accent : colors.warning }}
          />
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1" style={{ color: colors.text }}>
              {canEdit && isWithinOneMonth
                ? `Còn ${editsRemaining} lần chỉnh sửa`
                : 'Không thể chỉnh sửa'}
            </p>
            <p className="text-xs" style={{ color: colors.textSecondary }}>
              {!canEdit
                ? 'Bạn đã hết lượt chỉnh sửa (tối đa 3 lần).'
                : !isWithinOneMonth
                ? 'Đã quá thời hạn 1 tháng kể từ khi tạo đánh giá.'
                : `Bạn có thể chỉnh sửa đánh giá đến ${oneMonthLater.toLocaleDateString('vi-VN')}.`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.background }}>
            {review.product?.thumbnail && (
              <img
                src={review.product.thumbnail}
                alt={review.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2" style={{ color: colors.text }}>
                {review.product?.name || 'Sản phẩm'}
              </h3>
              <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                Đã đánh giá: {new Date(review.createdAt).toLocaleDateString('vi-VN')}
              </p>
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
                  disabled={!canEdit || !isWithinOneMonth}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={!canEdit || !isWithinOneMonth}
              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này..."
              maxLength={1000}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              Hình ảnh (tối đa 5 ảnh, mỗi ảnh 5MB)
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

            {canEdit && isWithinOneMonth && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageFiles.length >= 5}
                className="w-full px-4 py-6 rounded-lg border-2 border-dashed transition-colors hover:border-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: `${colors.accent}05`,
                }}
              >
                <ImageIcon className="w-10 h-10" style={{ color: colors.accent }} />
                <span className="font-medium text-sm" style={{ color: colors.text }}>
                  {imageFiles.length >= 5 ? 'Đã đủ 5 ảnh' : 'Chọn ảnh mới từ thiết bị'}
                </span>
                <span className="text-xs" style={{ color: colors.textSecondary }}>
                  Ảnh mới sẽ thay thế toàn bộ ảnh cũ
                </span>
              </button>
            )}

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
                    {/* Badge for existing vs new images */}
                    {imageFile.isExisting ? (
                      <div
                        className="absolute top-1 left-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: `${colors.accent}90`, color: '#fff' }}
                      >
                        Cũ
                      </div>
                    ) : (
                      <div
                        className="absolute bottom-1 left-1 px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}
                      >
                        {imageFile.file
                          ? (imageFile.file.size / 1024 / 1024).toFixed(1) + 'MB'
                          : ''}
                      </div>
                    )}
                    {canEdit && isWithinOneMonth && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
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
            disabled={loading || !canEdit || !isWithinOneMonth}
            className="flex-1 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.accent, color: '#fff' }}
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
