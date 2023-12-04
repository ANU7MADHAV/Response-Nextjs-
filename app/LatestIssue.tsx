import prisma from "@/prisma/client";
import { Avatar, Badge, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssue = async () => {
  const issues = await prisma.response.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading mb="4">Latest Response</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start">
                    <Link href={`/response/${issue.id}`}>{issue.title}</Link>
                    <Badge>{issue.status}</Badge>
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
