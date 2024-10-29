'use client'

import React from 'react';
import Carousel from "@/components/coach/home/Carousel";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Scheduler from '@/components/coach/home/Scheduler';

export default function Home()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <Carousel />
                    <div>
                        <Scheduler/>
                    </div>
                </div>
            </main>
        </SidebarProvider>  
    )
}