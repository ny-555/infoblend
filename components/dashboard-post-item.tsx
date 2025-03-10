import { Post } from "@prisma/client";
import { format } from "date-fns";
import PostOperations from "./post-operations";
import { OutputData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";

interface PostItemProps {
  post: Pick<Post, "id" | "content" | "blogId" | "published" | "createdAt">;
}

export default function DashboardPostItem({ post }: PostItemProps) {
  const edjsParser = edjsHTML();
  const contentData = post.content as unknown as OutputData;
  const htmlContent = edjsParser.parse(contentData);
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <div>{post.blogId}</div>
        <div className="text-md font-semibold">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="prose"
          />
        </div>
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
