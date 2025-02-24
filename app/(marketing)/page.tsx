import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="space-y-10">
      <section className="container mx-auto px-8 pt-6 md:pt-10 lg:py-32 pb-8 md:pb-12">
        <div className="container mx-auto text-center flex flex-col items-center gap-6 max-w-[64rem]">
          <Link
            href={siteConfig.links.x}
            className="bg-muted px-5 py-2 rounded-full font-medium text-sm"
          >
            Xをフォロー
          </Link>
          <h1 className="font-extrabold text-6xl md:text-7xl lg:text-8xl">
            InfoBlend
          </h1>
          <p className="text-muted-foreground sm:text-xl leading-normal max-w-[42rem]">
            このアプリケーションは管理者のブログ記事の閲覧ができます。
            <br />
            ユーザーは自由にコメントをポストすることができます。
          </p>
          <div className="space-x-4">
            <Link
              href={"/login"}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              はじめる
            </Link>
            <Link
              href={siteConfig.links.github}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container mx-auto p-8 md:py-12 lg:py-24 bg-slate-50 rounded-lg space-y-8"
      >
        <div className="mx-auto text-center space-y-8 max-w-[58rem]">
          <h2 className="font-extrabold text-5xl lg:text-6xl">
            サービスの特徴
          </h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            このプロジェクトは以下の技術スタック、サービスを利用して作られています。
          </p>
        </div>
        <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[64rem]">
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M386.399 35.508C217.06-64.061 1.885 57.55.012 253.882c-1.828 191.716 201.063 315.545 370.02 231.163L185.56 213.636v167.997c0 18.614-35.619 18.614-35.619 0V156.421c0-14.776 27.448-15.989 35.226-3.145L395.43 470.572c157.95-101.737 155.817-338.136-9.031-435.064zm-23.756 317.939L326.91 298.87V149.458c0-13.932 35.732-13.932 35.732 0v203.989z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Next.js</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M128 204.667C145.062 136.227 187.738 102 256 102c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C494.938 221.773 452.262 256 384 256c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5zm-128 154C17.062 290.227 59.738 256 128 256c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C366.938 375.773 324.262 410 256 410c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Tailwind CSS</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Shadcn/ui</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754a1.31 1.31 0 0 0-1.206.626l-8.952 14.5a1.356 1.356 0 0 0 .016 1.455l4.376 6.778a1.408 1.408 0 0 0 1.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.145zm-1.848.752L9.18 22.224a.452.452 0 0 1-.575-.52l3.85-18.438c.072-.345.549-.4.699-.08l7.129 15.138a.515.515 0 0 1-.325.713z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Prisma</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 256 285"
              >
                <path d="M220.412 0h-92.415l28.562 89.006h92.416l-74.77 53.077l28.57 89.511c48.128-35.06 63.854-88.12 46.208-142.588L220.413 0ZM7.018 89.006h92.416L127.997 0H35.589L7.019 89.006c-17.655 54.468-1.92 107.529 46.207 142.588l28.563-89.51l-74.77-53.078Zm46.208 142.588l74.77 52.97l74.77-52.97l-74.77-53.847l-74.77 53.847Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">NextAuth</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background border p-2 rounded-lg">
            <div className="flex flex-col justify-center p-6 h-[180px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
                />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Supabase</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum, dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center">
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            Infoblendはログインするとコメントの投稿ができるようになります。
          </p>
        </div>
      </section>

      <section id="contact" className="container mx-auto p-8 md:py-12 lg:py-24">
        <div className="max-w-[58rem] mx-auto text-center flex flex-col gap-6">
          <h2 className="font-extrabold text-5xl lg:text-6xl">Contact Me</h2>
          <p className="text-muted-foreground sm:text-lg sm:leading-7">
            ご連絡は以下のリンクよりお願いします。
          </p>
          <Link
            href={siteConfig.links.x}
            className="text-lg underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            MAIL
          </Link>
        </div>
      </section>
    </div>
  );
}
