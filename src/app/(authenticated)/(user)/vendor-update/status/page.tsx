'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function VendorStatusPage() {
  const { user } = useAuth()

  const getStatusInfo = () => {
    if (!user?.approvedStatus) {
      return {
        status: 'pending',
        title: 'Đang chờ duyệt',
        description: 'Hồ sơ của bạn đang được xem xét',
        icon: Clock,
        color: 'text-yellow-500',
        details: [
          'Thời gian xử lý: 1-3 ngày làm việc',
          'Bạn sẽ nhận được thông báo qua email',
          'Vui lòng kiểm tra email thường xuyên',
        ],
      }
    }

    switch (user.approvedStatus) {
      case 'approved':
        return {
          status: 'approved',
          title: 'Đã được duyệt',
          description: 'Chúc mừng! Bạn đã trở thành vendor',
          icon: CheckCircle,
          color: 'text-green-500',
          details: [
            'Bạn có thể bắt đầu bán hàng ngay',
            'Truy cập dashboard vendor để quản lý',
            'Liên hệ hỗ trợ nếu cần trợ giúp',
          ],
        }
      case 'rejected':
        return {
          status: 'rejected',
          title: 'Bị từ chối',
          description: 'Hồ sơ không đáp ứng yêu cầu',
          icon: XCircle,
          color: 'text-red-500',
          details: [
            'Kiểm tra email để biết lý do từ chối',
            'Cập nhật thông tin và nộp lại',
            'Liên hệ hỗ trợ để được hướng dẫn',
          ],
        }
      case 'suspended':
        return {
          status: 'suspended',
          title: 'Bị tạm ngưng',
          description: 'Tài khoản vendor bị tạm ngưng',
          icon: AlertTriangle,
          color: 'text-orange-500',
          details: [
            'Kiểm tra email để biết lý do',
            'Liên hệ hỗ trợ để khôi phục',
            'Tuân thủ quy định để tránh bị ngưng',
          ],
        }
      default:
        return {
          status: 'pending',
          title: 'Đang chờ duyệt',
          description: 'Hồ sơ của bạn đang được xem xét',
          icon: Clock,
          color: 'text-yellow-500',
          details: [
            'Thời gian xử lý: 1-3 ngày làm việc',
            'Bạn sẽ nhận được thông báo qua email',
            'Vui lòng kiểm tra email thường xuyên',
          ],
        }
    }
  }

  const statusInfo = getStatusInfo()
  const IconComponent = statusInfo.icon
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-6 mb-8">
          <Link
            href="/vendor"
            className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <div>
            <h1 className="text-4xl font-bold text-foreground">Trạng thái Vendor</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Kiểm tra trạng thái đăng ký của bạn
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status Content */}
      <div className="grid gap-6">
        {/* Current Status */}
        <div className="cart-card border rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <IconComponent className={`h-8 w-8 ${statusInfo.color}`} />
            <div>
              <h3 className="text-xl font-semibold text-foreground">{statusInfo.title}</h3>
              <p className="text-muted-foreground">{statusInfo.description}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {statusInfo.details.map((detail, index) => (
              <p key={index}>• {detail}</p>
            ))}
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="cart-card border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin tài khoản</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vai trò:</span>
                <span className="text-foreground">{user.roles.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái Vendor:</span>
                <span
                  className={`font-medium ${
                    statusInfo.status === 'approved'
                      ? 'text-green-500'
                      : statusInfo.status === 'rejected'
                      ? 'text-red-500'
                      : statusInfo.status === 'suspended'
                      ? 'text-orange-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {user.approvedStatus || 'Chưa đăng ký'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
