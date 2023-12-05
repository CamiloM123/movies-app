"use client"

import { signOut } from "next-auth/react"

const UserAccountNav = () => {
    return (
        <button onClick={() => signOut({
            redirect: true, 
            callbackUrl: '/auth'
        })} className="h-10 w-full bg-white">
            Logout!
        </button>
    )
}

export default UserAccountNav