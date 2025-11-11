'use client'

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  MoreVertical,
  Eye,
  Ban,
  Check,
  UserCog,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
} from 'lucide-react'
import { UserListItem } from '@/services/admin/users.service'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { useTheme } from '@/contexts/ThemeContext'

// Helper function to safely format date
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    return format(date, 'dd/MM/yyyy')
  } catch (error) {
    return 'N/A'
  }
}

interface UserTableProps {
  users: UserListItem[]
  isLoading?: boolean
  onViewActivity: (userId: string) => void
  onBanUser: (userId: string, reason: string) => void
  onUnbanUser: (userId: string) => void
  onChangeRole: (userId: string, role: string, reason: string) => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onViewActivity,
  onBanUser,
  onUnbanUser,
  onChangeRole,
}) => {
  const { colors } = useTheme()
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null)
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [banReason, setBanReason] = useState('')
  const [roleReason, setRoleReason] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleBanClick = (user: UserListItem) => {
    setSelectedUser(user)
    setBanDialogOpen(true)
    setBanReason('')
  }

  const handleBanSubmit = () => {
    if (selectedUser && banReason.trim()) {
      onBanUser(selectedUser.id, banReason)
      setBanDialogOpen(false)
      setSelectedUser(null)
      setBanReason('')
    }
  }

  const handleUnban = (user: UserListItem) => {
    onUnbanUser(user.id)
  }

  const handleRoleClick = (user: UserListItem) => {
    setSelectedUser(user)
    setSelectedRole(user.roles[0] || 'user')
    setRoleDialogOpen(true)
    setRoleReason('')
  }

  const handleRoleSubmit = () => {
    if (selectedUser && selectedRole && roleReason.trim()) {
      onChangeRole(selectedUser.id, selectedRole, roleReason)
      setRoleDialogOpen(false)
      setSelectedUser(null)
      setSelectedRole('')
      setRoleReason('')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div
        className="text-center py-12 rounded-2xl shadow-lg border-2"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <p className="text-lg" style={{ color: colors.textSecondary }}>
          Không có người dùng nào
        </p>
      </div>
    )
  }

  return (
    <>
      <div
        className="rounded-2xl border-2 shadow-xl overflow-hidden"
        style={{ background: colors.cardBackground, borderColor: colors.border }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ background: colors.accent }}>
              <TableHead className="text-white font-bold">Người dùng</TableHead>
              <TableHead className="text-white font-bold">Liên hệ</TableHead>
              <TableHead className="text-white font-bold">Vai trò</TableHead>
              <TableHead className="text-white font-bold">Trạng thái</TableHead>
              <TableHead className="text-white font-bold">Thống kê</TableHead>
              <TableHead className="text-right text-white font-bold">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b transition-all duration-200 group"
                style={{ borderColor: colors.border }}
              >
                <TableCell>
                  <div
                    className="font-bold group-hover:text-opacity-80 transition-colors"
                    style={{ color: colors.text }}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                  <div
                    className="text-sm flex items-center gap-1 mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className="text-sm flex items-center gap-1"
                    style={{ color: colors.textSecondary }}
                  >
                    <Phone className="h-3 w-3" />
                    {user.phoneNumber || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="font-semibold"
                        style={{
                          background: colors.accentSecondary + '20',
                          borderColor: colors.accentSecondary,
                          color: colors.accentSecondary,
                        }}
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.isActive ? 'default' : 'destructive'}
                    className="text-white shadow-md"
                    style={{ background: user.isActive ? colors.success : colors.error }}
                  >
                    {user.isActive ? 'Hoạt động' : 'Bị cấm'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div
                      className="flex items-center gap-1 font-semibold"
                      style={{ color: colors.accentSecondary }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {user.totalOrders} đơn
                    </div>
                    <div
                      className="flex items-center gap-1 font-semibold"
                      style={{ color: colors.success }}
                    >
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(user.totalSpent, 'VND')}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:scale-110 transition-all duration-200 shadow-md"
                        style={{ background: colors.accent }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-2 shadow-xl"
                      style={{ background: colors.cardBackground, borderColor: colors.border }}
                    >
                      <DropdownMenuItem
                        onClick={() => onViewActivity(user.id)}
                        className="cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Xem hoạt động
                      </DropdownMenuItem>
                      {user.isActive ? (
                        <DropdownMenuItem
                          onClick={() => handleBanClick(user)}
                          className="cursor-pointer"
                          style={{ color: colors.error }}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Cấm người dùng
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleUnban(user)}
                          className="cursor-pointer"
                          style={{ color: colors.success }}
                        >
                          <Check className="mr-2 h-4 w-4" /> Bỏ cấm
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleRoleClick(user)}
                        className="cursor-pointer"
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Thay đổi vai trò
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Ban User Dialog - Modern Style */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent
          className="border-2 shadow-2xl rounded-2xl"
          style={{ background: colors.cardBackground, borderColor: colors.error }}
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl shadow-lg" style={{ background: colors.error }}>
                <Ban className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold" style={{ color: colors.text }}>
                  Cấm người dùng
                </DialogTitle>
                <DialogDescription className="mt-1" style={{ color: colors.textSecondary }}>
                  Vui lòng nhập lý do cấm người dùng{' '}
                  <span className="font-semibold">{selectedUser?.email}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="ban-reason"
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                Lý do <span style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="ban-reason"
                placeholder="Nhập lý do cấm người dùng..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={4}
                className="border-2 rounded-xl focus:ring-2 transition-all duration-200"
                style={{
                  borderColor: colors.border,
                  background: colors.background,
                  color: colors.text,
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setBanDialogOpen(false)}
              className="border-2 transition-all duration-200 font-semibold"
              style={{ borderColor: colors.border }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleBanSubmit}
              disabled={!banReason.trim()}
              className="text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: colors.error }}
            >
              <Check className="mr-2 h-4 w-4" /> Xác nhận cấm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog - Modern Style */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent
          className="border-2 shadow-2xl rounded-2xl"
          style={{ background: colors.cardBackground, borderColor: colors.border }}
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl shadow-lg" style={{ background: colors.accent }}>
                <UserCog className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold" style={{ color: colors.text }}>
                  Thay đổi vai trò
                </DialogTitle>
                <DialogDescription className="mt-1" style={{ color: colors.textSecondary }}>
                  Thay đổi vai trò của người dùng{' '}
                  <span className="font-semibold">{selectedUser?.email}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                Vai trò mới
              </Label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-xl border-2 px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 font-medium"
                style={{
                  borderColor: colors.border,
                  background: colors.background,
                  color: colors.text,
                }}
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="role-reason"
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                Lý do <span style={{ color: colors.error }}>*</span>
              </Label>
              <Textarea
                id="role-reason"
                placeholder="Nhập lý do thay đổi vai trò..."
                value={roleReason}
                onChange={(e) => setRoleReason(e.target.value)}
                rows={4}
                className="border-2 rounded-xl focus:ring-2 transition-all duration-200"
                style={{
                  borderColor: colors.border,
                  background: colors.background,
                  color: colors.text,
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setRoleDialogOpen(false)}
              className="border-2 transition-all duration-200 font-semibold"
              style={{ borderColor: colors.border }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleRoleSubmit}
              disabled={!roleReason.trim()}
              className="text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: colors.accent }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
