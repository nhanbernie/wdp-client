"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MessageCircle,
  Bell,
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                AI
              </span>
            </div>
            <span className="font-bold text-xl">AICShop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm vật liệu xây dựng..."
                className="pl-10 bg-muted/50"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/categories"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Danh mục
            </Link>
            <Link
              href="/quote"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Báo giá
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Đơn hàng
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* AI Chat */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Hỗ trợ
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  2
                </Badge>
              </Link>
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <User className="h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm vật liệu xây dựng..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/categories"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Danh mục
              </Link>
              <Link
                href="/quote"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Báo giá
              </Link>
              <Link
                href="/orders"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Đơn hàng
              </Link>
              <Button variant="ghost" size="sm" className="justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Hỗ trợ
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
