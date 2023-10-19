"use client"
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm=z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
    const router = useRouter()
    const {register,control,handleSubmit, formState:{errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [isSubmitting,setSubmitting]=useState(false);
    const [error,setError]=useState('');
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller 
            name="description"
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field} />}
        />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
            Submit Issue{isSubmitting && <Spinner/>}
        </Button>
    </form>
    </div>
  )
}

export default NewIssuePage