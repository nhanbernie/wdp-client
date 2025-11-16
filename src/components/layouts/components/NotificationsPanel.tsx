'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface NotificationItem {
  id: string
  title: string
  createdAt: Date
}

interface NotificationsPanelProps {
  open: boolean
  items: NotificationItem[]
  onClose: () => void
  onMarkRead?: () => void
  className?: string
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  open,
  items,
  onClose,
  onMarkRead,
  className,
}) => {
  if (!open) return null

  return (
    <div
      className={cn(
        'absolute right-0 mt-2 w-80 rounded-2xl shadow-xl backdrop-blur-xl p-4 z-50',
        'bg-white/70 dark:bg-black/40',
        className,
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold">Thông báo</p>
        <div className="flex items-center gap-2">
          {onMarkRead && (
            <button
              className="text-xs opacity-80 hover:opacity-100"
              onClick={onMarkRead}
            >
              Đánh dấu đã đọc
            </button>
          )}
          <button className="text-xs opacity-80 hover:opacity-100" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
      <ul className="space-y-3 max-h-72 overflow-auto">
        {items.length === 0 ? (
          <li className="text-xs opacity-70">Chưa có thông báo</li>
        ) : (
          items.map((n) => (
            <li key={n.id} className="text-xs leading-relaxed">
              <div className="font-medium">{n.title}</div>
              <div className="opacity-60">
                {new Date(n.createdAt).toLocaleString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                })}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}


