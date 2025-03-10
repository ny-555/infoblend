import { format } from "date-fns";
import PostOperations from "./post-operations";
import edjsHTML from "editorjs-html";
import { JsonValue } from "@prisma/client/runtime/library";
import { OutputData } from "@editorjs/editorjs";

interface PostItemProps {
  post: {
    id: string;
    content: JsonValue | null;
    blogId: string;
    authorId: string;
    published: boolean;
    createdAt: Date;
    author: {
      name: string | null;
    };
  };
}

export default function PostItem({ post }: PostItemProps) {
  const edjsParser = edjsHTML();
  const contentData = post.content as unknown as OutputData;
  const htmlContent = edjsParser.parse(contentData);

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <div>{post.author.name}</div>
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
