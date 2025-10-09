'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { useVendorStatus } from './hooks/useVendorStatus'
import { useAuth } from '@/contexts/AuthContext'

export const VendorStatusPage: React.FC = () => {
  const { user } = useAuth()
  const { profile, statusInfo, loading, error, refetch } = useVendorStatus()

  const getStatusIcon = () => {
    switch (statusInfo.status) {
      case 'approved':
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case 'rejected':
        return <XCircle className="h-8 w-8 text-red-500" />
      case 'suspended':
        return <AlertTriangle className="h-8 w-8 text-orange-500" />
      default:
        return <Clock className="h-8 w-8 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải thông tin</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-6 mb-8">
          {/* <Link
            href="/vendor"
            className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link> */}

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
        <div
          className={`cart-card border rounded-xl p-6 ${statusInfo.bgColor} ${statusInfo.borderColor}`}
        >
          <div className="flex items-center gap-4 mb-4">
            {getStatusIcon()}
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
                <span className={`font-medium ${statusInfo.color}`}>
                  {user.approvedStatus || 'Chưa đăng ký'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Info */}
        {profile && (
          <div className="cart-card border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin Vendor</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tên doanh nghiệp:</span>
                <span className="text-foreground">{profile.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email doanh nghiệp:</span>
                <span className="text-foreground">{profile.businessEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số điện thoại:</span>
                <span className="text-foreground">{profile.businessPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className={`font-medium ${statusInfo.color}`}>
                  {profile.approvedStatus || 'Chưa đăng ký'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

