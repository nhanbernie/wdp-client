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
import { useTheme } from '@/contexts/ThemeContext'

interface VendorProfileViewProps {
  profile: VendorProfile
  onEdit: () => void
}

export const VendorProfileView: React.FC<VendorProfileViewProps> = ({ profile, onEdit }) => {
  const { colors } = useTheme()

  const statusConfig = {
    pending: {
      label: 'Chờ phê duyệt',
      icon: Clock,
      bgColor: colors.warning + '20',
      textColor: colors.warning,
    },
    approved: {
      label: 'Đã phê duyệt',
      icon: CheckCircle,
      bgColor: colors.success + '20',
      textColor: colors.success,
    },
    rejected: {
      label: 'Bị từ chối',
      icon: XCircle,
      bgColor: colors.error + '20',
      textColor: colors.error,
    },
    suspended: {
      label: 'Tạm ngưng',
      icon: AlertCircle,
      bgColor: colors.warning + '20',
      textColor: colors.warning,
    },
  }

  const status = statusConfig[profile.status]
  const StatusIcon = status.icon

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentSecondary} 100%)`,
                }}
              >
                <Building2 className="w-10 h-10" style={{ color: colors.background }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                  {profile.businessName}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    style={{
                      backgroundImage: 'none',
                      backgroundColor: status.bgColor,
                      color: status.textColor,
                      borderColor: 'transparent',
                    }}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={onEdit}
              className="gap-2"
              style={{
                backgroundColor: colors.accent,
                color: colors.background,
              }}
            >
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem icon={Mail} label="Email" value={profile.businessEmail} colors={colors} />
            <InfoItem
              icon={Phone}
              label="Số điện thoại"
              value={profile.businessPhone}
              colors={colors}
            />
            <InfoItem
              icon={MapPin}
              label="Địa chỉ"
              value={profile.businessAddress}
              colors={colors}
            />
            <InfoItem icon={FileText} label="Mã số thuế" value={profile.taxId} colors={colors} />
            <InfoItem
              icon={FileText}
              label="Giấy phép kinh doanh"
              value={profile.businessLicense}
              colors={colors}
            />
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      {profile.businessDescription && (
        <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Mô tả doanh nghiệp
            </h3>
            <p className="leading-relaxed" style={{ color: colors.textSecondary }}>
              {profile.businessDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dates */}
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
            Thông tin thời gian
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <DateItem icon={Calendar} label="Ngày tạo" date={profile.createdAt} colors={colors} />
            <DateItem
              icon={Calendar}
              label="Cập nhật lần cuối"
              date={profile.updatedAt}
              colors={colors}
            />
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
  colors: any
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value, colors }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 p-2 rounded-lg" style={{ backgroundColor: colors.accent + '20' }}>
      <Icon className="w-4 h-4" style={{ color: colors.accent }} />
    </div>
    <div>
      <p className="text-sm" style={{ color: colors.textSecondary }}>
        {label}
      </p>
      <p className="font-medium" style={{ color: colors.text }}>
        {value}
      </p>
    </div>
  </div>
)

interface DateItemProps {
  icon: React.ElementType
  label: string
  date: string
  colors: any
}

const DateItem: React.FC<DateItemProps> = ({ icon: Icon, label, date, colors }) => (
  <div
    className="flex items-start gap-3 p-3 rounded-lg"
    style={{ backgroundColor: colors.cardBackgroundSecondary }}
  >
    <Icon className="w-5 h-5 mt-0.5" style={{ color: colors.textSecondary }} />
    <div>
      <p className="text-sm" style={{ color: colors.textSecondary }}>
        {label}
      </p>
      <p className="font-medium" style={{ color: colors.text }}>
        {format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })}
      </p>
    </div>
  </div>
)
