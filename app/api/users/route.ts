import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export async function PATCH(req: NextRequest) {
  try {
    const json = await req.json();
    const body = routeContextSchema.parse(json);

    await db.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
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
