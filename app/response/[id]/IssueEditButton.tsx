import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueEditButton = ({ responseId }: { responseId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/response/${responseId}/edit`}> Edit Response</Link>
    </Button>
  );
};

export default IssueEditButton;
