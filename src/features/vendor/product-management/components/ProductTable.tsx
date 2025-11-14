'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Eye, MoreVertical, Edit, Trash2, Package, Loader2 } from 'lucide-react'
import { Product } from '@/services/vendor/vendor.types'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function ProductTable({ products, onView, onEdit, onDelete, isLoading }: ProductTableProps) {
  const { colors } = useTheme()

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND',
    }).format(price)
  }

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return (
        <Badge
          variant="destructive"
          className="text-xs"
          style={{
            backgroundImage: 'none',
            backgroundColor: colors.error + '20',
            color: colors.error,
            borderColor: 'transparent',
          }}
        >
          Hết hàng
        </Badge>
      )
    }
    if (quantity < 10) {
      return (
        <Badge
          variant="outline"
          className="text-xs"
          style={{
            backgroundImage: 'none',
            backgroundColor: colors.warning + '20',
            color: colors.warning,
            borderColor: 'transparent',
          }}
        >
          Sắp hết
        </Badge>
      )
    }
    return (
      <Badge
        variant="outline"
        className="text-xs"
        style={{
          backgroundImage: 'none',
          backgroundColor: colors.success + '20',
          color: colors.success,
          borderColor: 'transparent',
        }}
      >
        Còn hàng
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 mx-auto mb-4" style={{ color: colors.border }} />
        <p style={{ color: colors.textSecondary }}>Chưa có sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead style={{ backgroundColor: colors.cardBackgroundSecondary }}>
          <tr>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Sản phẩm
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Danh mục
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Giá
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Tồn kho
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Trạng thái
            </th>
            <th
              className="px-4 py-3 text-center text-sm font-semibold"
              style={{ color: colors.text }}
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody style={{ borderColor: colors.border }}>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="transition-colors duration-150"
              style={{
                borderBottomWidth: '1px',
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.thumbnail || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    {product.variants && product.variants.length > 0 ? (
                      <p className="text-xs text-muted-foreground">
                        SKU: {product.variants[0].sku}
                        {product.variants.length > 1 && ` (+${product.variants.length - 1} variants)`}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Không có SKU</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm" style={{ color: colors.textSecondary }}>
                {product.category?.name || 'N/A'}
              </td>
              <td className="px-4 py-3">
                <div>
                  {product.salePrice && Number(product.salePrice) < Number(product.price) ? (
                    <>
                      <p className="text-sm font-semibold" style={{ color: colors.text }}>
                        {formatPrice(Number(product.salePrice), product.currency)}
                      </p>
                      <p className="text-xs line-through" style={{ color: colors.textSecondary }}>
                        {formatPrice(Number(product.price), product.currency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-semibold" style={{ color: colors.text }}>
                      {formatPrice(Number(product.price), product.currency)}
                    </p>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="text-sm" style={{ color: colors.text }}>
                    {product.stockQty} {product.stockUnit}
                  </p>
                  {getStockBadge(product.stockQty)}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {product.badges?.map((badge) => (
                    <Badge
                      key={badge}
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
              </td>
              <td className="px-4 py-3 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onView(product)} className="gap-2">
                      <Eye className="h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(product)} className="gap-2">
                      <Edit className="h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(product.id)}
                      className="gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa sản phẩm
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
