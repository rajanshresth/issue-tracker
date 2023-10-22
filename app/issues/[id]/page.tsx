import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import EditIssueButton from './EditIssueButton'
import IssueDetails from '../IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

const IssueDetailPage = async({params}:{params:{id:string}}) => {
    const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
    })
    if(!issue) {
        return notFound();
    }
  return (
    <Grid columns={{initial:"1",md:"5"}} gap='5'>
        <Box className='lg:col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <Flex direction={'column'} gap={'2'}>
            <EditIssueButton issueId={issue.id}/>
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
    </Grid>
  )
}

export default IssueDetailPage