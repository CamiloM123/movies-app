import { getServerSession } from 'next-auth'
import authOptions from '@/../lib/auth'

// export async function redirectIfNotAuthenticated(context: any) {

//     const session = await getServerSession(authOptions)

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/auth',
//                 permanent: false
//             }
//         }
//     }
// }

const Profiles = async () => {  

    return (
        <div>
            <p className="text-white text-4xl">Profiles</p>
        </div>
    )
};

export default Profiles;