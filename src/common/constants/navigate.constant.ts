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
  { label: 'Trang chủ', href: '/' },
  { label: 'Danh mục', href: '/categories' },
  { label: 'Đơn hàng', href: '/orders' },
  { label: 'Báo giá', href: '/quote-requests' },
]

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  User,
  Settings,
  Users,
  MessageSquareQuote,
  DollarSign,
  Wallet,
} from 'lucide-react'

export const adminNavigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Quản lý người dùng', href: '/admin/user-management', icon: Users },
  { label: 'Quản lý đơn hàng', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Quản lý sản phẩm', href: '/admin/manage-product', icon: Package },
  { label: 'Yêu cầu rút tiền', href: '/admin/withdrawals', icon: DollarSign },
  { label: 'Thống kê', href: '/admin/analytics', icon: BarChart3 },
]

export const vendorNavigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { label: 'Thông tin Vendor', href: '/vendor/profile', icon: User },
  { label: 'Quản lý sản phẩm', href: '/vendor/product-management', icon: Package },
  { label: 'Yêu cầu báo giá', href: '/vendor/quotes', icon: MessageSquareQuote },
  { label: 'Đơn hàng', href: '/vendor/orders', icon: ShoppingBag },
  { label: 'Ví', href: '/vendor/wallet', icon: Wallet },
]
