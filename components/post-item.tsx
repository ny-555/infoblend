import { Post } from "@prisma/client";
import { format } from "date-fns";
import PostOperations from "./post-operations";
import edjsHTML from "editorjs-html";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "content" | "published" | "createdAt">;
}

export default function PostItem({ post }: PostItemProps) {
  const edjsParser = edjsHTML();
  const htmlContent = post.content ? edjsParser.parse(post.content) : "";
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <div className="text-lg font-semibold">{post.title}</div>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="prose"
        />
        <div>
          <p className="text-sm text-muted-foreground">
            {format(post.createdAt, "yyyy-MM-dd")}
          </p>
        </div>
      </div>

      <PostOperations post={post} />
    </div>
  );
}
