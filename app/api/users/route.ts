import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  email: z.string(),
  name: z.string(),
});

export async function PATCH(req: NextRequest) {
  try {
    const json = await req.json();
    console.log("jsonデータ: ", json);
    const body = routeContextSchema.parse(json);

    await db.user.update({
      where: {
        email: body.email,
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
