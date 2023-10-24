import React from 'react'
import Link from 'next/link'
import { signOut, signIn, useSession } from 'next-auth/react'


const SideNav = () => {

const session = useSession()

 const user = session.data?.user

  return (
    <nav className="sticky top-0 self-start px-2 py-4">
        <ul className='flex flex-col items-start gap-2 whitespace-nowrap'>
            <li>
                <Link href="/">Home</Link>
            </li>
            {/* Only show is user is logged in */}
            {/* Use user session to concatenate the user's id to the profile path */}
            {user != null && (
                <li>
                    <Link href={`/profiles/${user.id}`}>Profile</Link>
                </li>
            )}
            {user == null ? (
                <li>
                    <button onClick={() => void signIn()}>Sign In</button>
                </li>
            ) : (
            <li>
                <button onClick={() => void signOut()}>Log Out</button>
            </li> 
            )}
        </ul>
    </nav>
  )
}

export default SideNav