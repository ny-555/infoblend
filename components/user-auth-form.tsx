"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icon } from "./icon";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function UserAuthForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <button
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "text-md rounded-full"
          )}
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
        >
          {isGoogleLoading ? (
            <Icon.spinner className="animate-spin" />
          ) : (
            <Icon.google />
          )}
          Google
        </button>
        <button
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "text-md rounded-full"
          )}
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github");
          }}
        >
          {isGithubLoading ? (
            <Icon.spinner className="animate-spin" />
          ) : (
            <Icon.github />
          )}
          GitHub
        </button>
      </div>
    </div>
  );
}
