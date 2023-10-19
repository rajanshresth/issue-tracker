"use client"
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
    title:string
    description:string
}

const NewIssuePage = () => {
    const router = useRouter()
    const {register,control,handleSubmit} = useForm<IssueForm>();
    const [isSubmitting,setSubmitting]=useState(false);
    const [error,setError]=useState('')
    const onSubmit=handleSubmit(async (data:IssueForm) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occured.')
        }
    })
  return (
    <div>
        {error && (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>
        )}
        
    <form className='max-w-xl space-y-5' onSubmit={onSubmit}
    >
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller 
            name="description"
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field} />}
        />
        <Button disabled={isSubmitting}>
            Submit Issue
        </Button>
    </form>
    </div>
  )
}

export default NewIssuePage