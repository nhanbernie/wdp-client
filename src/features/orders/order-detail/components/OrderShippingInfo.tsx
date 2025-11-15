'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Package, CreditCard, User } from 'lucide-react'
import type { Order } from '@/services/orders/types'
import { useTheme } from '@/contexts/ThemeContext'

interface OrderShippingInfoProps {
  order: Order
}

export function OrderShippingInfo({ order }: OrderShippingInfoProps) {
  const { colors } = useTheme()

  return (
    <Card
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: colors.cardBackgroundSecondary,
        border: `1px solid ${colors.border}30`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      <CardHeader
        className="p-4 border-b"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          border: `1px solid ${colors.border}30`,
          boxShadow: `0 4px 12px ${colors.border}20`,
        }}
      >
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${colors.accent}15` }}>
            <MapPin className="h-5 w-5" style={{ color: colors.accent }} />
          </div>
          <span style={{ color: colors.text }}>Thông tin giao hàng</span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="space-y-4 pt-4 p-4"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
          }}
        >
          <h4
            className="font-bold mb-2 flex items-center gap-2 text-sm"
            style={{ color: colors.text }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${colors.textSecondary}10` }}
            >
              <User className="h-4 w-4" style={{ color: colors.textSecondary }} />
            </div>
            Người nhận
          </h4>
          <p className="text-base font-medium" style={{ color: colors.text }}>
            {order.shippingName}
          </p>
        </div>

        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
          }}
        >
          <h4
            className="font-bold mb-2 flex items-center gap-2 text-sm"
            style={{ color: colors.text }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${colors.textSecondary}10` }}
            >
              <MapPin className="h-4 w-4" style={{ color: colors.textSecondary }} />
            </div>
            Địa chỉ
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
            {order.shippingAddress}
            {order.shippingWard && `, ${order.shippingWard}`}
            {order.shippingDistrict && `, ${order.shippingDistrict}`}
            {order.shippingCity && `, ${order.shippingCity}`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h4
              className="font-bold mb-2 flex items-center text-sm gap-2"
              style={{ color: colors.text }}
            >
              <Phone className="h-4 w-4" style={{ color: colors.textSecondary }} />
              SĐT
            </h4>
            <p className="text-sm font-medium" style={{ color: colors.text }}>
              {order.shippingPhone}
            </p>
          </div>
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h4
              className="font-bold mb-2 flex items-center text-sm gap-2"
              style={{ color: colors.text }}
            >
              <CreditCard className="h-4 w-4" style={{ color: colors.textSecondary }} />
              Thanh toán
            </h4>
            <p className="text-sm font-medium uppercase" style={{ color: colors.text }}>
              {order.paymentMethod}
            </p>
          </div>
        </div>

        {order.trackingNumber && (
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            <h4
              className="font-bold mb-3 flex items-center gap-2 text-sm"
              style={{ color: colors.text }}
            >
              <Package className="h-5 w-5" style={{ color: colors.accent }} />
              Mã vận đơn
            </h4>
            <p
              className="text-sm font-mono p-3 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.accent,
                fontWeight: 'bold',
              }}
            >
              {order.trackingNumber}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
