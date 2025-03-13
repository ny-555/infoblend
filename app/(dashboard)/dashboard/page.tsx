import DashboardHeader from "@/components/dashboard-header";
import DashboardPostItem from "@/components/dashboard-post-item";
import DashboardShell from "@/components/dashboard-shell";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userName = session?.user.name;

  const posts = await db.post.findMany({
    where: {
      authorId: session?.user.id,
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
        <p className="text-lg font-bold ml-2 mb-1">あなたのコメント</p>
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
