import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import DashboardEditor from "@/components/dashboard-editor";

interface EditorProps {
  params: { postId: string };
}

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return post;
}

export default async function EditorPage({ params }: EditorProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const userId = user?.id;
  const postId = params.postId;

  const post = await getPostForUser(postId, userId);

  if (!post) {
    notFound();
  }

  return (
    <div className="border rounded-xl p-4 space-y-4 max-w-2xl mx-auto">
      <Link
        href={`/blog/${post.blogId}`}
        className="bg-secondary px-3 py-1 rounded-full font-semibold"
      >
        {post.blogId}
      </Link>
      <div className="flex items-center gap-2">
        {post.author.image ? (
          <Image
            src={post.author.image as string}
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/images/avatars/default-profile.png"
            alt="default-profile"
            width={50}
            height={50}
          />
        )}

        <div className="font-semibold">{post.author.name}</div>
      </div>
      <DashboardEditor
        post={{
          id: post.id,
          blogId: post.blogId,
          content: post.content,
          published: post.published,
        }}
      />
    </div>
  );
}
