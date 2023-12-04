import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueEditPage from "./IssueEditPage";
import IssueDeleteButton from "./edit/IssueDeleteButton";
import AssigneItems from "./AssigneItems";

interface Prop {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Prop) => {
  const response = await prisma.response.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!response) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Box>
        <IssueEditPage  response={response} />
      </Box>
      <Box>
        <Flex gap="3">
          <AssigneItems response={response} />
          <IssueEditButton responseId={response.id} />
          <IssueDeleteButton responseId={response.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
