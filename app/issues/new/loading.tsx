"use client"
import { Box, Button, TextField } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components'

const LoadingNewPage = () => {
  return (
    <Box className='max-w-xl'>
        <TextField.Root>
            <Skeleton />
        </TextField.Root>
        <div><Skeleton /></div>
        <Button >
            <Skeleton />
        </Button>
    </Box>
  )
}

export default LoadingNewPage