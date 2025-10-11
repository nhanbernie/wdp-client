import Badge from '@/components/common/Badge'
import { Bell } from 'lucide-react'

const NotificationBadge = () => {
  return (
    <Badge>
      <Bell className="h-5 w-5" />
    </Badge>
  )
}

export default NotificationBadge
