import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import { parse } from 'path'
import React from 'react'

const IssueDetailPage = async({params}:{params:{id:string}}) => {
    const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
    })
    if(!issue) {
        return notFound()
    }
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my="3">
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          {issue.description}
        </Card>
    </div>
  )
}

export default IssueDetailPage