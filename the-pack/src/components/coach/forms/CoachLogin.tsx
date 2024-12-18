import React from 'react';
import Image from "next/image";
import Link from 'next/link'
import {useRouter} from "next/navigation";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CoachLoginForm = () =>{
    const router = useRouter()
    const { data: session, status } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Redirects to home if user is already authenticated
    useEffect(() => {
        if(session && session.user || status == "authenticated"){
            router.push("/coachhome")
        }
    }, [session, router, status])

    //loading state
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    //Handles login and stores JWT token into local storage for authentication
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/auth/userLogin", {
                username,
                password,
            });

            const { accessToken, refreshToken } = response.data.backendTokens;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            router.push("/coachhome");  
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert("LOGIN FAILED. PLEASE CHECK YOUR CREDENTIALS.");
        }
    }


    return(
        <div>
            <div className="font-[sans-serif] bg-black md:h-screen">

                <div className="flex flex-col md:flex-row items-center gap-8 h-full">

                    <div className="md:w-1/2 w-full p-4 bg-black-50 flex justify-center">
                        <Image
                        src="/images/Logo1.jpg"
                        width={500}
                        height={500}
                        draggable={false}
                        layout='responsive'
                        alt="The Pack Logo"
                        className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
                        />
                    </div>

                    <div className="flex items-center md:w-1/2 justify-center p-6 h-full w-full">
                        <form className="max-w-lg w-full mx-auto" onSubmit={handleLogin}>
                            <div className="mb-12">
                                <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Coach Log In</h3>
                            </div>

                            <div className="mt-6">
                                <label className="text-white-900 text-xs block mb-2">Email</label>
                                    <div className="relative flex items-center">
                                        <input 
                                        name="email" 
                                        type="email" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required 
                                        className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
                                        placeholder="Enter email" />
                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="#bbb" 
                                        stroke="#bbb" 
                                        className="w-[18px] h-[18px] absolute right-2" 
                                        viewBox="0 0 682.667 682.667">
                                            <defs>
                                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                                </clipPath>
                                            </defs>
                                            <g 
                                            clipPath="url(#a)" 
                                            transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                <path 
                                                fill="none" 
                                                strokeMiterlimit="10" 
                                                stroke-width="40" 
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" 
                                                data-original="#000000"></path>

                                                <path 
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" 
                                                data-original="#000000"></path>
                                            </g>
                                        </svg>
                                    </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-white-900 text-xs block mb-2">Password</label>
                                    <div className="relative flex items-center">
                                        <input 
                                        name="password" 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
                                        placeholder="Enter password" />

                                        <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="#bbb" 
                                        stroke="#bbb" 
                                        className="w-[18px] h-[18px] absolute right-2 cursor-pointer" 
                                        viewBox="0 0 128 128">

                                        <path 
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" 
                                        data-original="#000000"></path>

                                        </svg>
                                    </div>
                            </div>

                            <div className="mt-12">
                                <button type="submit" className="w-full py-3 px-6 text-sm tracking-wide font-semibold rounded-md bg-white hover:bg-gray-400 text-black focus:outline-none">
                                    Sign In
                                </button>
                                <p className="text-sm mt-6 text-gray-200">Need a coach account? 
                                    <Link className="text-white font-semibold hover:underline ml-1" href = "/coachregister">Register</Link>
                                </p>
                                <p className="text-sm mt-6 text-gray-200">Client? 
                                    <Link className="text-white font-semibold hover:underline ml-1" href = "/clientlogin">Login</Link>
                                </p>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default CoachLoginForm;