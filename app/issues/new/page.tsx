"use client"
import { TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-5'>
        <TextField.Root>
            <TextField.Input placeholder='Title' />
        </TextField.Root>
        <SimpleMDE />
    </div>
  )
}

export default NewIssuePage