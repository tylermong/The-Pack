'use client'

import Image from "next/image";
import Link from 'next/link'

export default function Login(){
    return(
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        src="/The Pack Logo.jpg"
                        width={500}
                        height={500}
                        draggable={false}
                        alt="The Pack Logo"
                    />

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div className="relative">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-white focus:outline-none focus:ring-0 peer" placeholder=""
                            />
                            
                            <label
                            htmlFor="email"
                            className="absolute text-sm text-white duration-300 transform select-none cursor-text -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Email
                            </label>

                            {/*
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-white hover:text-gray-100">Forgot email?</a>
                                </div>
                            */}

                        </div>

                        <div className="relative">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-black rounded-lg border border-white focus:outline-none focus:ring-0 peer" placeholder=""
                            />
                            
                            <label
                            htmlFor="password"
                            className="absolute text-sm text-white duration-300 transform select-none cursor-text -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-black px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                Password
                            </label>

                            {/*
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-white hover:text-gray-100">Forgot password?</a>
                                </div>
                            */}
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 m-0 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 transition duration-300">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm white">Not a member?{' '}
                        <Link className="font-bold leading-6 text-white hover:text-gray-300 transition duration-300" href="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}