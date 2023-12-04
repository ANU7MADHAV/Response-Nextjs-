import IssueBadge from "@/components/IssueBadge";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueAction from "./IssueAction";
import { Response, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/components/Pagination";

interface Prop {
  searchParams: { status: Status; orderBy: keyof Response; page: string };
}

const IssuesPage = async ({ searchParams }: Prop) => {
  const columns: { label: string; value: keyof Response }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "created", value: "createdAt" },
  ];
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const responses = await prisma.response.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.response.count({
    where,
  });

  return (
    <div>
      <IssueAction />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {responses.map((response) => (
            <Table.Row key={response.id}>
              <Table.RowHeaderCell>
                <Link href={`/response/${response.id}`}>{response.title}</Link>
              </Table.RowHeaderCell>
              <Table.Cell>
                <IssueBadge status={response.status} />
              </Table.Cell>
              <Table.Cell>{response.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
