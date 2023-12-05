import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/../lib/prismadb";
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if ( !credentials?.email || !credentials?.password ) {
                    return null
                }
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user || !user.hashedPassword){
                    return null
                }

                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    return null
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {  
            if (user) {
                return{ 
                    ...token,
                    name: user.name,
                }
            }
            return token
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                }
            }
        },
    }
    ,
    pages: {
        signIn: '/auth',
    },
    // debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}   

export default authOptions;