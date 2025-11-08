'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Address } from '@/services/addresses/types'
import { useTheme } from '@/contexts/ThemeContext'
import { AddressFormDialog } from '@/features/addresses/components'
import { useRouter } from 'next/navigation'
import { DefaultBadge } from './DefaultBadge'
interface AddressSelectionDialogProps {
  open: boolean
  onClose: () => void
  addresses: Address[]
  selectedAddressId?: string
  onSelect: (address: Address) => void
  onAddNew?: () => void
}

export const AddressSelectionDialog: React.FC<AddressSelectionDialogProps> = ({
  open,
  onClose,
  addresses,
  selectedAddressId,
  onSelect,
  onAddNew,
}) => {
  const router = useRouter()
  const { colors } = useTheme()
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [tempSelectedId, setTempSelectedId] = useState<string | undefined>(selectedAddressId)

  // Sync tempSelectedId when dialog opens or selectedAddressId changes
  useEffect(() => {
    if (open) {
      setTempSelectedId(selectedAddressId)
    }
  }, [open, selectedAddressId])

  const handleConfirm = () => {
    const selected = addresses.find((addr) => addr.id === tempSelectedId)
    if (selected) {
      onSelect(selected)
      onClose()
    }
  }

  const handleEdit = (address: Address, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingAddress(address)
    setIsFormOpen(true)
  }

  const handleAddNewClick = () => {
    setEditingAddress(null)
    setIsFormOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] overflow-y-auto p-0"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle style={{ color: colors.text }} className="text-xl">
                Địa Chỉ Của Tôi
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: colors.textSecondary }}
                  />
                  <p className="mb-6 text-base" style={{ color: colors.textSecondary }}>
                    Bạn chưa có địa chỉ nào. Hãy thêm địa chỉ mới!
                  </p>
                  <Button
                    onClick={handleAddNewClick}
                    style={{
                      backgroundColor: colors.accent,
                      color: '#fff',
                    }}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm địa chỉ mới
                  </Button>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => setTempSelectedId(address.id)}
                  >
                    {/* Radio Button */}
                    <div className="pt-1">
                      <input
                        type="radio"
                        name="address"
                        checked={tempSelectedId === address.id}
                        onChange={() => setTempSelectedId(address.id)}
                        className="w-5 h-5 cursor-pointer border-0"
                        style={{
                          accentColor: colors.accent,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    {/* Address Content */}
                    <div
                      className="flex-1 p-4 rounded-lg transition-all"
                      style={{
                        backgroundColor:
                          tempSelectedId === address.id
                            ? colors.cardBackgroundSecondary
                            : colors.cardBackground,
                        border: `1px solid ${colors.border}30`,
                        boxShadow:
                          tempSelectedId === address.id
                            ? `0 2px 8px ${colors.border}30`
                            : `0 1px 3px ${colors.border}15`,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <p className="font-semibold text-base" style={{ color: colors.text }}>
                              {address.recipientName}
                            </p>
                            <span style={{ color: colors.textSecondary }}>|</span>
                            <p className="font-semibold text-base" style={{ color: colors.text }}>
                              {address.recipientPhone}
                            </p>
                            {address.isDefault && (
                              <span className="ml-2">
                                <DefaultBadge />
                              </span>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                            {address.addressLine}
                            {address.ward && `, ${address.ward}`}
                            {address.district && `, ${address.district}`}
                            {address.city && `, ${address.city}`}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleEdit(address, e)}
                          className="hover:bg-transparent"
                          style={{
                            color: colors.accent,
                            padding: '0.25rem 0.5rem',
                          }}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {addresses.length > 0 && (
              <div className="flex items-center justify-between pt-6 mt-6">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/addresses')}
                  style={{
                    color: colors.text,
                    backgroundColor: `${colors.textSecondary}15`,
                  }}
                  className="hover:opacity-80"
                >
                  Quản lý địa chỉ
                </Button>
                <Button
                  onClick={handleAddNewClick}
                  variant="ghost"
                  style={{
                    color: colors.accent,
                  }}
                  className="gap-2 hover:bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Thêm địa chỉ mới
                </Button>
              </div>
            )}
          </div>

          <DialogFooter
            className="px-6 py-4 gap-2"
            style={{
              backgroundColor: colors.cardBackground,
            }}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              style={{
                color: colors.text,
              }}
            >
              Huỷ
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!tempSelectedId}
              style={{
                backgroundColor: tempSelectedId ? colors.accent : colors.textSecondary,
                color: '#fff',
              }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Address Form Dialog */}
      <AddressFormDialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingAddress(null)
        }}
        address={editingAddress}
        onSuccess={() => {
          setIsFormOpen(false)
          setEditingAddress(null)
          if (onAddNew) {
            onAddNew()
          }
        }}
      />
    </>
  )
}
