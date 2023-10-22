"use client"
import { Box, Container, Flex } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { PiBug } from 'react-icons/pi'

const NavBar = () => {
    const currentPathname=usePathname();
    const {status,data:session}=useSession();
    const links= [
        {label:'Dashboard', href:'/'},
        {label:'Issues', href:'/issues'}
    ]
  return (
    <nav className='border-b mb-5 px-5 py-5 font-bold'>
      <Container>
        <Flex justify={'between'}>
          <Flex align="center" gap={'3'}>
            <Link href="/">
                  <PiBug size={32}/>
              </Link>
              <ul className='flex space-x-6'>
                  {links.map(link=>
                  <li key={link.href}>
                    <Link  href={link.href} 
                            className={`${link.href===currentPathname ? 'text-zinc-90': `text-zinc-500`} hover:text-zinc-900 transition-colors`}>
                          {link.label}
                      </Link>
                  </li>)}
              </ul>
          </Flex>
          <Box pr={'5'}>
              {status==="authenticated" && <Link href="/api/auth/signout" >Log out</Link>}
              {status==="unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar