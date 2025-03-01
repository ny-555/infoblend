// "use client";

import MainHeader from "@/components/main-header";
import SiteFooter from "@/components/site-footer";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
