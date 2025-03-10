import { allPosts } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts = allPosts;

  return (
    <div className="container mx-auto px-8 max-w-4xl py-6 lg:py-10">
      <div>
        <div className="space-y-4">
          <h1 className="font-extrabold text-4xl lg:text-5xl">ブログ記事</h1>
          <p className="text-muted-foreground text-lg">
            開発者のブログの閲覧ができます。
            <br />
            MDXファイルをContentLayerで変換したものを掲載しています。
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid sm:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post._id} className="relative flex flex-col space-y-2">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                className="rounded-xl border bg-muted"
              />
            )}
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
            {post.description && (
              <p className="text-muted-foreground">{post.description}</p>
            )}
            {post.date && (
              <p className="text-muted-foreground">
                {format(post.date, "yyyy/MM/dd")}
              </p>
            )}
            <Link href={post.slug} className="absolute inset-0"></Link>
          </article>
        ))}
      </div>
    </div>
  );
}
