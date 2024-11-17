'use client'

import React from 'react';
import ProfileComponent from '@/components/profile/Profile';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"

export default function Profile()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <div className='flex flex-col'>
                <ProfileComponent/>
            </div>
        </main>
    </SidebarProvider>  
    )
}