'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Plus, Edit, Trash2, Check, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  useGetAddressesQuery,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from '@/services/addresses'
import type { Address } from '@/services/addresses/types'
import { AddressFormDialog } from './AddressFormDialog'
import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AddressListProps {
  onSelectAddress?: (address: Address) => void
  showBackButton?: boolean
}

export const AddressList: React.FC<AddressListProps> = ({
  onSelectAddress,
  showBackButton = false,
}) => {
  const router = useRouter()
  const { colors } = useTheme()
  const { data, isLoading, refetch } = useGetAddressesQuery()
  const [deleteAddress] = useDeleteAddressMutation()
  const [setDefaultAddress] = useSetDefaultAddressMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null)

  const addresses = data?.data || []
  const canAddMore = addresses.length < 5

  // Sort: default first
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1
    if (!a.isDefault && b.isDefault) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleAddAddress = () => {
    setEditingAddress(null)
    setIsDialogOpen(true)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setIsDialogOpen(true)
  }

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id).unwrap()
      refetch()
      setDeletingAddressId(null)
    } catch (error) {
      console.error('Failed to delete address:', error)
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id).unwrap()
      refetch()
    } catch (error) {
      console.error('Failed to set default address:', error)
    }
  }

  const handleSelectAddress = (address: Address) => {
    onSelectAddress?.(address)
    router.back()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {showBackButton && (
          <Button variant="ghost" onClick={() => router.back()} style={{ color: colors.text }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Địa chỉ giao hàng
          </h2>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            Quản lý địa chỉ giao hàng của bạn (Tối đa 5 địa chỉ)
          </p>
        </div>
        {canAddMore && (
          <Button
            onClick={handleAddAddress}
            style={{
              backgroundColor: colors.accent,
              color: '#fff',
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm địa chỉ
          </Button>
        )}
      </div>

      {/* Address List */}
      {sortedAddresses.length === 0 ? (
        <Card
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <CardContent className="py-12 text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: colors.textSecondary }} />
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
              Chưa có địa chỉ nào
            </h3>
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
              Thêm địa chỉ giao hàng để đặt hàng nhanh hơn
            </p>
            {canAddMore && (
              <Button
                onClick={handleAddAddress}
                style={{
                  backgroundColor: colors.accent,
                  color: '#fff',
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm địa chỉ đầu tiên
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedAddresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="relative cursor-pointer hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: address.isDefault ? colors.accent : colors.border,
                  borderWidth: address.isDefault ? '2px' : '1px',
                }}
                onClick={() => onSelectAddress && handleSelectAddress(address)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold" style={{ color: colors.text }}>
                          {address.nickname || 'Địa chỉ giao hàng'}
                        </h3>
                        {address.isDefault && (
                          <Badge
                            style={{
                              backgroundImage: 'none',
                              backgroundColor: colors.accent + '20',
                              color: colors.accent,
                              borderColor: 'transparent',
                            }}
                          >
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm" style={{ color: colors.textSecondary }}>
                        <p className="font-medium" style={{ color: colors.text }}>
                          {address.recipientName}
                        </p>
                        <p>{address.recipientPhone}</p>
                        <p>
                          {address.addressLine}
                          {address.ward && `, ${address.ward}`}
                          {address.district && `, ${address.district}`}
                          {address.city && `, ${address.city}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 pt-4 border-t"
                    style={{ borderColor: colors.border }}
                  >
                    {onSelectAddress && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectAddress(address)
                        }}
                        style={{
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Chọn
                      </Button>
                    )}
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSetDefault(address.id)
                        }}
                        style={{ color: colors.accent }}
                      >
                        Đặt mặc định
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditAddress(address)
                      }}
                      style={{ color: colors.text }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeletingAddressId(address.id)
                      }}
                      style={{ color: colors.error }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <AddressFormDialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingAddress(null)
        }}
        address={editingAddress}
        onSuccess={() => {
          refetch()
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deletingAddressId !== null}
        onOpenChange={(open) => !open && setDeletingAddressId(null)}
      >
        <AlertDialogContent
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: colors.text }}>Xác nhận xóa địa chỉ</AlertDialogTitle>
            <AlertDialogDescription style={{ color: colors.textSecondary }}>
              Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingAddressId && handleDeleteAddress(deletingAddressId)}
              style={{
                backgroundColor: colors.error,
                color: '#fff',
              }}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
