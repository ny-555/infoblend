// import { marketingConfig } from "@/config/marketing";
import MainNav from "./main-nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NavItem } from "@/types";
import { ReactNode } from "react";

interface MainNavProps {
  items: NavItem[];
  children?: ReactNode;
}

export default async function MainHeader({ items }: MainNavProps) {
  const session = await getServerSession(authOptions);

  return (
    <header className="z-40 bg-white bg-opacity-70 backdrop-blur-md sticky top-0">
      <div className="px-10 py-4 flex items-center justify-between">
        <MainNav items={items} />
        <div className="flex gap-4">
          <nav>
            {session ? (
              <Link
                href={"/logout"}
                className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
              >
                ログアウト
              </Link>
            ) : (
              <Link
                href={"/login"}
                className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
              >
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
