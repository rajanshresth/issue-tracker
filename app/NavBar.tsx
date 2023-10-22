"use client"
import { Avatar, Box, Container, DropdownMenu, Flex,Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { PiBug } from 'react-icons/pi'

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
  const {status,data:session}=useSession();
  if (status==="loading") return null;
  if(status==="unauthenticated") 
    return <Link href="/api/auth/signin" className="text-zinc-500 hover:text-zinc-950">Login</Link>
  return (
      <Box pr={'5'}>
      {status==="authenticated" 
      && 
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src={session.user?.image!} fallback="?" size={'2'} radius='full' className='cursor-pointer'
              referrerPolicy='no-referrer' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size={'2'}>
                  {session.user!.email}
                </Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">
                  Logout
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
      }
    </Box>
  )
}

export default NavBar