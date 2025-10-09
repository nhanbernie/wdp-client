import { Header } from "@/components/layouts/second-layout/Header";
import { Footer } from "@/components/layouts/second-layout/Footer";

export default function AICMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
