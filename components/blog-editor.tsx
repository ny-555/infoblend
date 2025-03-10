"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { toast } from "sonner";
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
        header: Header,
        LinkTool: LinkTool,
        list: List,
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
      return toast("<Error>コメントが投稿できませんでした。", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }

    ref.current?.clear();

    return toast("コメントが投稿されました。");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="border rounded-xl p-8">
        <div id="editor" />
        <p className="text-sm text-gray-500">
          Use
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
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
