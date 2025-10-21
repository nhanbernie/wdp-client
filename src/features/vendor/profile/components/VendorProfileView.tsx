'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { VendorProfile } from '@/services/vendor/vendor.types'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface VendorProfileViewProps {
  profile: VendorProfile
  onEdit: () => void
}

const statusConfig = {
  pending: { label: 'Chờ phê duyệt', icon: Clock, className: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Đã phê duyệt', icon: CheckCircle, className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Bị từ chối', icon: XCircle, className: 'bg-red-100 text-red-800' },
  suspended: { label: 'Tạm ngưng', icon: AlertCircle, className: 'bg-orange-100 text-orange-800' },
}

export const VendorProfileView: React.FC<VendorProfileViewProps> = ({ profile, onEdit }) => {
  const status = statusConfig[profile.status]
  const StatusIcon = status.icon

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {profile.logo ? (
                <img
                  src={profile.logo}
                  alt={profile.businessName}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.businessName}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={status.className}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                  {profile.isVerified && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đã xác minh
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={onEdit} className="gap-2">
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem icon={Mail} label="Email" value={profile.businessEmail} />
            <InfoItem icon={Phone} label="Số điện thoại" value={profile.businessPhone} />
            <InfoItem icon={MapPin} label="Địa chỉ" value={profile.businessAddress} />
            <InfoItem icon={FileText} label="Mã số thuế" value={profile.taxId} />
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      {profile.description && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả doanh nghiệp</h3>
            <p className="text-gray-600 leading-relaxed">{profile.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Dates */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thời gian</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <DateItem icon={Calendar} label="Ngày tạo" date={profile.createdAt} />
            <DateItem icon={Calendar} label="Cập nhật lần cuối" date={profile.updatedAt} />
            {profile.approvedAt && (
              <DateItem icon={CheckCircle} label="Ngày phê duyệt" date={profile.approvedAt} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ElementType
  label: string
  value: string
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 p-2 rounded-lg bg-blue-50">
      <Icon className="w-4 h-4 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
)

interface DateItemProps {
  icon: React.ElementType
  label: string
  date: string
}

const DateItem: React.FC<DateItemProps> = ({ icon: Icon, label, date }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
    <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">
        {format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })}
      </p>
    </div>
  </div>
)
