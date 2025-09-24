"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Truck } from "lucide-react";

function Hero() {
  return (
    <section className="relative py-20 lg:py-32 construction-grid">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Nền tảng mua sắm{" "}
            <span className="text-primary">vật liệu xây dựng</span> thông minh
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            AICShop giúp nhà thầu và thợ xây tìm kiếm, so sánh và đặt mua vật
            liệu xây dựng với sự hỗ trợ của AI. Tiết kiệm thời gian, tối ưu chi
            phí.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 glow-effect">
              Bắt đầu mua sắm
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Bảo mật thanh toán</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI tư vấn 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default Hero;
