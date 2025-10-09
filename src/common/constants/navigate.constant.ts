export interface NavItem {
  label: string
  href: string
  active?: boolean
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

export const vendorNavigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/vendor' },
  { label: 'Sản phẩm', href: '/vendor/products' },
  { label: 'Đơn hàng', href: '/vendor/orders' },
  { label: 'Thống kê', href: '/vendor/analytics' },
]
