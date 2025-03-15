import Image from "next/image";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import edjsHTML from "editorjs-html";
import { OutputData } from "@editorjs/editorjs";
import { JsonValue } from "@prisma/client/runtime/library";
import PostOperations from "./post-operations";
import { authOptions } from "@/lib/auth";

interface BlogPostItemProps {
  post: {
    id: string;
    content: JsonValue | null;
    blogId: string;
    authorId: string;
    published: boolean;
    createdAt: Date;
    author: {
      name: string | null;
      image: string | null;
    };
  };
}

export default async function BlogPostItem({ post }: BlogPostItemProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const edjsParser = edjsHTML();
  const contentData = post.content as unknown as OutputData;
  const htmlContent = edjsParser.parse(contentData);

  return (
    <div className="flex items-center justify-between p-4">
      <div>
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
          <p className="text-sm text-muted-foreground">
            {format(post.createdAt, "yyyy-MM-dd")}
          </p>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose"
        />
      </div>
      {userId === post.authorId && <PostOperations post={post} />}
    </div>
  );
}
