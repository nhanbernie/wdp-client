"use client";

import React from "react";
import Header from "./Header";
// import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  footer?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, footer }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {/* {footer && <Footer />} */}
    </div>
  );
};

export default MainLayout;
