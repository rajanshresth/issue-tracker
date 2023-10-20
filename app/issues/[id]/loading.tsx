import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Box, Card, Flex, Heading,Text } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Markdown from 'react-markdown'

const LoadingNewPageId = () => {
  return (
    <Box className='max-w-xl'>
      <Heading><Skeleton /></Heading>
        <Flex className='space-x-3' my="3">
          <Skeleton />
          <Text><Skeleton /></Text>
        </Flex>
        <Card className='prose lg:prose-xl' mt="4">
          <p><Skeleton /></p>
        </Card>
    </Box>
  )
}

export default LoadingNewPageId