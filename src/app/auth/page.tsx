"use client";

import axios from "axios";
import { useCallback, useState } from "react"
import Input from "@/components/Input"
import Image from "next/image"
import { signIn } from "next-auth/react";

const Auth = () => {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState<'login' | 'register' >('login')
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, [])

    const login = useCallback(async () => {
        try {
            const response = await signIn('credentials', {
                email: email,
                password: password,
                callbackUrl: '/'
            })
            
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }, [email, password])

    const register = useCallback( async () => {
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                lastname,
                email,
                password,
            })
            if (response.status === 201) {
                console.log('Usuario registrado')
                login()
            }

        } catch (error) {
            console.log(error)
        }
    }, [name, lastname, email, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeatbg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-10 py-3">
                    <Image src="/images/logo.png" alt="Logo" width={150} height={48}/>
                </nav>
                {/* Container */}
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-12 py-7 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold ">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {/* Register */}
                            {variant === 'register' && (
                                <div className="flex gap-4">
                                    <Input
                                        label="Name"
                                        onChange={(ev: any) => setName(ev.target.value)}
                                        id="name"
                                        type="text"
                                        value={name}
                                    />
                                    <Input
                                        label="Lastname"
                                        onChange={(ev: any) => setLastname(ev.target.value)}
                                        id="lastname"
                                        type="text"
                                        value={lastname}
                                    />
                                </div>
                            )}
                            {/* Login */}
                            <Input
                                label="Email"
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />

                            {/* Terminos y condiciones */}
                            {variant === 'register' && (
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        id="terms"
                                        onChange={() => {}}
                                        className="hidden"
                                    />
                                    <label htmlFor="terms" className="text-white cursor-pointer hover:underline">
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                            )}
                            


                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 rounded-md text-white w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign up'} 
                        </button>
                        <p className="text-neutral-500 mt-8">
                            {variant === 'login' ? 'Dont have an account?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth