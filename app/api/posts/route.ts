import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { postPatchSchema } from "@/lib/validations/post";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 403 });
    }
    const { user } = session;

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await db.post.create({
      data: {
        blogId: body.blogId,
        content: body.content,
        authorId: user.id,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}
