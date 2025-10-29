import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "../IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { cookies } from "next/headers";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetailPage = async ({ params }: any) => {
  const cookieHeader = cookies().toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/auth/session`,
    {
      headers: { cookie: cookieHeader },
    }
  );
  const authData = await res.json().catch(() => null);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return notFound();
  }
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap='5'>
      <Box className='lg:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {authData?.session && (
        <Box>
          <Flex direction={"column"} gap={"2"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
