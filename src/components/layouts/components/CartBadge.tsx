'use client'

import Badge from '@/components/common/Badge'
import { ShoppingCart } from 'lucide-react'
import { useCartApi } from '@/features/cart/hooks'
import Link from 'next/link'

const CartBadge = () => {
  const { cartCount } = useCartApi()

  return (
    <Link href="/cart" className="hover:opacity-80 transition-opacity">
      <Badge count={cartCount}>
        <ShoppingCart className="h-5 w-5" />
      </Badge>
    </Link>
  )
}

export default CartBadge
