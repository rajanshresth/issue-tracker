import Image from 'next/image'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart';
import { Flex } from '@radix-ui/themes';
import Pagination from "./components/Pagination";

export default async function Home() {
  const open = await prisma.issue.count({where:{status:'OPEN'}});
  const inProgress = await prisma.issue.count({where:{status:'IN_PROGRESS'}});
  const closed = await prisma.issue.count({where:{status:'CLOSED'}});
  return (
    <main>
      <Flex direction={"column"} gap={"5"}>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <span className="border-b-4 border-indigo-500"></span>
        <h1 className="text-blue-700 font-bold text-3xl">Latest Issue: </h1>
        <LatestIssues />
        <Pagination itemCount={100} pageSize={10} currentPage={1} />
      </Flex>
    </main>
  );
}
