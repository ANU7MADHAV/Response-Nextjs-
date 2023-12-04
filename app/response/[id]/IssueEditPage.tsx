import { Response } from "@prisma/client";
import { Heading, Flex, Badge, Card, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

const IssueEditPage = ({ response }: { response: Response }) => {
  if (!response) {
    return <div>Error: Invalid response</div>;
  }
  return (
    <>
      <Heading>{response.title}</Heading>
      <Flex gap="3" my="3">
        <Badge>{response.status}</Badge>
        <Text>{response.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Markdown className="prose dark:text-white">
          {response.description}
        </Markdown>
      </Card>
    </>
  );
};

export default IssueEditPage;
