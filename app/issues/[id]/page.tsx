import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetailPage = async({params}:{params:{id:string}}) => {
    const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
    })
    if(!issue) {
        return notFound()
    }
    delay(2000);
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my="3">
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose lg:prose-xl' mt="4">
          <Markdown>{issue.description}</Markdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage