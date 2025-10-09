import { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  active?: boolean
  icon?: LucideIcon
}

export const navigationItems: NavItem[] = [
  {
    label: 'Artificial Societies',
    href: '/artificial-societies',
    active: true,
  },
  { label: 'Features', href: '/features' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Categories', href: '/categories' },
]

export const navigateMarketItems: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'Packages', href: '/packages' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
]

export const userNavigationItems: NavItem[] = [
  { label: 'Danh mục', href: '/categories' },
  { label: 'Đơn hàng', href: '/orders' },
  { label: 'Giỏ hàng', href: '/cart' },
]

export const adminNavigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Người dùng', href: '/admin/users' },
  { label: 'Sản phẩm', href: '/admin/products' },
  { label: 'Đơn hàng', href: '/admin/orders' },
]

import { LayoutDashboard, Package, ShoppingBag, BarChart3, User, Settings } from 'lucide-react'

export const vendorNavigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { label: 'Sản phẩm', href: '/vendor/products', icon: Package },
  { label: 'Đơn hàng', href: '/vendor/orders', icon: ShoppingBag },
  { label: 'Thống kê', href: '/vendor/analytics', icon: BarChart3 },
  { label: 'Cập nhật', href: '/vendor/update', icon: User },
  { label: 'Trạng thái', href: '/vendor/status', icon: Settings },
]
