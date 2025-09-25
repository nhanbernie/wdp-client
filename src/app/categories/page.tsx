"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { CategoryFilter } from "@/features/categories/category-filter";
import { SearchFilters } from "@/features/categories/search-filters";
import { ProductGrid } from "@/features/categories/product-grid";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { colors, brandColors } = useTheme();

  return (
    <div
      className="min-h-screen transition-colors"
      style={{
        background: colors.backgroundGradient,
        color: colors.text,
      }}
    >
      <Header />

      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text }}
          >
            Danh mục sản phẩm
          </h1>
          <p style={{ color: colors.textSecondary }}>
            Khám phá hàng nghìn sản phẩm vật liệu xây dựng chất lượng cao
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: colors.textSecondary }}
              />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
                color: colors.text,
              }}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>

            <div
              className="flex items-center rounded-md overflow-hidden"
              style={{ border: `1px solid ${colors.border}` }}
            >
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
                style={{
                  backgroundColor:
                    viewMode === "grid"
                      ? brandColors.primary
                      : colors.cardBackground,
                  color: viewMode === "grid" ? "#fff" : colors.text,
                }}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
                style={{
                  backgroundColor:
                    viewMode === "list"
                      ? brandColors.primary
                      : colors.cardBackground,
                  color: viewMode === "list" ? "#fff" : colors.text,
                }}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.aside
            className="hidden lg:block w-80 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CategoryFilter />
            <SearchFilters />
          </motion.aside>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="lg:hidden fixed inset-0 z-50 p-4 overflow-y-auto"
                style={{ backgroundColor: colors.background }}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: colors.text }}
                  >
                    Bộ lọc
                  </h2>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                    style={{ color: colors.textSecondary }}
                  >
                    Đóng
                  </Button>
                </div>
                <div className="space-y-6">
                  <CategoryFilter />
                  <SearchFilters />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Hiển thị 1,234 sản phẩm
                </span>
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: colors.cardBackgroundSecondary,
                      color: colors.text,
                    }}
                  >
                    Tìm kiếm: {searchQuery}
                  </Badge>
                )}
              </div>

              <select
                className="text-sm rounded-md px-3 py-2"
                style={{
                  backgroundColor: colors.cardBackground,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
              >
                <option>Sắp xếp theo độ phù hợp</option>
                <option>Giá: Thấp đến cao</option>
                <option>Giá: Cao đến thấp</option>
                <option>Tên A-Z</option>
                <option>Mới nhất</option>
              </select>
            </div>

            {/* Product Grid */}
            <ProductGrid viewMode={viewMode} />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
