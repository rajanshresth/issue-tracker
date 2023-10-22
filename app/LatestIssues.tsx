import prisma from '@/prisma/client'
import { Flex, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IssueStatusBadge } from './components'

const LatestIssues = async() => {
    const issues = await prisma.issue.findMany({
        orderBy: {createdAt: 'desc'},
        take:7
    })
  return (
    <>
        <Table.Root>
            <Table.Body>
                {issues.map(issues=>(
                    <Table.Row key={issues.id}>
                        <Table.Cell>
                            <Flex justify={"between"}>
                                <Flex direction={"column"} align={"start"} gap="2">
                                    <Link href={`/issues/${issues.id}`} className='font-bold text-blue-500 hover:text-blue-700'>{issues.title}</Link>
                                    <IssueStatusBadge status={issues.status} />
                                </Flex>
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </>
  )
}

export default LatestIssues