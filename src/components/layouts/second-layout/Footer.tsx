import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  AI
                </span>
              </div>
              <span className="font-bold text-xl">AICShop</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nền tảng mua sắm vật liệu xây dựng thông minh, giúp nhà thầu và
              thợ xây tối ưu hóa quy trình mua sắm.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liên kết nhanh</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/categories"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Danh mục sản phẩm
              </Link>
              <Link
                href="/quote"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Yêu cầu báo giá
              </Link>
              <Link
                href="/orders"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Theo dõi đơn hàng
              </Link>
              <Link
                href="/support"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Hỗ trợ khách hàng
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hỗ trợ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">1900 1234</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  support@aicshop.vn
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Nhận tin tức</h3>
            <p className="text-sm text-muted-foreground">
              Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi đặc biệt.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Email của bạn" className="flex-1" />
              <Button size="sm">
                <Link
                  href="/auth/register"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Đăng ký
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AICShop. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
