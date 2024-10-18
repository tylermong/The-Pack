'use client'


//THIS WILL ONLY HAVE ANNOUNCEMENT AND SCHEDULING 
// CAN ALSO PUT LIKE A SMALL JUMBOTRON TO WELCOME THE USER
// CONFIGURE ANNOUNCEMENT TO BE EDITABLE BUT ONLY FOR COACHES


import React from 'react';
import Link from 'next/link'

export default function Home()
{
    return(
        <div>
            <nav className="border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-700">

                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <a href="https://www.thepackssc.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path 
                                fill="currentColor" 
                                fill-rule="evenodd" 
                                d="M19.946 1.599a.75.75 0 0 0-.966-.271c-.634.313-1.674 1.052-2.504 1.667c-.427.316-.818.614-1.102.833l-.06.046c-.186-.1-.421-.22-.692-.338c-.675-.297-1.629-.62-2.622-.62s-1.947.323-2.622.62a9 9 0 0 0-.691.338L8.63 3.83a100 100 0 0 0-1.084-.831c-.815-.616-1.812-1.346-2.365-1.654a.75.75 0 0 0-.991.241C2.613 3.97 2.55 5.874 3 7.236a4.6 4.6 0 0 0 .9 1.581c-.782 1.607-1.65 3.961-1.65 6.516c0 .415.336.75.75.75a6.2 6.2 0 0 1 3.734 1.25l.097.077v.003c.041.148.102.358.187.608c.168.498.431 1.169.813 1.847c.74 1.315 2.06 2.882 4.169 2.882c2.11 0 3.43-1.567 4.17-2.882a11 11 0 0 0 .999-2.455v-.003q.042-.035.097-.077A6.2 6.2 0 0 1 21 16.083a.75.75 0 0 0 .75-.75c0-2.554-.868-4.908-1.65-6.515l.076-.087a4.7 4.7 0 0 0 .836-1.486c.468-1.354.446-3.257-1.066-5.646M11 17.25a.75.75 0 0 0 0 1.5h.25V19a.75.75 0 0 0 1.5 0v-.25H13a.75.75 0 0 0 0-1.5zm-3.03-5.28a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 1 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m8.06 1.06a.75.75 0 1 0-1.06-1.06l-1.5 1.5a.75.75 0 1 0 1.06 1.06z" 
                                clip-rule="evenodd" />
                        </svg>

                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            The Pack SSC
                        </span>

                    </a>

                    <button 
                    data-collapse-toggle="navbar-solid-bg" 
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-solid-bg" 
                    aria-expanded="false">

                        <span className="sr-only">Open main menu</span>

                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                        
                    </button>

                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            
                            <li>
                                <Link
                                href="/home" 
                                className="block text-2xl py-2 px-3 md:p-0 text-white bg-black rounded md:bg-transparent md:text-white md:dark:text-gray-300 dark:bg-white md:dark:bg-transparent" 
                                aria-current="page"> {/*This highlights the currenbt page to a darker tone add this to the rest somehow*/}
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                href="/foodtracker" 
                                className="block text-2xl py-2 px-3 md:p-0 text-white bg-black rounded md:bg-transparent md:text-white md:dark:text-white dark:bg-white md:dark:bg-transparent" 
                                > 
                                    Food Tracker
                                </Link>
                            </li>

                            <li>
                                <Link
                                href="/fitnesstracker" 
                                className="block text-2xl py-2 px-3 md:p-0 text-white bg-black rounded md:bg-transparent md:text-white md:dark:text-white dark:bg-white md:dark:bg-transparent" 
                                > 
                                    Fitness Tracker
                                </Link>
                            </li>

                            <li>
                                <Link
                                href="/profile" 
                                className="block text-2xl py-2 px-3 md:p-0 text-white bg-black rounded md:bg-transparent md:text-white md:dark:text-white dark:bg-white md:dark:bg-transparent" 
                                > 
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col justify-center bg-black md:h-screen"style ={{padding: "50px"}}>
                <div className="Announcements">

                    <div className="mb-12">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Announcements</h3>
                    </div>

                    <div id="default-carousel" className="relative w-full" data-carousel="slide">
                
                        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                            
                            {/* <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/docs/images/carousel/carousel-1.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div>
                            
                            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                            </div> */}
                        </div>

                        
                        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                        </div>

                        
                        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>

                        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>

                </div>

                <div className="Scheduling">

                    <div className="mb-12">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Scheduling</h3>
                    </div>

                    
                </div>

                <div className="Messaging">

                    <div className="mb-12">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold max-md:text-center">Messaging</h3>
                    </div>


                </div>
            </div>
        </div>
    )
}