"use client"
import { TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-5'>
        <TextField.Root>
            <TextField.Input placeholder='Title' />
        </TextField.Root>
        <TextArea placeholder='Description' />
    </div>
  )
}

export default NewIssuePage