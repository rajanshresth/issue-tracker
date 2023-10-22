"use client"
import { Box } from '@radix-ui/themes'
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
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center font-bold'>
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
        <Box>
          {status==="authenticated" && <Link href="/api/auth/signout" >Log out</Link>}
          {status==="unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
        </Box>
    </nav>
  )
}

export default NavBar