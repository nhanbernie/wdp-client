"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "@/contexts/ThemeContext";

interface MainLayoutProps {
  children: React.ReactNode;
  footer?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, footer = true }) => {
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: colors.backgroundGradient }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      {footer && <Footer />}
    </div>
  );
};

export default MainLayout;
