import { Heading, Flex, Card,Text } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'
import { IssueStatusBadge } from '../components'
import { Issue } from '@prisma/client'

const IssueDetails = ({issue}:{issue:Issue}) => {
  return (
    <div>
        <Heading>{issue.title}</Heading>
          <Flex className='space-x-3' my="3">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className='prose lg:prose-xl max-w-full' mt="4">
            <Markdown>{issue.description}</Markdown>
          </Card>
    </div>
  )
}

export default IssueDetails