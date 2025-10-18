import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'

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
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-primary/10 pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md">
              <span className="text-2xl">🔄</span>
            </div>
            Cập nhật trạng thái đơn hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <label className="flex text-sm font-bold text-gray-700 items-center gap-2">
              📊 Chọn trạng thái mới
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium shadow-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all"
            >
              ✓ Xác nhận
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
