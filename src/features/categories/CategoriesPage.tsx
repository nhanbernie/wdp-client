"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCategories } from "./hooks";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchFilters } from "./components/SearchFilters";
import { ProductGrid } from "./components/ProductGrid";

const CategoriesPage: React.FC = () => {
  const { viewMode } = useCategories();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-8">
            <Link
              href="/"
              className="p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500 text-white shadow-xl">
                <Layers className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Danh mục sản phẩm
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
                  Khám phá các sản phẩm vật liệu xây dựng
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block space-y-6"
          >
            <CategoryFilter />
            <SearchFilters />
          </motion.aside>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <ProductGrid viewMode={viewMode} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
