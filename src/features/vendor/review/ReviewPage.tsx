'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Award, AlertCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { VendorReviewList } from './components/VendorReviewList'

export default function VendorReviewPage() {
  const { colors } = useTheme()
  const { user, isLoading } = useAuth()

  // Get vendorId from authenticated user
  const vendorId = user?.vendorId

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.accent }}
          />
          <p style={{ color: colors.textSecondary }}>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'vendor' || !vendorId) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center max-w-md p-6">
          <div
            className="p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${colors.error}20` }}
          >
            <AlertCircle className="w-10 h-10" style={{ color: colors.error }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
            Không tìm thấy thông tin cửa hàng
          </h2>
          <p className="mb-4" style={{ color: colors.textSecondary }}>
            Vui lòng đảm bảo bạn đã đăng nhập với tài khoản vendor và đã được phê duyệt.
          </p>
          <button
            onClick={() => (window.location.href = '/vendor/application')}
            className="px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.accent, color: '#fff' }}
          >
            Xem trạng thái đăng ký
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.accent}15` }}>
              <Award className="w-8 h-8" style={{ color: colors.accent }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
                Quản lý đánh giá
              </h1>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Xem và phản hồi đánh giá từ khách hàng
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <VendorReviewList vendorId={vendorId} />
        </motion.div>
      </div>
    </div>
  )
}
