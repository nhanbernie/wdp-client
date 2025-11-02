'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useUserProfile } from './hooks/useUserProfile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Loader2, User, Mail, Phone, Calendar, Shield, Edit } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema, UpdateProfileFormData } from './schemas/profile.schema'
import { BecomeVendorCard } from './components/BecomeVendorCard'

export const UserProfilePage: React.FC = () => {
  const { profile, isLoading, handleUpdateProfile, isUpdating } = useUserProfile()
  const [isEditing, setIsEditing] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    values: profile
      ? {
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          phoneNumber: profile.phoneNumber || '',
        }
      : undefined,
  })

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      await handleUpdateProfile(data)
      setIsEditing(false)
    } catch (error) {
      // Error handled in hook
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-gray-500">Không tìm thấy thông tin người dùng</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            Thông tin cá nhân
          </h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
        </div>

        <div className="grid gap-6">
          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông tin tài khoản</CardTitle>
                <Button
                  variant={isEditing ? 'outline' : 'default'}
                  onClick={() => {
                    if (isEditing) {
                      reset()
                    }
                    setIsEditing(!isEditing)
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Họ</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{profile.lastName}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Tên</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{profile.firstName}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Email</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{profile.email}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Số điện thoại</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {profile.phoneNumber || 'Chưa cập nhật'}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Vai trò</span>
                    </div>
                    <div className="flex gap-2">
                      {profile.roles.map((role) => (
                        <Badge key={role} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Ngày tham gia</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(profile.createdAt), 'dd/MM/yyyy', { locale: vi })}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lastName">Họ</Label>
                      <Input id="lastName" {...register('lastName')} />
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="firstName">Tên</Label>
                      <Input id="firstName" {...register('firstName')} />
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input id="phoneNumber" {...register('phoneNumber')} />
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset()
                        setIsEditing(false)
                      }}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang lưu...
                        </>
                      ) : (
                        'Lưu thay đổi'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái tài khoản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Trạng thái</span>
                <Badge variant={profile.isActive ? 'default' : 'destructive'}>
                  {profile.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Become Vendor Card */}
          <BecomeVendorCard />
        </div>
      </motion.div>
    </div>
  )
}
