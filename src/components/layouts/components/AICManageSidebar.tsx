import {
  adminNavigationItems,
  navigationItems,
  vendorNavigationItems,
} from '@/common/constants/navigate.constant'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  userRole: 'admin' | 'vendor'
  className?: string
}

const AICManageSidebar = ({ userRole, className }: Props) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return adminNavigationItems
      case 'vendor':
        return vendorNavigationItems
      default:
        return navigationItems
    }
  }

  const currentNavigationItems = getNavigationItems()
  return (
    <div className={`${sidebarExpanded ? 'w-64' : 'w-20'} ${className}`}>
      <div>
        {sidebarExpanded ? (
          <h2 className="text-2xl font-bold p-4">AIC Manage</h2>
        ) : (
          <h2 className="text-2xl font-bold p-4">AM</h2>
        )}
      </div>
      {currentNavigationItems.map((item) => {
        const Icon = item.icon
        return (
          <div className="px-4 py-2 hover:bg-[var(--priamry)]">
            <Link href={item.href}>
              <div className="flex gap-2 text-[0.9rem]">
                {Icon && <Icon className="mr-2" />}
                <p>{item.label}</p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default AICManageSidebar
