"use client";

import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="z-40 bg-white bg-opacity-70 backdrop-blur-md sticky top-0">
        <div className="px-10 py-4 flex items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <div className="flex gap-4">
            <nav>
              <Link
                href={"/login"}
                className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
              >
                ログイン
              </Link>
            </nav>
            <nav>
              <button onClick={() => signOut()}>ログアウト</button>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
