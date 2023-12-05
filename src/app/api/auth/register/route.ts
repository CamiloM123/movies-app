import bcrypt from 'bcrypt';
// import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import prismadb from '@/../lib/prismadb';

export async function POST(req: Request){
    try{
        const body = await req.json();
        const { name, lastname, email, password } = body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email,
            }
        })

        if(existingUser){
            return NextResponse.json({ error: 'User already exists, email taken' }, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prismadb.user.create({
            data: {
                name,
                lastname,
                email,
                hashedPassword: hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })

        return NextResponse.json({user: newUser, message:"User created successfully"}, {status: 201}, )
    }catch(err){
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500})
    }
}
