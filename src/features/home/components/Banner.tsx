import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Truck } from "lucide-react";

const Banner = () => {
  return (
    <div className="flex flex-col items-center py-16 gap-8">
      <p className="font-bold text-6xl text-center w-[750px]">
        Nền tảng mua sắm{" "}
        <span className="text-[var(--primary)]">vật liệu xây dựng</span> thông
        minh
      </p>
      <p className="text-center text-xl text-[var(--muted-foreground)] w-[650px]">
        AICShop giúp nhà thầu và thợ xậy tìm kiếm, so sánh và đặt mua vật liệu
        xây dựng với sự hỗ trợ của AI. Tiết kiệm thời gian và tối ưu chi phí.
      </p>

      <div className="flex text-lg gap-4">
        <Button
          className={`cursor-pointer bg-[var(--primary)] font-bold hover:opacity-80 transition-opacity duration-200`}
        >
          Start shopping
          <ArrowRight />
        </Button>
        <Button className="cursor-pointer font-bold hover:text-[var(--muted-foreground)] transition-colors duration-200">
          Watch AI demo
        </Button>
      </div>

      <div className="flex items-center text-[var(--muted-foreground)]">
        <Button className="text-[0.8rem]">
          <Shield className="text-[var(--primary)]" />
          National security
        </Button>
        <Button className="text-[0.8rem]">
          <Truck className="text-[var(--primary)]" />
          Nationwide delivery
        </Button>
        <Button className="text-[0.8rem]">
          <Sparkles className="text-[var(--primary)]" />
          AI consulting 24/7
        </Button>
      </div>
    </div>
  );
};

export default Banner;
