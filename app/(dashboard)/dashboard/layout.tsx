import DashboardNav from "@/components/dashboard-nav";
import MainHeader from "@/components/main-header";
import SiteFooter from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";
import { subConfig } from "@/config/marketing";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <MainHeader items={subConfig.mainNav} />
      <div className="container mx-auto px-8 grid gap-12 md:grid-cols-[200px_1fr] text">
        <aside className="hidden md:flex flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col max-w-[700px] flex-1">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
