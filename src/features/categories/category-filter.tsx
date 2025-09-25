"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Xi măng & Vữa",
    count: 2450,
    subcategories: [
      "Xi măng Portland",
      "Vữa khô",
      "Vữa chống thấm",
      "Keo dán gạch",
    ],
  },
  {
    name: "Đinh, Vít & Bu lông",
    count: 5230,
    subcategories: ["Đinh thép", "Vít gỗ", "Bu lông inox", "Đinh bắn"],
  },
  {
    name: "Dụng cụ điện",
    count: 1890,
    subcategories: ["Máy khoan", "Máy cắt", "Máy mài", "Máy hàn"],
  },
  {
    name: "Máy móc xây dựng",
    count: 890,
    subcategories: [
      "Máy trộn bê tông",
      "Máy nén khí",
      "Máy phát điện",
      "Cần cẩu",
    ],
  },
  {
    name: "Dụng cụ cầm tay",
    count: 3120,
    subcategories: ["Búa", "Tua vít", "Cưa", "Kìm"],
  },
  {
    name: "Sơn & Hoàn thiện",
    count: 1560,
    subcategories: ["Sơn nước", "Sơn dầu", "Chất chống thấm", "Keo silicon"],
  },
];

export function CategoryFilter() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleSelection = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <Card className="border shadow-md rounded-xl">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg font-semibold">
          Danh mục sản phẩm
        </CardTitle>
      </CardHeader>

      <CardContent className="divide-y">
        {categories.map((category) => {
          const expanded = expandedCategories.includes(category.name);
          const selected = selectedCategories.includes(category.name);

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="py-3"
            >
              {/* Category row */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <Checkbox
                    id={category.name}
                    checked={selected}
                    onCheckedChange={() => toggleSelection(category.name)}
                  />
                  <label
                    htmlFor={category.name}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {category.name}
                  </label>
                  <Badge
                    variant={selected ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {category.count}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="p-1 rounded hover:bg-accent"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </motion.div>

              {/* Animated subcategories */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="ml-6 mt-2 space-y-2 border-l pl-4"
                  >
                    {category.subcategories.map((sub, index) => (
                      <motion.div
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-1"
                      >
                        <Checkbox id={sub} />
                        <label
                          htmlFor={sub}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {sub}
                        </label>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
