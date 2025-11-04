'use client'

import React from 'react'
import { motion } from 'framer-motion'
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

interface ProductTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function ProductTable({ products, onView, onEdit, onDelete, isLoading }: ProductTableProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND',
    }).format(price)
  }

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) {
      return (
        <Badge variant="destructive" className="text-xs">
          Hết hàng
        </Badge>
      )
    }
    if (quantity < 10) {
      return (
        <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
          Sắp hết
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="text-xs text-green-600 border-green-600">
        Còn hàng
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Chưa có sản phẩm nào</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Sản phẩm
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Danh mục
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Giá</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Tồn kho
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((product, index) => (
            <motion.tr
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-muted/50 transition-colors duration-150"
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
                    <p className="text-xs text-muted-foreground">SKU: {product.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {product.category?.name || 'N/A'}
              </td>
              <td className="px-4 py-3">
                <div>
                  {product.salePrice && Number(product.salePrice) < Number(product.price) ? (
                    <>
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(Number(product.salePrice), product.currency)}
                      </p>
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(Number(product.price), product.currency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">
                      {formatPrice(Number(product.price), product.currency)}
                    </p>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="text-sm text-foreground">
                    {product.stockQty} {product.stockUnit}
                  </p>
                  {getStockBadge(product.stockQty)}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {product.badges?.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
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
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
