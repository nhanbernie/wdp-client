import Badge from '@/components/common/Badge'
import { Bell } from 'lucide-react'
import Link from 'next/link'

const NotificationBadge = () => {
  return (
    <Link href="/cart" className="hover:opacity-80 transition-opacity">
      <Badge>
        <Bell className="h-5 w-5" />
      </Badge>
    </Link>
  )
}

export default NotificationBadge
