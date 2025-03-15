import MainHeader from "@/components/main-header";
import SiteFooter from "@/components/site-footer";
import { subConfig } from "@/config/main";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader items={subConfig.mainNav} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
