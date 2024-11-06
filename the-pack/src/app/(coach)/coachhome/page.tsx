'use client'

import React from 'react';
import Carousel from "@/components/coach/home/Carousel";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"
import Scheduler from '@/components/coach/home/Scheduler';
import { Separator } from "@/components/ui/separator"

export default function Home()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <Carousel />
                    <Separator/>
                    <div className='pt-24'>
                        <Scheduler/>
                    </div>
                </div>
            </main>
        </SidebarProvider>  
    )
}