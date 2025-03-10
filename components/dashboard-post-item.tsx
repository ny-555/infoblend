import { Post } from "@prisma/client";
import { format } from "date-fns";
import PostOperations from "./post-operations";

interface PostItemProps {
  post: Pick<
    Post,
    "id" | "title" | "content" | "blogId" | "published" | "createdAt"
  >;
}

export default function DashboardPostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <div>{post.blogId}</div>
        <div className="text-md font-semibold">{post.title}</div>
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
