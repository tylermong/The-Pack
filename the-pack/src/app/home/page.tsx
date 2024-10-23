'use client'

import React from 'react';
import FloatingNav from "@/src/components/bottomfloatingnav/FloatingNav";
import Carousel from "@/src/components/home/Carousel";
import AnnouncementForm from "@/components/forms/AnnouncementForm";
import HomeCalendar from "@/components/home/HomeCalendar";

export default function Home() {
    return (
        <main className='flex flex-row'>
            <FloatingNav />
            <div className='flex justify-center flex-col mr-96'>
                <Carousel />
                <AnnouncementForm />
            </div>
            <HomeCalendar />
        </main>   
    )
}
