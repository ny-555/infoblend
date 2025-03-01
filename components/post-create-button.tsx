"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icon } from "./icon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PostCreateButtonProps = ButtonProps;

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return toast("問題が発生しました。", {
        description: "投稿が作成されませんでした。もう一度お試しください。",
        style: { background: "#b22222", color: "#fff" },
      });
    }

    const post = await response.json();

    router.refresh();
    router.push(`editor/${post.id}`);
  };

  return (
    <button
      className={cn(buttonVariants({ variant }), {
        "cursor-not-allowed opacity-60": isLoading,
        className,
      })}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.spinner className="h-2 w-2 animate-spin" />
      ) : (
        <Icon.add className="h-2 w-2" />
      )}
      コメント
    </button>
  );
}
