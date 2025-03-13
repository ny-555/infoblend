"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Icon } from "./icon";
import { signOut } from "next-auth/react";

interface UserDeleteProps {
  user: Pick<User, "id">;
}

async function deleteUser(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });

    if (response.ok) {
      await signOut({ callbackUrl: "/" });
    }
    toast("アカウントを削除しました。");

    return true;
  } catch {
    toast("<Error>アカウントを削除できませんでした。", {
      style: { background: "#dc2626", color: "#fff" },
    });
  }
}

export default function UserDelete({ user }: UserDeleteProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShowDeleteAlert(true)}
        className={cn(buttonVariants({ variant: "destructive" }))}
      >
        アカウント削除
      </button>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              本当にこのアカウントを削除しますか？
            </AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り返しがつきません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deleteUser(user.id);

                if (deleted) {
                  setShowDeleteAlert(false);
                  setIsDeleteLoading(false);
                  router.push("/");
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icon.spinner className="animate-spin mr-2 w-4 h-4" />
              ) : (
                <Icon.trash className="mr-2 w-4 h-4" />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
