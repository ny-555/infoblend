"use client";

import { ReactNode, useState } from "react";
import { NavItem } from "@/types";
import Link from "next/link";
import MobileNav from "./mobile-nav";

interface MainNavProps {
  items: NavItem[];
  children?: ReactNode;
}

export default function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <div className="flex items-end md:gap-10">
      <Link href={"/"} className="hidden md:flex items-center space-x-2">
        <span className="text-2xl font-bold hidden sm:inline-block">
          InfoBlend
        </span>
      </Link>
      <nav className="md:flex gap-6 hidden">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-md font-medium hover:text-foreground/80"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 32 32"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h22M5 16h22M5 24h22"
            />
          </svg>
        </span>
      </button>
      {showMobileMenu && <MobileNav items={items} />}
    </div>
  );
}
