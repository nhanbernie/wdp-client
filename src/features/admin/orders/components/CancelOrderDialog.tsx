import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface CancelOrderDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string, refund: boolean) => void
}

export const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState('')
  const [refund, setRefund] = useState(false)

  const handleConfirm = () => {
    if (!reason.trim()) {
      alert('Vui lòng nhập lý do hủy đơn')
      return
    }
    onConfirm(reason, refund)
    setReason('')
    setRefund(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-red-100 pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 shadow-md">
              <span className="text-2xl">❌</span>
            </div>
            Hủy đơn hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="flex text-sm font-bold text-gray-700 items-center gap-2">
              📝 Lý do hủy đơn <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl min-h-[120px] focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Nhập lý do hủy đơn hàng..."
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <Checkbox
              id="refund"
              checked={refund}
              onCheckedChange={(checked) => setRefund(checked as boolean)}
              className="w-5 h-5"
            />
            <label
              htmlFor="refund"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              💰 Hoàn tiền cho khách hàng
            </label>
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
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              ✓ Xác nhận hủy đơn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
