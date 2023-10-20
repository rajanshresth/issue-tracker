import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

const IssueDetailPage = async({params}:{params:{id:string}}) => {
    const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
    })
    if(!issue) {
        return notFound();
    }
    delay(2000);
  return (
    <Grid columns={{initial:"1",md:"2"}} gap='5'>
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className='space-x-3' my="3">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose lg:prose-xl' mt="4">
            <Markdown>{issue.description}</Markdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage