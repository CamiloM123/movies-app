import React from 'react'
import { getServerSession } from 'next-auth'
import authOptions from '@/../lib/auth'

const page = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
        return <div className='text-white'>You are not logged in</div>
    }
    return (
        
        <div className='text-white'>Welcome to admin dashboard {session?.user.name}</div>
    )
}

export default page