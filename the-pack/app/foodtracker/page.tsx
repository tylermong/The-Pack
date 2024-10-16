'use client'

import React from 'react';
import Link from 'next/link'

export default function FoodTracker()
{
    return(
        <div className = "MainBody">

            <div className = "Headers">

            </div>

            <div className = "ProgressBars">
                
                <div className="mb-1 text-base font-medium dark:text-white">Calories</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"></div>
                </div>

                <div className="mb-1 text-base font-medium text-blue-700 dark:text-blue-500">Water</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" ></div>
                </div>

                <div className="mb-1 text-base font-medium text-red-700 dark:text-red-500">Protein</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-red-600 h-2.5 rounded-full dark:bg-red-500" ></div>
                </div>

                <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">Carbohydrates</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-green-600 h-2.5 rounded-full dark:bg-green-500" ></div>
                </div>

                <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">Fats</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-yellow-400 h-2.5 rounded-full" ></div>
                </div>

            </div>


            <div className = "FoodCategories">

                

                <div className="sm:hidden">
                    <label for="tabs" className="sr-only">Select your country</label>
                    <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Profile</option>
                        <option>Dashboard</option>
                        <option>setting</option>
                        <option>Invoioce</option>
                    </select>
                </div>
                <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                    <li className="w-full focus-within:z-10">
                        <a href="#" className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Profile</a>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <a href="#" className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <a href="#" className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Settings</a>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <a href="#" className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Invoice</a>
                    </li>
                </ul>





                <div className='Breakfast'>

                </div>

                <div className='Lunch'>

                </div>

                <div className='Dinner'>

                </div>

                <div className='Snacks'>

                </div>

            </div>


            
        </div>
    )
}