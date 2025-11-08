"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "@/services/addresses";
import type { Address, CreateAddressRequest } from "@/services/addresses/types";
import { useTheme } from "@/contexts/ThemeContext";
import { Loader2 } from "lucide-react";

interface AddressFormDialogProps {
  open: boolean;
  onClose: () => void;
  address?: Address | null;
  onSuccess?: () => void;
}

export const AddressFormDialog: React.FC<AddressFormDialogProps> = ({
  open,
  onClose,
  address,
  onSuccess,
}) => {
  const { colors } = useTheme();
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAddressRequest>({
    defaultValues: {
      recipientName: "",
      recipientPhone: "",
      addressLine: "",
      ward: "",
      district: "",
      city: "",
      nickname: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        recipientName: address.recipientName,
        recipientPhone: address.recipientPhone,
        addressLine: address.addressLine,
        ward: address.ward || "",
        district: address.district || "",
        city: address.city || "",
        nickname: address.nickname || "",
        isDefault: address.isDefault,
      });
    } else {
      reset({
        recipientName: "",
        recipientPhone: "",
        addressLine: "",
        ward: "",
        district: "",
        city: "",
        nickname: "",
        isDefault: false,
      });
    }
  }, [address, reset, open]);

  const onSubmit = async (data: CreateAddressRequest) => {
    try {
      if (address) {
        // Update address
        await updateAddress({
          id: address.id,
          data,
        }).unwrap();
      } else {
        // Create address
        await createAddress(data).unwrap();
      }
      onSuccess?.();
      onClose();
      reset();
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto p-0"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle style={{ color: colors.text }} className="text-xl">
              {address ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName" style={{ color: colors.text }}>
                Họ và tên người nhận <span style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="recipientName"
                {...register("recipientName", {
                  required: "Vui lòng nhập họ và tên",
                  maxLength: {
                    value: 100,
                    message: "Họ và tên không được quá 100 ký tự",
                  },
                })}
                placeholder="Nhập họ và tên"
                className={errors.recipientName ? "border-red-500" : ""}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              />
              {errors.recipientName && (
                <p className="text-sm" style={{ color: colors.error }}>
                  {errors.recipientName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientPhone" style={{ color: colors.text }}>
                Số điện thoại <span style={{ color: colors.error }}>*</span>
              </Label>
              <Input
                id="recipientPhone"
                type="tel"
                {...register("recipientPhone", {
                  required: "Vui lòng nhập số điện thoại",
                  maxLength: {
                    value: 20,
                    message: "Số điện thoại không được quá 20 ký tự",
                  },
                })}
                placeholder="Nhập số điện thoại"
                className={errors.recipientPhone ? "border-red-500" : ""}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              />
              {errors.recipientPhone && (
                <p className="text-sm" style={{ color: colors.error }}>
                  {errors.recipientPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine" style={{ color: colors.text }}>
              Địa chỉ chi tiết <span style={{ color: colors.error }}>*</span>
            </Label>
            <Input
              id="addressLine"
              {...register("addressLine", {
                required: "Vui lòng nhập địa chỉ chi tiết",
                maxLength: {
                  value: 255,
                  message: "Địa chỉ không được quá 255 ký tự",
                },
              })}
              placeholder="Số nhà, tên đường..."
              className={errors.addressLine ? "border-red-500" : ""}
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                color: colors.text,
              }}
            />
            {errors.addressLine && (
              <p className="text-sm" style={{ color: colors.error }}>
                {errors.addressLine.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ward" style={{ color: colors.text }}>
                Phường/Xã
              </Label>
              <Input
                id="ward"
                {...register("ward", {
                  maxLength: {
                    value: 100,
                    message: "Phường/Xã không được quá 100 ký tự",
                  },
                })}
                placeholder="Phường/Xã"
                className={errors.ward ? "border-red-500" : ""}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              />
              {errors.ward && (
                <p className="text-sm" style={{ color: colors.error }}>
                  {errors.ward.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" style={{ color: colors.text }}>
                Quận/Huyện
              </Label>
              <Input
                id="district"
                {...register("district", {
                  maxLength: {
                    value: 100,
                    message: "Quận/Huyện không được quá 100 ký tự",
                  },
                })}
                placeholder="Quận/Huyện"
                className={errors.district ? "border-red-500" : ""}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              />
              {errors.district && (
                <p className="text-sm" style={{ color: colors.error }}>
                  {errors.district.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" style={{ color: colors.text }}>
                Tỉnh/Thành phố
              </Label>
              <Input
                id="city"
                {...register("city", {
                  maxLength: {
                    value: 100,
                    message: "Tỉnh/Thành phố không được quá 100 ký tự",
                  },
                })}
                placeholder="Tỉnh/Thành phố"
                className={errors.city ? "border-red-500" : ""}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              />
              {errors.city && (
                <p className="text-sm" style={{ color: colors.error }}>
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname" style={{ color: colors.text }}>
              Tên gợi nhớ (tùy chọn)
            </Label>
            <Input
              id="nickname"
              {...register("nickname", {
                maxLength: {
                  value: 50,
                  message: "Tên gợi nhớ không được quá 50 ký tự",
                },
              })}
              placeholder="VD: Nhà riêng, Công ty..."
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                borderColor: errors.nickname ? colors.error : colors.border,
                color: colors.text,
              }}
            />
            {errors.nickname && (
              <p className="text-sm" style={{ color: colors.error }}>
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              {...register("isDefault")}
              className="w-4 h-4 rounded"
              style={{
                accentColor: colors.accent,
              }}
            />
            <Label htmlFor="isDefault" style={{ color: colors.text }}>
              Đặt làm địa chỉ mặc định
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              style={{
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: colors.accent,
                color: "#fff",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : address ? (
                "Cập nhật"
              ) : (
                "Thêm địa chỉ"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

