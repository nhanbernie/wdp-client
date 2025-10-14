'use client'

import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

interface ProductInfoProps {
  category?: string
  name: string
  brand?: string
  price: number
  salePrice?: number
  colors: any
  brandColors: any
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  name,
  brand,
  price,
  salePrice,
  colors,
  brandColors,
}) => {
  return (
    <div>
      {category && (
        <Badge variant="outline" className="mb-2">
          {category}
        </Badge>
      )}

      <h1 className="text-3xl font-bold mb-2 text-foreground">{name}</h1>
      <p className="text-lg mb-4 text-muted-foreground">{brand}</p>

      {/* Fake rating */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium text-foreground">4.0</span>
          <span className="ml-1 text-muted-foreground">(12 đánh giá)</span>
        </div>
      </div>

      {/* Giá */}
      <div className="flex items-center space-x-4 mb-6">
        {salePrice ? (
          <>
            <span className="text-3xl font-bold text-primary">
              {salePrice.toLocaleString('vi-VN')} ₫
            </span>
            <span className="text-lg line-through text-muted-foreground">
              {price.toLocaleString('vi-VN')} ₫
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-primary">{price.toLocaleString('vi-VN')} ₫</span>
        )}
      </div>
    </div>
  )
}
