"use client";
import { useState, useCallback } from "react";
import { CategoryFilters } from "../types/categories.types";

export const useCategories = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    searchQuery: "",
    selectedCategories: [],
    selectedBrands: [],
    selectedMaterials: [],
    priceRange: [0, 10_000_000],
    inStock: false,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = useCallback(() => setShowFilters((s) => !s), []);

  return {
    filters,
    setFilters,
    viewMode,
    setViewMode,
    showFilters,
    toggleFilters,
  };
};
