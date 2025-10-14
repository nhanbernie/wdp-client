'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Eye, MoreVertical, CheckCircle, XCircle, Ban, Trash2 } from 'lucide-react'
import { Vendor } from '@/services/vendor/vendor.types'
import { useRouter } from 'next/navigation'

interface VendorTableProps {
  vendors: Vendor[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onSuspend: (id: string) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function VendorTable({
  vendors,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
  isLoading,
}: VendorTableProps) {
  const router = useRouter()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Đã duyệt</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Chờ duyệt</Badge>
      case 'rejected':
        return <Badge variant="destructive">Từ chối</Badge>
      case 'suspended':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Đình chỉ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (vendors.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Không có vendor nào</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Tên doanh nghiệp
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Số điện thoại
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ngày tạo</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendors.map((vendor, index) => (
            <motion.tr
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-muted/50 transition-colors duration-150"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-foreground">{vendor.businessName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Mã số thuế: {vendor.taxId}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.businessEmail}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{vendor.businessPhone}</td>
              <td className="px-4 py-3">{getStatusBadge(vendor.status)}</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {formatDate(vendor.createdAt)}
              </td>
              <td className="px-4 py-3 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(`/admin/user-management/vendor/${vendor.id}`)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    {vendor.status === 'pending' && (
                      <>
                        <DropdownMenuItem onClick={() => onApprove(vendor.id)} className="gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Phê duyệt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onReject(vendor.id)} className="gap-2">
                          <XCircle className="h-4 w-4" />
                          Từ chối
                        </DropdownMenuItem>
                      </>
                    )}
                    {vendor.status === 'approved' && (
                      <DropdownMenuItem onClick={() => onSuspend(vendor.id)} className="gap-2">
                        <Ban className="h-4 w-4" />
                        Đình chỉ
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(vendor.id)}
                      className="gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa vendor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
