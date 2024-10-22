'use client'

import React from 'react';
import FloatingNav from "@/src/components/bottomfloatingnav/FloatingNav";
import Carousel from "@/src/components/home/Carousel";
import AnnouncementForm from "@/components/forms/AnnouncementForm";
import HomeCalendar from "@/components/home/HomeCalendar";


export default function Home()
{
    return(
        <div>
            <FloatingNav/>
            <Carousel/>
            <AnnouncementForm/>
            <HomeCalendar/>
        </div>
    )
}