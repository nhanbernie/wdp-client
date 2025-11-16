"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  Menu,
  MessageCircle,
  Bell,
} from "lucide-react";
import UserMenu from "../components/UserMenu";
import { userNavigationItems } from "@/common/constants/navigate.constant";
import { useSocket } from "@/contexts/SocketContext";

interface HeaderProps {
  navigationItems?: typeof userNavigationItems;
}

export function Header({ navigationItems = userNavigationItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const { socket, isConnected } = useSocket();

  // Listen order_created to bump notification badge
  useEffect(() => {
    if (!socket || !isConnected) return;

    const onOrderCreated = () => {
      setUnread((c) => Math.min(c + 1, 99));
    };

    socket.on("order_created", onOrderCreated);
    return () => {
      socket.off("order_created", onOrderCreated);
    };
  }, [socket, isConnected]);

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
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    item.active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
                {unread > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {unread > 9 ? "9+" : unread}
                  </Badge>
                )}
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
              <UserMenu />

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
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      item.active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
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
