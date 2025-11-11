import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/common/Dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { XCircle, FileText, DollarSign } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { colors } = useTheme()
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
      <DialogContent className="max-w-lg" style={{ background: colors.cardBackground }}>
        <DialogHeader className="pb-4" style={{ borderBottomColor: colors.border }}>
          <DialogTitle className="flex items-center gap-3 text-2xl" style={{ color: colors.text }}>
            <div className="p-2 rounded-xl shadow-md" style={{ background: colors.error }}>
              <XCircle className="w-6 h-6 text-white" />
            </div>
            Hủy đơn hàng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <label
              className="flex text-sm font-bold items-center gap-2"
              style={{ color: colors.text }}
            >
              <FileText className="w-4 h-4" />
              Lý do hủy đơn <span style={{ color: colors.error }}>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-4 rounded-xl min-h-[120px] transition-all"
              style={{
                background: colors.cardBackgroundSecondary,
                color: colors.text,
                borderWidth: '2px',
                borderColor: colors.border,
              }}
              placeholder="Nhập lý do hủy đơn hàng..."
            />
          </div>
          <div
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: colors.cardBackgroundSecondary, borderColor: colors.border }}
          >
            <Checkbox
              id="refund"
              checked={refund}
              onCheckedChange={(checked) => setRefund(checked as boolean)}
              className="w-5 h-5"
            />
            <label
              htmlFor="refund"
              className="text-sm font-medium flex items-center gap-2"
              style={{ color: colors.text }}
            >
              <DollarSign className="w-4 h-4" />
              Hoàn tiền cho khách hàng
            </label>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose} className="shadow-sm">
              Hủy bỏ
            </Button>
            <Button
              onClick={handleConfirm}
              className="text-white shadow-lg"
              style={{ background: colors.error }}
            >
              Xác nhận hủy đơn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
