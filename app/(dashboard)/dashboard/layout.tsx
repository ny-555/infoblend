import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="z-40 bg-white bg-opacity-70 backdrop-blur-md sticky top-0">
        <div className="px-10 py-4 flex items-center justify-between">
          <MainNav items={dashboardConfig.mainNav} />
          <nav>
            <Link
              href={"/login"}
              className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-8 grid justify-center flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden md:flex flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col max-w-[700px] flex-1 overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
