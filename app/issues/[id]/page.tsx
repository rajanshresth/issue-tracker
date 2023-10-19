import prisma from '@/prisma/client'
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
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage