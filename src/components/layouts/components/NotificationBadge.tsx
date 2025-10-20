import { Bell } from 'lucide-react'

const NotificationBadge = () => {
  // Số thông báo chưa đọc (có thể fetch từ API)
  const unreadCount = 0

  return (
    <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors group">
      <Bell className="h-5 w-5 text-slate-700 group-hover:text-indigo-600 transition-colors" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default NotificationBadge
