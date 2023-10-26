"use client";
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';


const AssigneeSelect = () => {
  const {data:users,error, isLoading}=useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      const users = await response.json();
      return users;
    },
    staleTime: 1000 * 60 , //60sec 
    retry: 3,
  });
  if(isLoading) return <Skeleton />;
  if(error) return null;
  
  return (
    <Select.Root>
        <Select.Trigger placeholder='Asign...' />
        <Select.Content>
           <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            {users?.map((user) => (
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