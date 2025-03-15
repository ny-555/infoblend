"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Post } from "@prisma/client";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Code from "@editorjs/code";
import { postPatchSchema } from "@/lib/validations/post";
import { toast } from "sonner";
import { Icon } from "./icon";

interface DashboardEditorProps {
  post: Pick<Post, "id" | "blogId" | "content" | "published">;
}

export default function DashboardEditor({ post }: DashboardEditorProps) {
  const ref = useRef<EditorJS | undefined>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const body = postPatchSchema.parse(post);

    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここにコメントを編集できます",
      inlineToolbar: true,
      data: body.content,
      tools: {
        list: List,
        LinkTool: LinkTool,
        code: Code,
      },
    });
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
  }, [isMounted, initializeEditor]);

  const onSubmit = async () => {
    setIsSaving(true);
    const blocks = await ref.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast("<Error>コメントを編集できませんでした。", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }

    router.refresh();

    return toast("コメントが編集されました。");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={onSubmit}>
        <div className="">
          <div id="editor" className="min-h-[100px]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <p className="text-sm text-muted-foreground">
                コメントは他のユーザに公開されます
              </p>
            </div>
            <div className="space-x-4">
              <Link
                href={"/dashboard"}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                戻る
              </Link>
              <button className={cn(buttonVariants())} type="submit">
                {isSaving && (
                  <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>保存</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
