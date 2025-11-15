'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2, Package, DollarSign, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { Product, ProductVariant } from '@/services/vendor/vendor.types'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductDetailPageProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onEdit,
  onDelete,
  isLoading,
}) => {
  const router = useRouter()
  const { colors } = useTheme()
  const handleBack = () => {
    router.push('/vendor/product-management')
  }

  const handleEdit = () => {
    onEdit(product)
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      onDelete(product.id)
      router.push('/vendor/product-management')
    }
  }

  const formatPrice = (price: number | string, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency,
    }).format(Number(price))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-muted-foreground">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="text-muted-foreground mt-2">Chi tiết sản phẩm</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
          <Button variant="warning" onClick={handleDelete} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={product.thumbnail || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder.jpg'
                    }}
                  />
                </div>

                {/* Gallery */}
                {product.images && product.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images
                      .filter((image) => image && typeof image === 'string' && image.trim() !== '')
                      .map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-md overflow-hidden bg-muted border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/placeholder.jpg'
                            }}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Thông tin nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Tồn kho</span>
                </div>
                <span className="font-semibold">
                  {product.stock?.quantity || product.stockQty}{' '}
                  {product.stock?.unit || product.stockUnit}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Giá bán</span>
                </div>
                <span className="font-semibold">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>
              {product.salePrice && Number(product.salePrice) < Number(product.price) && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Giá khuyến mãi</span>
                    <span className="font-semibold text-destructive">
                      {formatPrice(product.salePrice, product.currency)}
                    </span>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">Danh mục</span>
                </div>
                <span className="font-semibold">{product.category?.name || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="specs">Thông số</TabsTrigger>
              <TabsTrigger value="options">Tùy chọn</TabsTrigger>
              <TabsTrigger value="variants">Biến thể</TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <CardDescription>Chi tiết về sản phẩm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Mô tả ngắn</h3>
                    <p className="text-muted-foreground">
                      {product.shortDescription || 'Không có mô tả'}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Mô tả chi tiết</h3>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: product.description || 'Không có mô tả chi tiết',
                      }}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Thông tin khác</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Slug:</span>
                        <span className="ml-2 font-medium">{product.slug}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Thương hiệu:</span>
                        <span className="ml-2 font-medium">{product.brand || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Đơn vị:</span>
                        <span className="ml-2 font-medium">
                          {product.stock?.unit || product.stockUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tiền tệ:</span>
                        <span className="ml-2 font-medium">{product.currency}</span>
                      </div>
                      {product.variants && product.variants.length > 0 && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">SKU (Variants):</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {product.variants.map((variant: ProductVariant, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {variant.sku}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {product.badges && product.badges.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">Nhãn</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.badges.map((badge, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                              style={{
                                backgroundImage: 'none',
                                backgroundColor: colors.accent + '20',
                                color: colors.accent,
                                borderColor: 'transparent',
                              }}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {product.datasheetUrl && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">Tài liệu</h3>
                        <a
                          href={product.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Xem datasheet →
                        </a>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specs Tab */}
            <TabsContent value="specs">
              <Card>
                <CardHeader>
                  <CardTitle>Thông số kỹ thuật</CardTitle>
                  <CardDescription>Các thông số chi tiết của sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.specs && Object.keys(product.specs).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b last:border-0">
                          <span className="font-medium text-foreground">{key}</span>
                          <span className="text-muted-foreground">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Chưa có thông số kỹ thuật
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Options Tab */}
            <TabsContent value="options">
              <Card>
                <CardHeader>
                  <CardTitle>Tùy chọn sản phẩm</CardTitle>
                  <CardDescription>
                    Các tùy chọn có sẵn (ví dụ: Màu sắc, Kích thước)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {product.options && product.options.length > 0 ? (
                    <div className="space-y-4">
                      {product.options.map((option, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{option.name}</h4>
                          <div className="flex flex-wrap gap-2">
                            {option.values.map((value, vIndex) => (
                              <Badge
                                key={vIndex}
                                variant="secondary"
                                className="text-xs"
                                style={{
                                  backgroundImage: 'none',
                                  backgroundColor: colors.accent + '20',
                                  color: colors.accent,
                                  borderColor: 'transparent',
                                }}
                              >
                                {typeof value === 'string' ? value : value.value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Chưa có tùy chọn nào</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Variants Tab */}
            <TabsContent value="variants">
              <Card>
                <CardHeader>
                  <CardTitle>Biến thể sản phẩm</CardTitle>
                  <CardDescription>Các phiên bản khác nhau của sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.variants && product.variants.length > 0 ? (
                    <div className="space-y-3">
                      {product.variants.map((variant: ProductVariant, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(variant.options || {}).map(([key, value]) => (
                                <Badge
                                  key={key}
                                  variant="secondary"
                                  className="text-xs"
                                  style={{
                                    backgroundImage: 'none',
                                    backgroundColor: colors.accent + '20',
                                    color: colors.accent,
                                    borderColor: 'transparent',
                                  }}
                                >
                                  {key}: {value}
                                </Badge>
                              ))}
                            </div>
                            {variant.sku && (
                              <span className="text-sm text-muted-foreground">
                                SKU: {variant.sku}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Giá:</span>
                              <span className="ml-2 font-semibold">
                                {formatPrice(variant.price, product.currency)}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tồn kho:</span>
                              <span className="ml-2 font-semibold">{variant.stockQty}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Chưa có biến thể nào</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
