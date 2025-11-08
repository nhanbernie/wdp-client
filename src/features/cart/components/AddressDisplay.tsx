"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Address } from "@/services/addresses/types";
import { useTheme } from "@/contexts/ThemeContext";

interface AddressDisplayProps {
  address: Address | null;
  onChange: () => void;
  onManage?: () => void;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  onChange,
  onManage,
}) => {
  const { colors } = useTheme();

  if (!address) {
    return (
      <div
        className="p-6 rounded-xl cursor-pointer transition-all hover:shadow-md"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          boxShadow: `0 1px 3px ${colors.border}40`,
        }}
        onClick={onChange}
      >
        <div className="flex items-center justify-center py-10">
          <div className="text-center">
            <MapPin
              className="w-14 h-14 mx-auto mb-4"
              style={{ color: colors.textSecondary }}
            />
            <p className="font-medium text-base mb-2" style={{ color: colors.text }}>
              Chưa có địa chỉ giao hàng
            </p>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Nhấn để thêm địa chỉ mới
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-xl transition-all"
      style={{
        backgroundColor: colors.cardBackground,
        boxShadow: `0 2px 8px ${colors.border}20`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5" style={{ color: colors.accent }} />
        <h3 className="font-semibold text-base" style={{ color: colors.text }}>
          Địa Chỉ Nhận Hàng
        </h3>
      </div>

      {/* Recipient Info */}
      <div className="mb-4">
        <p className="font-semibold text-base mb-1" style={{ color: colors.text }}>
          {address.recipientName}
        </p>
        <p className="font-semibold text-base mb-2" style={{ color: colors.text }}>
          {address.recipientPhone}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
          {address.addressLine}
          {address.ward && `, ${address.ward}`}
          {address.district && `, ${address.district}`}
          {address.city && `, ${address.city}`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-2">
          {address.isDefault && (
            <Badge
              className="px-3 py-1 text-xs"
              style={{
                backgroundColor: colors.accent,
                color: "#fff",
              }}
            >
              Mặc Định
            </Badge>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onChange}
          style={{
            color: colors.accent,
            padding: 0,
          }}
          className="hover:bg-transparent hover:underline"
        >
          Thay Đổi
        </Button>
      </div>
    </div>
  );
};

