import React from 'react';
import {useRouter} from "next/navigation";

const FloatingNav = () => {
    const router = useRouter()

    return(
        <div 
        className="fixed z-50 w-full h-18 max-w-lg -translate-x-1/2 bg-black border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                <button 
                type="button" 
                className="inline-flex flex-col items-center justify-center px-5 rounded-s-full bg-black group"
                onClick={() => router.push("./home")}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg"  
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white">
                        <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
                    </svg>
                    <span className="sr-only">Home</span>
                </button>


                <button 
                type="button" 
                className="inline-flex flex-col items-center justify-center px-5 bg-black group"
                onClick={() => router.push("./chatroom")}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white">
                        <path fill="currentColor" d="M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm4-8h8v-2H6zm0-3h12V9H6zm0-3h12V6H6z" />
                    </svg>
                    <span className="sr-only">Chat</span>
                </button>

                <button 
                type="button" 
                className="inline-flex flex-col items-center justify-center px-5 bg-black group"
                onClick={() => router.push("./foodtracker")}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white">
                        <path fill="currentColor" d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29zM1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15zM1 17h15v2H1z" />
                    </svg>
                    <span className="sr-only">food Tracker</span>
                </button>


                <button 
                type="button" 
                className="inline-flex flex-col items-center justify-center px-5 bg-black group"
                onClick={() => router.push("./fitnesstracker")}>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white">
                        <path fill="currentColor" d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43L16.29 22l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29z" />
                    </svg>
                    <span className="sr-only">Fitness Tracker</span>
                </button>

                <button 
                type="button" 
                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full bg-black group">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white">
                        <path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z" />
                    </svg>
                    <span className="sr-only">Profile</span>
                </button>
                
            </div>
        </div>
    )
}
export default FloatingNav;