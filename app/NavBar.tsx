"use client"
import { Avatar, Box, Container, DropdownMenu, Flex,Text } from '@radix-ui/themes'
import { useSession, signIn, signOut } from './auth/better/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { PiBug } from 'react-icons/pi'
import Skeleton from './components/Skeleton'

const NavBar = () => {
   
  return (
    <nav className='border-b mb-5 px-5 py-5 font-bold'>
      <Container>
        <Flex justify={'between'}>
            <Flex align="center" gap={'3'}>
              <Link href="/">
                <PiBug size={32}/>
              </Link>
              <NavLinks /> 
            </Flex>
          <AuthStatus />
         </Flex>
      </Container>
    </nav>
  )
}

const NavLinks=()=>{
  const currentPathname=usePathname();
  const links= [
      {label:'Dashboard', href:'/'},
      {label:'Issues', href:'/issues'}
  ]
  return(
    <ul className='flex space-x-6'>
        {links.map(link=>
        <li key={link.href}>
          <Link  href={link.href} 
                  className={`${link.href===currentPathname ? 'text-zinc-90': `text-zinc-500`} hover:text-zinc-900 transition-colors`}>
                {link.label}
            </Link>
        </li>)}
    </ul>
  )

}

const AuthStatus=()=>{
  const { data, isPending } = useSession();
  if (isPending) return <Skeleton width={'3rem'} />;
  if(!data?.session)
    return (
      <button
        className="text-zinc-500 hover:text-zinc-950"
        onClick={() => signIn.social({ provider: 'google' })}
      >
        Login
      </button>
    );
  return (
      <Box pr={'5'}>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar fallback="?" size={'2'} radius='full' className='cursor-pointer'
              referrerPolicy='no-referrer' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={() => signOut()}>
                  Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar