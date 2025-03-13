import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import UserDelete from "@/components/user-delete";
// import { buttonVariants } from "@/components/ui/button";
import UserEditor from "@/components/user-editor";
import { authOptions } from "@/lib/auth";
// import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
// import { signOut } from "next-auth/react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id || !session?.user.name) {
    notFound();
  }

  return (
    <DashboardShell className="space-y-6">
      <DashboardHeader heading="設定" text="アカウントの編集/削除ができます。">
        <></>
      </DashboardHeader>
      <div>
        <h1 className="text-lg font-semibold">ユーザー名の編集</h1>
        <div className="flex items-center justify-between gap-3 p-4 border rounded-xl max-w-md">
          <div>
            {typeof session?.user.image === "string" ? (
              <Image
                src={session.user.image}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <Image
                src="/images/avatars/default-profile.png"
                alt="default-profile"
                width={80}
                height={80}
              />
            )}
          </div>
          <UserEditor
            user={{
              id: session.user.id,
              name: session.user.name,
            }}
          />
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold">アカウントの削除</h1>
        <div className="flex items-center justify-between gap-3 p-4 border rounded-xl max-w-md">
          アカウントを削除しますか？
          <UserDelete user={session.user} />
        </div>
      </div>
    </DashboardShell>
  );
}
