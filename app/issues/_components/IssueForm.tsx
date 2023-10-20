"use client"
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import {useForm,Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchema';
import {z} from 'zod';
import {ErrorMessage,Spinner} from '@/app/components'
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueFormData=z.infer<typeof IssueSchema>

const IssueForm = ({issue}:{issue?:Issue}) => {
    const router = useRouter()
    const {register,control,handleSubmit, formState:{errors}} = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    });
    const [isSubmitting,setSubmitting]=useState(false);
    const [error,setError]=useState('');
    const onSubmit=handleSubmit(async (data:IssueFormData) => {
        try {
            setSubmitting(true);
            if(issue)
                await axios.patch('/api/issues/'+issue.id,data);
            else
               await axios.post('/api/issues',data); 
               router.push('/issues');
               router.refresh();
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
            <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller 
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({field})=><SimpleMDE placeholder='Description' {...field} />}
        />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
            {isSubmitting && <Spinner/>}
        </Button>
    </form>
    </div>
  )
}

export default IssueForm