import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

const IssueAction = () => {
  return (
    <Flex mb="5" justify="between">
      <IssueFilter />
      <Button>
        <Link href="/response/new">Add Response</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
