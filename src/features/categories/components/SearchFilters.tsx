"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brands, materials } from "../data/filters.data";

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 10000000]);
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setInStock(false);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Price Range */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border rounded-xl shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Khoảng giá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={10000000}
                step={100000}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Từ"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="flex-1"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Đến"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="flex-1"
              />
            </div>
            <div className="text-sm text-muted-foreground text-center">
              {priceRange[0].toLocaleString("vi-VN")} -{" "}
              {priceRange[1].toLocaleString("vi-VN")} VNĐ
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Brands */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border rounded-xl shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Thương hiệu</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                  />
                  <label
                    htmlFor={brand.name}
                    className="text-sm cursor-pointer"
                  >
                    {brand.name}
                  </label>
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-primary hover:text-white transition-colors"
                >
                  {brand.count}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Materials */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border rounded-xl shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Chất liệu</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {materials.map((material, i) => (
              <motion.div
                key={material.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={material.name}
                    checked={selectedMaterials.includes(material.name)}
                    onCheckedChange={() => toggleMaterial(material.name)}
                  />
                  <label
                    htmlFor={material.name}
                    className="text-sm cursor-pointer"
                  >
                    {material.name}
                  </label>
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-primary hover:text-white transition-colors"
                >
                  {material.count}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Availability */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border rounded-xl shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold">Tình trạng</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={inStock}
                onCheckedChange={(checked) => setInStock(checked === true)}
              />
              <Label htmlFor="inStock" className="text-sm cursor-pointer">
                Chỉ hiển thị sản phẩm còn hàng
              </Label>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clear Filters */}
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full bg-transparent"
        >
          Xóa tất cả bộ lọc
        </Button>
      </motion.div>
    </motion.div>
  );
}
