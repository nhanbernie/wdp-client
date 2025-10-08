"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { CategoriesPage as FeatureCategoriesPage } from "@/features/categories";

const Route: React.FC = () => {
  return (
    <MainLayout>
      <FeatureCategoriesPage />
    </MainLayout>
  );
};

export default Route;
