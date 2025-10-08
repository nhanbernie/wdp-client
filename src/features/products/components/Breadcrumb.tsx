"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbProps {
  category?: string;
  productName: string;
  colors: any;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  category,
  productName,
  colors,
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 text-sm mb-8"
      style={{ color: colors.textSecondary }}
    >
      <Link href="/" className="hover:text-blue-600">
        Trang chủ
      </Link>
      <span>/</span>
      <Link href="/categories" className="hover:text-blue-600">
        {category || "Danh mục"}
      </Link>
      <span>/</span>
      <span style={{ color: colors.text }}>{productName}</span>
    </motion.nav>
  );
};
