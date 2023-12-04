import authOption from "@/app/auth/authOption";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import IssueSkeleton from "../../_components/IssueSkeleton";

const IssueForm = dynamic(
  () => import("@/app/response/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueSkeleton />,
  }
);

interface Prop {
  params: { id: string };
}

const IssueEditPage = async ({ params }: Prop) => {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.response.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
