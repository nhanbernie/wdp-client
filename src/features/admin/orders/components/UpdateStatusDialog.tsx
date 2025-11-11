import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import { RefreshCw, ListChecks } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface UpdateStatusDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (status: string) => void
  currentStatus: string
}

export const UpdateStatusDialog: React.FC<UpdateStatusDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
}) => {
  const { colors } = useTheme()
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  const statusOptions = [
    { value: 'pending', label: 'Chờ xử lý' },
    { value: 'processing', label: 'Đang xử lý' },
    { value: 'shipping', label: 'Đang giao' },
    { value: 'delivered', label: 'Đã giao' },
    { value: 'cancelled', label: 'Đã hủy' },
  ]

  const handleConfirm = () => {
    onConfirm(selectedStatus)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" style={{ background: colors.cardBackground }}>
        <DialogHeader className="pb-4" style={{ borderBottomColor: colors.border }}>
          <DialogTitle className="flex items-center gap-3 text-2xl" style={{ color: colors.text }}>
            <div className="p-2 rounded-xl shadow-md" style={{ background: colors.accent }}>
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            Cập nhật trạng thái đơn hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <label
              className="flex text-sm font-bold items-center gap-2"
              style={{ color: colors.text }}
            >
              <ListChecks className="w-4 h-4" />
              Chọn trạng thái mới
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-4 rounded-xl font-medium shadow-sm transition-all"
              style={{
                background: colors.cardBackgroundSecondary,
                color: colors.text,
                borderWidth: '2px',
                borderColor: colors.border,
              }}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} className="shadow-sm">
              Hủy bỏ
            </Button>
            <Button
              onClick={handleConfirm}
              className="text-white shadow-lg"
              style={{ background: colors.accent }}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
