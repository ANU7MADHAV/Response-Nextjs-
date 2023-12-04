import authOption from "@/app/auth/authOption";
import { patchResponseSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface Prop {
  params: { id: string };
}

export const PATCH = async (request: NextRequest, { params }: Prop) => {
  // const session = await getServerSession(authOption);
  // if (!session)
  //   return NextResponse.json({ message: "Not allowed" }, { status: 401 });

  const body = await request.json();
  const validation = patchResponseSchema.safeParse(body);

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ message: "Invalid user." }, { status: 400 });
  }

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const response = await prisma.response.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!response) notFound();

  const updatedResponse = await prisma.response.update({
    where: {
      id: response?.id,
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedResponse);
};

export const DELETE = async (request: NextRequest, { params }: Prop) => {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const response = await prisma.response.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!response)
    return NextResponse.json({ error: "Invalid Response" }, { status: 404 });

  await prisma.response.delete({
    where: {
      id: response?.id,
    },
  });

  return NextResponse.json({});
};
