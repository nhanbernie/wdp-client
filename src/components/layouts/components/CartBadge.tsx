'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartApi } from '@/features/cart/hooks'
import Link from 'next/link'

const CartBadge = () => {
  const { cartCount } = useCartApi()

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group"
    >
      <ShoppingCart className="h-5 w-5 text-slate-700 group-hover:text-indigo-600 transition-colors" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </Link>
  )
}

export default CartBadge
