import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

export default async function Home() {
  let open = 0;
  let inProgress = 0;
  let closed = 0;
  try {
    open = await prisma.issue.count({ where: { status: "OPEN" } });
    inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
    closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  } catch {
    // Database not initialized yet; render zeros gracefully
  }
  return (
    <main>
      <Flex direction={"column"} gap={"5"}>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <span className='border-b-4 border-indigo-500'></span>
        <h1 className='text-blue-700 font-bold text-3xl'>Latest Issue: </h1>
        <LatestIssues />
      </Flex>
    </main>
  );
}
