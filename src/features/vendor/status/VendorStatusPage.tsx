'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { useVendorStatus } from './hooks/useVendorStatus'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

export const VendorStatusPage: React.FC = () => {
  const { user } = useAuth()
  const { colors } = useTheme()
  const { profile, statusInfo, loading, error, refetch } = useVendorStatus()

  const getStatusIcon = () => {
    switch (statusInfo.status) {
      case 'approved':
        return <CheckCircle className="h-8 w-8" style={{ color: colors.success }} />
      case 'rejected':
        return <XCircle className="h-8 w-8" style={{ color: colors.error }} />
      case 'suspended':
        return <AlertTriangle className="h-8 w-8" style={{ color: colors.warning }} />
      default:
        return <Clock className="h-8 w-8" style={{ color: colors.warning }} />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" style={{ color: colors.accent }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="mb-4" style={{ color: colors.error }}>
            Có lỗi xảy ra khi tải thông tin
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
              Trạng thái Vendor
            </h1>
            <p className="text-xl mt-2" style={{ color: colors.textSecondary }}>
              Kiểm tra trạng thái đăng ký của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Status Content */}
      <div className="grid gap-6">
        {/* Current Status */}
        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                {statusInfo.title}
              </h3>
              <p style={{ color: colors.textSecondary }}>{statusInfo.description}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
            {statusInfo.details.map((detail, index) => (
              <p key={index}>• {detail}</p>
            ))}
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Thông tin tài khoản
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Email:</span>
                <span style={{ color: colors.text }}>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Vai trò:</span>
                <span style={{ color: colors.text }}>{user.roles.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Trạng thái Vendor:</span>
                <span className="font-medium" style={{ color: colors.accent }}>
                  {user.approvedStatus || 'Chưa đăng ký'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Info */}
        {profile && (
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Thông tin Vendor
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Tên doanh nghiệp:</span>
                <span style={{ color: colors.text }}>{profile.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Email doanh nghiệp:</span>
                <span style={{ color: colors.text }}>{profile.businessEmail}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Số điện thoại:</span>
                <span style={{ color: colors.text }}>{profile.businessPhone}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Trạng thái:</span>
                <span className="font-medium" style={{ color: colors.accent }}>
                  {profile.status || 'Chưa đăng ký'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
