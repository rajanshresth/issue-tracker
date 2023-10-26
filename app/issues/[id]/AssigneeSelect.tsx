"use client";
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import React, { useEffect } from 'react'

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const users = await response.json();
      setUsers(users);
    };
    fetchUsers();
  },[]);
  console.log(users);
  return (
    <Select.Root>
        <Select.Trigger placeholder='Asign...' />
        <Select.Content>
           <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            {users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                    {user.name}
                </Select.Item>
            ))}
           </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect