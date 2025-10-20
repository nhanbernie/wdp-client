'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2, Package, DollarSign, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProductManagement } from '@/features/vendor/product-management/hooks/useProductManagement'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { products, deleteProduct } = useProductManagement()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (products && productId) {
      const foundProduct = products.find((p: any) => p.id === productId)
      setProduct(foundProduct)
    }
  }, [products, productId])

  const handleBack = () => {
    router.push('/vendor/products')
  }

  const handleEdit = () => {
    router.push(`/vendor/products/${productId}/edit`)
  }

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(productId)
      router.push('/vendor/products')
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  const getStockBadge = () => {
    const quantity = product.stock?.quantity || 0
    if (quantity === 0) {
      return <Badge variant="destructive">Hết hàng</Badge>
    } else if (quantity < 10) {
      return <Badge className="bg-orange-500">Sắp hết</Badge>
    }
    return <Badge className="bg-green-500">Còn hàng</Badge>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: product.currency || 'VND',
    }).format(price)
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
          <Button variant="destructive" onClick={handleDelete} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Xóa
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá bán</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
            {product.salePrice && (
              <p className="text-xs text-green-600">Giảm giá: {formatPrice(product.salePrice)}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kho hàng</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{product.stock?.quantity || 0}</div>
            <p className="text-xs text-muted-foreground">{product.stock?.unit || 'đơn vị'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trạng thái</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStockBadge()}</div>
            <p className="text-xs text-muted-foreground">Tình trạng kho</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            <TabsTrigger value="description">Mô tả</TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Tên sản phẩm
                    </label>
                    <p className="text-foreground mt-1">{product.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    <p className="text-foreground mt-1">{product.slug}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Thương hiệu</label>
                    <p className="text-foreground mt-1">{product.brand}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Danh mục</label>
                    <p className="text-foreground mt-1">{product.category?.name || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giá & Kho hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Giá gốc</label>
                    <p className="text-foreground mt-1">{formatPrice(product.price)}</p>
                  </div>
                  {product.salePrice && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Giá khuyến mãi
                      </label>
                      <p className="text-foreground mt-1">{formatPrice(product.salePrice)}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Số lượng</label>
                    <p className="text-foreground mt-1">
                      {product.stock?.quantity} {product.stock?.unit}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Đơn vị tiền tệ
                    </label>
                    <p className="text-foreground mt-1">{product.currency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ảnh đại diện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={product.thumbnail || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {product.images && product.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Thư viện ảnh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((img: any, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        <Image
                          src={typeof img === 'string' ? img : img.url}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mô tả ngắn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {product.shortDescription || 'Chưa có mô tả ngắn'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mô tả chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {product.description || 'Chưa có mô tả chi tiết'}
                </p>
              </CardContent>
            </Card>

            {product.datasheetUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Tài liệu kỹ thuật</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={product.datasheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Xem datasheet →
                  </a>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
