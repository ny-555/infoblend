import MainHeader from "@/components/main-header";
import SiteFooter from "@/components/site-footer";
import { mainConfig } from "@/config/main";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainHeader items={mainConfig.mainNav} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
