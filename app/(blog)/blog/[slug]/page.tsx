import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { format } from "date-fns";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { allPosts } from "@/.contentlayer/generated";
import { siteConfig } from "@/config/site";

import { buttonVariants } from "@/components/ui/button";
import BlogPostItem from "@/components/blog-post-item";
import BlogEditor from "@/components/blog-editor";
import Mdx from "@/components/mdx-component";

async function getPostFromSlug(slug: string) {
  const post = allPosts.find((post) => post.slugAsParams === slug);
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPostFromSlug(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: "article",
      locale: "ja",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [`${siteConfig.url}/og.jpg`],
      creator: "@yuki",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = await getPostFromSlug(slug);
  const user = await getCurrentUser();

  if (!post) {
    notFound();
  }

  const posts = await db.post.findMany({
    where: {
      blogId: slug,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="space-y-10">
      <article className="container mx-auto px-8 max-w-3xl py-6 lg:py-10">
        <div>
          {post.date && (
            <time>Published on {format(post.date, "yyyy/MM/dd")}</time>
          )}
          <h1 className="mt-2 font-extrabold text-4xl md:text-5xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
        </div>
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={405}
            className="my-8 border rounded-xl bg-muted"
          />
        )}
        <Mdx code={post.body.code} />
        <hr className="mt-12" />
      </article>

      {/* コメント一覧の表示 */}
      <div className="container mx-auto px-8 max-w-3xl">
        {posts.length ? (
          <div className="divide-y border rounded-xl">
            {posts.map((post) => (
              <BlogPostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="divide-y border rounded-xl px-6 py-4">
            <p className="text-md md:text-lg">コメントがありません。</p>
          </div>
        )}
      </div>

      {/* コメント投稿欄 */}
      <div className="container mx-auto px-8 max-w-3xl">
        {user ? (
          <BlogEditor
            post={{
              blogId: slug,
            }}
          />
        ) : (
          <div className="border rounded-xl p-4 space-y-4 text-center">
            <p>ログインするとコメントできます。</p>
            <Link
              href={"/login"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              ログイン
            </Link>
          </div>
        )}
      </div>

      <div className="py-6 text-center lg:py-10">
        <Link
          href={"/blog"}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          全ての記事を見る
        </Link>
      </div>
    </div>
  );
}
