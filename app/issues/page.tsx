import { Button, Table } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'

const IssuesPage = async() => {
  const getData = async() => {
    const res = await axios.get('http://localhost:3000/api/issues');
    return res.data;
  }
  const issues = await getData();
  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href='/issues/new'>
            New Issue
          </Link>
        </Button>
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue:any) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {new Date(issue.createdAt).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage