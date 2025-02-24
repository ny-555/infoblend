"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";
import Image from "next/image";
import Callout from "./callout";

const Components = {
  Image,
  Callout,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div>
      <div className="prose prose-lg max-w-full">
        <Component components={Components} />
      </div>
    </div>
  );
}
