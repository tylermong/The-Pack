'use client'

import React from 'react';
import ClientCarousel from "@/components/client/home/ClientCarousel"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"
import Scheduler from '@/components/client/home/Scheduler';
import { Separator } from "@/components/ui/separator"

export default function Home()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <ClientCarousel />
                    <Separator/>
                    <div className='pt-24'>
                        <Scheduler/>
                    </div>
                </div>
            </main>
        </SidebarProvider>  
    )
}