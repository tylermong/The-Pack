import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link'
import {useRouter} from "next/navigation";
import axios from 'axios';


const CoachRegisterForm = () =>{
    const router = useRouter()
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showKey, setShowKey] = useState(false);


    const sendRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if key is valid
        const keyResponse = await axios.get(`http://localhost:3001/coach-key/${key}`);

        console.log(keyResponse)

        if(keyResponse.statusText === 'Not Found') {
            alert('Invalid coach key');
            return;
        }
        else if(keyResponse.statusText === 'OK') {
            // Send registration request
            const response = await axios.post('http://localhost:3001/user', { name, email, password, role: "COACH"});
            router.push("/login")
        }
    };
    
    return(
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

                <form className="max-w-lg w-full mx-auto" onSubmit={sendRegister}>

                    <div className="mb-12">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Coach Register</h3>
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
                                    strokeMiterlimit="10" 
                                    strokeWidth="40" 
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

                        <label className="text-white-900 text-xs block mb-2">Coach Key</label>

                            <div className="relative flex items-center">

                                <input 
                                name="key" 
                                type={showKey ? "text" : "password"}
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
                                placeholder="Enter key" />

                                {showKey ? (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 640 512"
                                    onClick={() => setShowKey(!showKey)}
                                    >
                                        <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                                    </svg>
                                ) : (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 576 512"
                                    onClick={() => setShowKey(!showKey)}
                                    >
                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                    </svg>
                                )}

                            </div>

                    </div>


                    <div className="mt-6">

                        <label className="text-white-900 text-xs block mb-2">Password</label>

                            <div className="relative flex items-center">

                                <input 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-gray-100 px-2 py-3 outline-none" 
                                placeholder="Enter password" />

                                {showPassword ? (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 640 512"
                                    onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                                    </svg>
                                ) : (
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 576 512"
                                    onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                    </svg>
                                )}

                            </div>

                    </div>

                    <div className="mt-12">

                        <button type="submit" className="w-full py-3 px-6 text-sm tracking-wide font-semibold rounded-md bg-white hover:bg-gray-400 text-black focus:outline-none">
                            Create an account
                        </button>
                        


                        <p className="text-sm mt-6 text-gray-200">Already have an account? 
                            <Link className="text-white font-semibold hover:underline ml-1" href = "/login">Login</Link>
                        </p>

                        <p className="text-sm mt-6 text-gray-200">Not a coach? 
                            <Link className="text-white font-semibold hover:underline ml-1" href = "/register/client">Client Registration</Link>
                        </p>
                    
                    </div>

                </form>

            </div>

        </div>

        </div>
    );
};
export default CoachRegisterForm;