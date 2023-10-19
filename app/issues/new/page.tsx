"use client"
import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
    title:string
    description:string
}

const NewIssuePage = () => {
    const router = useRouter()
    const {register,control,handleSubmit} = useForm<IssueForm>();
    const handleSubmitData=async (data:IssueForm) => {
        const response =  await fetch('/api/issues',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        })
        router.push('/issues');
        return response.json();
        
    }
  return (
    <form className='max-w-xl space-y-5' onSubmit={handleSubmit(handleSubmitData)}
    >
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller 
            name="description"
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field} />}
        />
        <Button>
            Submit Issue
        </Button>
    </form>
  )
}

export default NewIssuePage