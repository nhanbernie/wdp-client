'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MessageCircle, Zap, Scale, Battery, Shield, FileText, Sparkles } from 'lucide-react'
import React from 'react'

interface ProductTabsProps {
  description?: string
  specs?: Record<string, any>
  colors: any
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ description, specs, colors }) => {
  const renderSpecs = () => {
    if (!specs || Object.keys(specs).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl mb-6">
            <Zap className="h-16 w-16 text-slate-300" />
          </div>
          <p className="text-lg font-semibold text-slate-600">Không có thông số kỹ thuật</p>
          <p className="text-sm text-slate-400 mt-2">Thông tin sẽ được cập nhật sớm</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {Object.entries(specs).map(([key, value], index) => {
          let displayValue = ''

          if (typeof value === 'object' && value !== null) {
            displayValue =
              value.value && value.unit ? `${value.value} ${value.unit}` : JSON.stringify(value)
          } else {
            displayValue = String(value)
          }

          const getIcon = () => {
            switch (key.toLowerCase()) {
              case 'power':
              case 'coating':
              case 'size':
              case 'voc':
                return <Zap className="h-5 w-5 text-yellow-500" />
              case 'weight':
              case 'headtype':
              case 'expiry':
              case 'finish':
                return <Scale className="h-5 w-5 text-red-500" />
              case 'voltage':
              case 'threadpitch':
              case 'drytime':
              case 'standard':
                return <Battery className="h-5 w-5 text-green-500" />
              case 'warranty':
              case 'strengthclass':
              case 'protectionlevel':
              case 'coverage':
                return <Shield className="h-5 w-5 text-blue-500" />
              default:
                return <Sparkles className="h-5 w-5 text-purple-500" />
            }
          }

          return (
            <div
              key={key}
              className="group relative bg-gradient-to-r from-white to-slate-50/50 hover:from-slate-50 hover:to-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white border border-slate-200 group-hover:border-indigo-300 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                    {getIcon()}
                  </div>
                  <span className="capitalize font-bold text-base text-slate-700 group-hover:text-slate-900 transition-colors">
                    {key.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900 bg-white border border-slate-200 group-hover:border-indigo-300 px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md">
                    {displayValue}
                  </span>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-3/4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full transition-all duration-300"></div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Tabs defaultValue="description" className="mb-16">
      {/* Tabs Navigation - Ultra Modern */}
      <TabsList className="grid w-full grid-cols-3 rounded-3xl bg-white p-2 border-2 border-slate-200 shadow-2xl">
        {['description', 'specifications', 'reviews'].map((tab) => {
          const icons = {
            description: <FileText className="h-5 w-5" />,
            specifications: <Zap className="h-5 w-5" />,
            reviews: <MessageCircle className="h-5 w-5" />,
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
              className="py-4 px-6 text-base font-bold rounded-2xl flex items-center justify-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-indigo-300 data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-50 transition-all duration-300"
            >
              {icons[tab as keyof typeof icons]}
              <span className="hidden sm:inline">{labels[tab as keyof typeof labels]}</span>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {/* Tab Mô tả - Premium Design */}
      <TabsContent value="description" className="mt-8">
        <Card className="bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden hover:border-indigo-300 transition-all duration-300">
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">Mô tả sản phẩm</h3>
                <p className="text-indigo-100 text-sm mt-1 font-medium">
                  Thông tin chi tiết về sản phẩm
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-8 lg:p-12">
            {description ? (
              <div
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl mb-6">
                  <FileText className="h-16 w-16 text-slate-300" />
                </div>
                <p className="text-lg font-semibold text-slate-600">Chưa có mô tả sản phẩm</p>
                <p className="text-sm text-slate-400 mt-2">Thông tin sẽ được cập nhật sớm</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab Thông số - Premium Design */}
      <TabsContent value="specifications" className="mt-8">
        <Card className="bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden hover:border-emerald-300 transition-all duration-300">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl"></div>

            <div className="relative flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">Thông số kỹ thuật</h3>
                <p className="text-emerald-100 text-sm mt-1 font-medium">
                  Các thông số chi tiết của sản phẩm
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-8 lg:p-12">{renderSpecs()}</CardContent>
        </Card>
      </TabsContent>

      {/* Tab Đánh giá - Premium Design */}
      <TabsContent value="reviews" className="mt-8">
        <Card className="bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden hover:border-amber-300 transition-all duration-300">
          <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>

            <div className="relative flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">Đánh giá khách hàng</h3>
                <p className="text-amber-100 text-sm mt-1 font-medium">Phản hồi từ người dùng</p>
              </div>
            </div>
          </div>
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="py-16">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl blur-xl"></div>
                <div className="relative p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200">
                  <MessageCircle className="h-20 w-20 mx-auto text-amber-400" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">
                Tính năng đánh giá sẽ được cập nhật sớm
              </h4>
              <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                Chúng tôi đang hoàn thiện tính năng này để mang đến trải nghiệm tốt nhất cho bạn
              </p>

              {/* Coming soon badge */}
              <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg shadow-amber-300">
                <Sparkles className="h-5 w-5" />
                <span>Sắp ra mắt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
