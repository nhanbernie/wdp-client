'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle, Zap, FileText } from 'lucide-react'
import React from 'react'
import { ProductReviewList } from '@/features/orders/components'

import { ProductVariant } from '../types/products.types'

interface ProductTabsProps {
  productId: string
  description?: string
  specs?: Record<string, any>
  colors: any
  variants?: ProductVariant[]
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  productId,
  description,
  specs,
  colors,
  variants,
}) => {
  React.useEffect(() => {
    // Override ALL default tab styles with theme colors
    const styleId = 'product-tabs-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors])
  const renderSpecs = () => {
    if (!specs || Object.keys(specs).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div
            className="p-6 rounded-3xl mb-6"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          >
            <Zap className="h-16 w-16" style={{ color: colors.textSecondary }} />
          </div>
          <p className="text-lg font-semibold" style={{ color: colors.textSecondary }}>
            Không có thông số kỹ thuật
          </p>
          <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            Thông tin sẽ được cập nhật sớm
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {Object.entries(specs).map(([key, value], index) => {
          let displayValue = ''

          if (typeof value === 'object' && value !== null) {
            displayValue =
              value.value && value.unit ? `${value.value} ${value.unit}` : JSON.stringify(value)
          } else {
            displayValue = String(value)
          }

          return (
            <div
              key={key}
              className="flex items-center justify-between py-3 px-4 rounded-lg border"
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <span className="capitalize font-semibold text-sm" style={{ color: colors.text }}>
                {key.replace(/_/g, ' ')}
              </span>
              <span
                className="text-sm font-bold px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              >
                {displayValue}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Tabs defaultValue="description" className="mb-12">
      {/* Tabs Navigation */}
      <TabsList
        className="grid w-full grid-cols-3 rounded-xl p-1 shadow-sm border"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          borderColor: colors.border,
        }}
        data-tabs-list
      >
        {['description', 'specifications', 'reviews'].map((tab) => {
          const icons = {
            description: <FileText className="h-4 w-4" />,
            specifications: <Zap className="h-4 w-4" />,
            reviews: <MessageCircle className="h-4 w-4" />,
          }
          const labels = {
            description: 'Mô tả',
            specifications: 'Thông số',
            reviews: 'Đánh giá',
          }

          return (
            <TabsTrigger
              key={tab}
              value={tab}
              className="py-2.5 px-4 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                color: colors.textSecondary,
              }}
            >
              {icons[tab as keyof typeof icons]}
              <span className="hidden sm:inline">{labels[tab as keyof typeof labels]}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {/* Tab Mô tả */}
      <TabsContent value="description" className="mt-6">
        <Card
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <CardContent className="p-6 lg:p-8" style={{ backgroundColor: colors.cardBackground }}>
            {description ? (
              <div
                className="prose prose-base max-w-none leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:mb-3 [&>ul]:ml-5 [&>ul]:list-disc"
                style={{ color: colors.text }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div
                  className="p-4 rounded-xl mb-4"
                  style={{ backgroundColor: colors.cardBackgroundSecondary }}
                >
                  <FileText className="h-12 w-12" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-base font-semibold" style={{ color: colors.textSecondary }}>
                  Chưa có mô tả sản phẩm
                </p>
                <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                  Thông tin sẽ được cập nhật sớm
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab Thông số */}
      <TabsContent value="specifications" className="mt-6">
        <Card
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <CardContent className="p-6 lg:p-8" style={{ backgroundColor: colors.cardBackground }}>
            {renderSpecs()}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab Đánh giá */}
      <TabsContent value="reviews" className="mt-6">
        <Card
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            border: `1px solid ${colors.border}30`,
            boxShadow: `0 4px 12px ${colors.border}20`,
          }}
        >
          <CardContent className="p-6 lg:p-8" style={{ backgroundColor: colors.cardBackground }}>
            <ProductReviewList productId={productId} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
