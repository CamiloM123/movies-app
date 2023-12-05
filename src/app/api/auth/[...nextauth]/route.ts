import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prismadb from "@/../lib/prismadb"
import { compare } from "bcrypt"
import { authOptions } from "@/../lib/auth"

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET}