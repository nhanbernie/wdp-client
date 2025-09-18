import MainLayout from "@/components/layouts/MainLayout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout footer={true}>{children}</MainLayout>;
}
