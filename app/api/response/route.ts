import authOption from "@/app/auth/authOption";
import { schema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { erro: validation.error.errors },
      { status: 400 }
    );
  }

  const newResponse = await prisma.response.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newResponse, { status: 201 });
};
