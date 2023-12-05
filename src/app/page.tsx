import { getServerSession } from 'next-auth'
import authOptions from '@/../lib/auth'
import UserAccountNav from '@/components/UserAccountNav'

export default async function Home(){
  const session = await getServerSession(authOptions)
  
  return (
    <main>
      <div className="text-2xl text-green-500">Netflix clone</div>
      <p className="text-white"> Logged in as: {session?.user.email}</p>
      <UserAccountNav />
    </main>
  )
}
