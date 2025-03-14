import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToUser(params.userId))) {
      return NextResponse.json(null, { status: 403 });
    }

    await db.post.deleteMany({
      where: {
        authorId: params.userId,
      },
    });

    await db.account.deleteMany({
      where: {
        userId: params.userId,
      },
    });

    await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

async function verifyCurrentUserHasAccessToUser(userId: string) {
  const session = await getServerSession(authOptions);
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return session?.user.id === user?.id;
}
