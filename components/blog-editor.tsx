"use client";

import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Code from "@editorjs/code";
import { toast } from "sonner";
import { buttonVariants } from "./ui/button";
import { Icon } from "./icon";

interface EditorProps {
  post: Pick<Post, "blogId">;
}

export default function BlogEditor({ post }: EditorProps) {
  const ref = useRef<EditorJS | undefined>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここにコメントを書く",
      inlineToolbar: true,
      tools: {
        list: List,
        LinkTool: LinkTool,
        code: Code,
      },
    });
  }, []);

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
    const response = await fetch(`/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: post.blogId,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast("<Error>コメントを投稿できませんでした。", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }

    return toast("コメントを投稿しました。");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="border rounded-xl p-8">
        <div id="editor" />
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-10">
            <p className="text-sm text-muted-foreground">
              コメントは他のユーザに公開されます
            </p>
          </div>
          <button className={cn(buttonVariants())} type="submit">
            {isSaving && <Icon.spinner className="w-4 h-4 mr-2 animate-spin" />}
            <span>投稿</span>
          </button>
        </div>
      </div>
    </form>
  );
}
