import { Table } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import IssueActionButton from './IssueActionButton'

const IssuesPage = async() => {
  const getData = async() => {
    const res = await axios.get('http://localhost:3000/api/issues');
    return res.data;
  }
  const issues = await getData();
  return (
    <div>
      <IssueActionButton />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {issues.map((issues:any) => (
            <Table.Body key={issues.id}>
              <Table.Row key={issues.id}>
                <Table.Cell>
                  <Link href={`/issues/${issues.id}`} className='font-semibold text-blue-600 dark:text-blue-500 hover:underline'>
                    {issues.title}
                  </Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issues.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issues.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {new Date(issues.createdAt).toDateString()}
                </Table.Cell>
             </Table.Row>
          </Table.Body>
        ))}
      </Table.Root>
    </div>
  )
}

export default IssuesPage