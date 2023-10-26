"use client";
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Asign...' />
        <Select.Content>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='1'>John Doe</Select.Item>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect