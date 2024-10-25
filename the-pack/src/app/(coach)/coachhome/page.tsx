'use client'

import Carousel from "@/components/coach/home/Carousel";
import CoachSideBar from "@/components/sidebar/CoachSideBar";


import React from 'react';


export default function Home()
{
    return(
        <div>
            <CoachSideBar/>
            <Carousel/>
        </div>
    )
}