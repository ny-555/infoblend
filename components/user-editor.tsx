"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useState } from "react";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";
import { userPatchSchema, userPatchSchemaType } from "@/lib/validations/user";

interface UserProps {
  user: Pick<User, "email" | "name">;
}

export default function UserEditor({ user }: UserProps) {
  console.log("user-editorでのuser: ", user);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<userPatchSchemaType>({
    resolver: zodResolver(userPatchSchema),
  });

  const onSubmit = async (data: userPatchSchemaType) => {
    setIsSaving(true);
    const response = await fetch(`/api/users/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: data.name,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast("<Error>名前を変更できませんでした。", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }

    router.refresh();

    return toast("名前が変更されました。");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center w-full">
        <input
          id="name"
          placeholder="名前"
          defaultValue={user.name as string}
          className="resize-none bg-transparent focus:outline-none font-bold"
          {...register("name")}
        />
        <button
          className={cn(buttonVariants({ variant: "secondary" }))}
          type="submit"
        >
          {isSaving && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
          <span>変更</span>
        </button>
      </div>
    </form>
  );
}
