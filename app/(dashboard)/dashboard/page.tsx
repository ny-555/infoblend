import DashboardHeader from "@/components/dashboard-header";
import DashboardPostItem from "@/components/dashboard-post-item";
import DashboardShell from "@/components/dashboard-shell";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userName = user.name;

  const posts = await db.post.findMany({
    where: {
      authorId: user?.id,
    },
    select: {
      id: true,
      blogId: true,
      content: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="ダッシュボード"
        text="あなたのプロフィールやコメントを管理できます。"
      >
        <></>
      </DashboardHeader>
      <div className="border rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            {typeof user.image === "string" ? (
              <Image
                src={user.image}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <p>画像がありません</p>
            )}
          </div>
          <p className="font-semibold">{userName}</p>
        </div>

        <Link
          href={"/dashboard/settings"}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          変更
        </Link>
      </div>
      <div>
        {posts.length ? (
          <div className="divide-y border rounded-xl">
            {posts.map((post) => (
              <DashboardPostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="ml-2">投稿がありません。</div>
        )}
      </div>
    </DashboardShell>
  );
}
