import Image from "next/image";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardShell from "@/components/dashboard-shell";
import DashboardHeader from "@/components/dashboard-header";
import UserDelete from "@/components/user-delete";
import UserEditor from "@/components/user-editor";

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
        <h1 className="font-semibold">ユーザー名の編集</h1>
        <div className="flex items-center justify-between p-4 border rounded-xl max-w-md">
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
        <h1 className="font-semibold">アカウントの削除</h1>
        <div className="flex items-center justify-between gap-3 p-4 border rounded-xl max-w-md">
          アカウントを削除しますか？
          <UserDelete user={session.user} />
        </div>
      </div>
    </DashboardShell>
  );
}
