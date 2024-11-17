import React from 'react';
import {useRouter} from "next/navigation";

const Jumbotron = () =>{
    const router = useRouter()

    return(
        <section className="bg-center">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">

                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    The Pack SSC
                </h1>

                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                    The Pack SSC emphasizes the many facets of high intensity training. Not to be confused with cross fit, instead we incorporate different styles of training into one workout. 
                </p>

                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <a 
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-white hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    onClick={() => router.push("./login")}>
                        Login

                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>

                    </a>

                    <a 
                    className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                    onClick={() => router.push("./register/client")}>
                        Register
                    </a>  

                </div>

            </div>
        </section>
    );
};
export default Jumbotron;