import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import UserEditor from "@/components/user-editor";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id || !session?.user.name) {
    notFound();
  }

  return (
    <DashboardShell className="space-y-6">
      <DashboardHeader heading="設定" text="プロフィールの編集ができます。">
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
              <p>画像がありません</p>
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
    </DashboardShell>
  );
}
