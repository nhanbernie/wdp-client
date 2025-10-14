'use client'
import { calculateDiscountPercentage, formatCurrency } from '@/lib/utils'
import { ProductDto } from '@/services/api/product.type'
import Image from 'next/image'
import { Badge } from '../ui/badge'

type Props = {
  data: ProductDto
}

const ProductCard = ({ data }: Props) => {
  return (
    <div className="h-96 cursor-pointer bg-[var(--card-background)] group">
      <div className="h-2/3 relative overflow-hidden">
        {data.salePrice && (
          <div className="absolute z-10 bg-red-500 top-1 left-1 rounded-lg px-2 py-1">
            <p className="text-[0.8rem]">
              -{calculateDiscountPercentage(data.price, data.salePrice)}%
            </p>
          </div>
        )}
        <Image
          src={data.thumbnail || '/images/placeholders/category-default.png'}
          alt={data.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>
      <div className="h-1/3 p-2 text-[var(--secondary-foreground)]">
        <Badge className="border-1 border-gray-300 text-gray-300">{data.brand}</Badge>
        <h1 className="font-bold text-[1.1rem] line-clamp-2 mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
          {data.name}
        </h1>
        <p className="text-[0.9rem] text-[var(--primary)] flex gap-2">
          <span className={`${data.salePrice && 'text-gray-400 line-through'}`}>
            {formatCurrency(data.price, data.currency)}
          </span>
          {data.salePrice && <span>{formatCurrency(data.salePrice, data.currency)}</span>}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
