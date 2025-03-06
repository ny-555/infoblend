"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  postUserEditorSchema,
  postUserEditorSchemaType,
} from "@/lib/validations/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

interface EditorProps {
  post: Pick<Post, "blogId">;
}

export default function BlogEditor({ post }: EditorProps) {
  const ref = useRef<EditorJS | undefined>(null);
  const router = useRouter();
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

  const { register, handleSubmit } = useForm<postUserEditorSchemaType>({
    resolver: zodResolver(postUserEditorSchema),
  });

  const onSubmit = async (data: postUserEditorSchemaType) => {
    console.log("送信データ：", data);
    setIsSaving(true);
    const blocks = await ref.current?.save();
    const response = await fetch(`/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
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

    router.refresh();

    return toast("コメントが投稿されました。");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border rounded-lg p-8">
        <div className="">
          <TextareaAutosize
            id="title"
            placeholder="タイトル"
            className="w-full resize-none bg-transparent text-2xl focus:outline-none font-bold"
            {...register("title")}
          />
        </div>
        <div id="editor" className="min-h-[100px]" />
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
