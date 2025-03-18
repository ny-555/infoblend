"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logout() {
  return (
    <div className="container mx-auto px-8 flex flex-col gap-6 justify-center h-screen items-center w-screen">
      <h1 className="font-bold text-5xl md:text-6xl">InfoBlend</h1>
      <div className="w-full max-w-[400px] p-10 flex flex-col space-y-6 border rounded-xl">
        <h1 className="text-md md:text-lg text-muted-foreground text-center">
          本当にログアウトしますか？
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              await signOut({ callbackUrl: "/" });
            }}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            ログアウト
          </button>
          <Link
            href={"/dashboard"}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            キャンセル
          </Link>
        </div>
      </div>
    </div>
  );
}
