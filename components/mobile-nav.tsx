import Link from "next/link";
import { NavItem } from "@/types";
import { siteConfig } from "@/config/site";

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 z-50 p-6 md:hidden animate-in slide-in-from-bottom-80">
      <div className="grid gap-4 bg-popover p-4 rounded-xl text-popover-foreground shadow-lg">
        <Link href={"/"} className="text-2xl font-bold">
          {siteConfig.name}
        </Link>
        <nav className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
