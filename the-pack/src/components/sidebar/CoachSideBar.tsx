'use client'

import React from 'react';

const SideBar = () =>{
    return(
        <div>
            <nav className="fixed top-0 left-0 z-50 w-full bg-black border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">

                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>

                            <a href="https://www.thepackssc.com/" className="flex ms-2 md:me-24">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594c0 25.4 4.132 49.846 11.75 72.687c40.154-24.203 76.02-41.17 107.56-52.03c-35.752 5.615-66.405 23.66-109.843 4c31.552-27.765 87.682-65.842 138.532-71.658c26.58-21.615 68.113-43.962 89.655-37.28c30.492-26.873 67.982-61.093 108.125-85.75c10.667 16.156 17.124 35.94 12.563 57.874c-80.37 20.205-61.692 148.928 13.468 67.44c6.348 13.064 9.41 26.665 9.095 41.436c-32.675 33.83-66.97 63.026-101.938 87.906c.466 23.99-5.605 52.915-19 84.813c-5.635 13.42-7.33 36.406 22.875 53.97c101.14-24.012 176.375-114.924 176.375-223.408c0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968c12.083-.036 25.612 2.882 37.5 6.156c6.208-6.698 10.236-18.52 8.345-25.125z" />
                                </svg>
                                <span className="self-center pl-2 text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    The Pack SSC
                                </span>
                            </a>

                        </div>

                    <div className="flex items-center">
                        <div className="flex items-center ms-3">

                            <div>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                <span className="sr-only">Open user menu</span>
                                {/*ADD CURRENT UER IMAGE HERE */}
                                {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"> */}
                            </button>
                            </div>

                            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                    {/*INPUT CURRENT USERNAME HERE */}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {/* INPUT CURRENT USER EMAIL HERE */}
                                    </p>
                                </div>

                                <ul className="py-1" role="none">

                                    <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                    </li>

                                    <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-black border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-black dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">

                        <li>
                            <a href="coachhome" className="flex items-center  text-3xl p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"  
                                className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 22 21">
                                    <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
                                </svg>
                                
                                <span className="ms-3">Home</span>
                            </a>
                        </li>

                        <li>
                            <a href="/coachchatroom" className="flex items-center  text-3xl p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 22 21">
                                    <path fill="currentColor" d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm4-8h8v-2H6zm0-3h12V9H6zm0-3h12V6H6z" />
                                </svg>
                                <span className="ms-3">Chatroom</span>
                            </a>
                        </li>

                        <li>
                            <a href="/coachfoodtracker" className="flex items-center  text-3xl p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 22 21">
                                    <path fill="currentColor" d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29zM1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15zM1 17h15v2H1z" />
                                </svg>
                                <span className="ms-3">Food</span>
                            </a>
                        </li>

                        <li>
                            <a href="/coachfitnesstracker" className="flex items-center  text-3xl p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 22 21">
                                    <path fill="currentColor" d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43L16.29 22l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29z" />
                                </svg>
                                <span className="ms-3">Fitness</span>
                            </a>
                        </li>

                        <li>
                            <a href="/coachprofile" className="flex items-center  text-3xl p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black group">
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" 
                                fill="currentColor" 
                                viewBox="0 0 22 21">
                                    <path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z" />
                                </svg>
                                <span className="ms-3">Profile</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};
export default SideBar; 