"use client";

import { AddressList } from "@/features/addresses/components";
import { useTheme } from "@/contexts/ThemeContext";

export default function AddressesPage() {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto py-8 px-6">
        <AddressList showBackButton={true} />
      </div>
    </div>
  );
}

