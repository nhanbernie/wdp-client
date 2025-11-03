'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle, Zap, Scale, Battery, Shield, FileText, Sparkles } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface ProductTabsProps {
  description?: string
  specs?: Record<string, any>
  colors: any
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ description, specs, colors }) => {
  React.useEffect(() => {
    // Override ALL default tab styles with theme colors
    const styleId = 'product-tabs-theme-styles'
    let style = document.getElementById(styleId) as HTMLStyleElement
    
    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }
    
    style.textContent = `
      /* Override TabsList default gradient */
      [data-tabs-list] {
        background: ${colors.cardBackgroundSecondary} !important;
        background-image: none !important;
        border-color: ${colors.border} !important;
      }
      
      /* Override TabsTrigger - Active state */
      [data-tabs-list] button[data-state="active"] {
        background: ${colors.cardBackground} !important;
        background-image: none !important;
        background-color: ${colors.cardBackground} !important;
        color: ${colors.text} !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
        transform: none !important;
      }
      
      /* Override TabsTrigger - Inactive state */
      [data-tabs-list] button[data-state="inactive"] {
        background: transparent !important;
        background-image: none !important;
        background-color: transparent !important;
        color: ${colors.textSecondary} !important;
      }
      
      /* Override TabsTrigger - Hover */
      [data-tabs-list] button[data-state="inactive"]:hover {
        background: ${colors.hoverBackground} !important;
        background-image: none !important;
        background-color: ${colors.hoverBackground} !important;
      }
      
      /* Override icon colors */
      [data-tabs-list] button[data-state="inactive"] svg {
        color: ${colors.textSecondary} !important;
      }
      [data-tabs-list] button[data-state="active"] svg {
        color: ${colors.text} !important;
      }
    `
    
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
              <span 
                className="capitalize font-semibold text-sm"
                style={{ color: colors.text }}
              >
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
          <CardContent 
            className="p-6 lg:p-8"
            style={{ backgroundColor: colors.cardBackground }}
          >
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
          <CardContent 
            className="p-6 lg:p-8"
            style={{ backgroundColor: colors.cardBackground }}
          >
            {renderSpecs()}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab Đánh giá */}
      <TabsContent value="reviews" className="mt-6">
        <Card 
          className="rounded-xl shadow-lg overflow-hidden"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <CardContent 
            className="p-6 lg:p-8 text-center"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <div className="py-12">
              <div className="inline-block mb-6">
                <div 
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                  }}
                >
                  <MessageCircle className="h-12 w-12 mx-auto" style={{ color: colors.textSecondary }} />
                </div>
              </div>
              <h4 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                Tính năng đánh giá sẽ được cập nhật sớm
              </h4>
              <p className="text-sm max-w-md mx-auto leading-relaxed mb-6" style={{ color: colors.textSecondary }}>
                Chúng tôi đang hoàn thiện tính năng này để mang đến trải nghiệm tốt nhất cho bạn
              </p>

              {/* Coming soon badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 text-white text-xs font-bold rounded-full shadow-sm"
                style={{ backgroundColor: colors.textSecondary }}
              >
                <Sparkles className="h-4 w-4" />
                <span>Sắp ra mắt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
