"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { CartPage as FeatureCartPage } from "@/features/cart";

const Route: React.FC = () => {
  return (
    <MainLayout>
      <FeatureCartPage />
    </MainLayout>
  );
};

export default Route;
