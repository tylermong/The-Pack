'use client'


//JUST MOVE ALL STYLING TO LAYOUT 



import Image from "next/image";
import Link from 'next/link'
import { useState } from 'react';

{/*THIS WHOLE PART IS AI OUNT THIS */}
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const sendRegister = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if(response.ok)
        {
            console.log("GOOD")
        }
    
        if (!response.ok) {
            // Handle error
            const data = await response.json();
            alert(`Error: ${data.message || 'Registration failed'}`);
            return;
        }
    
    };




    return(
    <div className="font-[sans-serif] bg-black md:h-screen">

        <div className="grid md:grid-cols-2 items-center gap-8 h-full">

            <div className="max-md:order-1 p-4 bg-black-50 h-full">

            <Image
            src="/The Pack Logo.jpg"
            width={500}
            height={500}
            draggable={false}
            alt="The Pack Logo"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            />
            
            </div>

            <div className="flex items-center p-6 h-full w-full">

                <form className="max-w-lg w-full mx-auto" onSubmit={sendRegister}>

                    <div className="mb-12">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Create an account</h3>
                    </div>

                    <div>

                        <label className="text-white-900 text-xs block mb-2">Full Name</label>

                        <div className="relative flex items-center">

                            <input 
                            name="name" 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
                            placeholder="Enter name" />

                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="#bbb" 
                            stroke="#bbb" 
                            className="w-[18px] h-[18px] absolute right-2" 
                            viewBox="0 0 24 24">

                            <circle cx="10" 
                            cy="7" 
                            r="6" 
                            data-original="#000000">
                            </circle>

                            <path 
                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" 
                            data-original="#000000">
                            </path>

                            </svg>

                        </div>

                    </div>

                    <div className="mt-6">

                        <label className="text-white-900 text-xs block mb-2">Email</label>

                            <div className="relative flex items-center">
                                <input 
                                name="email" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
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
                                clip-path="url(#a)" 
                                transform="matrix(1.33 0 0 -1.33 0 682.667)">

                                    <path 
                                    fill="none" 
                                    stroke-miterlimit="10" 
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
                                required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
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

                    <div className="flex items-center mt-6">

                            <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                            className="h-4 w-4 shrink-0 rounded" />

                            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                                I accept the <a href="javascript:void(0);" className="text-white font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>

                    </div>

                    <div className="mt-12">

                        <button type="submit" className="w-full py-3 px-6 text-sm tracking-wide font-semibold rounded-md bg-white hover:bg-gray-400 text-black focus:outline-none">
                            Create an account
                        </button>
                        


                        <p className="text-sm mt-6 text-gray-200">Already have an account? 
                            <Link className="text-white font-semibold hover:underline ml-1" href = "/login">Login here</Link>
                        </p>
                    
                    </div>

                </form>

            </div>

        </div>

    </div>
    );
};


export default Register;