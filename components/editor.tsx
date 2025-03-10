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
  postPatchSchema,
  postUserEditorSchema,
  postUserEditorSchemaType,
} from "@/lib/validations/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "blogId" | "content" | "published">;
}

export default function Editor({ post }: EditorProps) {
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
      placeholder: "ここにコメントを書くことができます",
      inlineToolbar: true,
      data: body.content,
      tools: {
        header: Header,
        LinkTool: LinkTool,
        list: List,
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

  const { register, handleSubmit } = useForm<postUserEditorSchemaType>({
    resolver: zodResolver(postUserEditorSchema),
  });

  const onSubmit = async (data: postUserEditorSchemaType) => {
    setIsSaving(true);
    const blocks = await ref.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast("<Error>コメントが編集できませんでした。", {
        style: { background: "#dc2626", color: "#fff" },
      });
    }

    router.refresh();

    return toast("コメントが編集されました。");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border rounded-xl p-8 space-y-2">
          <div className="w-[800px] mx-auto">
            <TextareaAutosize
              id="title"
              autoFocus
              defaultValue={post.title}
              placeholder="タイトル"
              className="w-full resize-none bg-transparent text-lg focus:outline-none font-bold"
              {...register("title")}
            />
          </div>
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
                キャンセル
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
