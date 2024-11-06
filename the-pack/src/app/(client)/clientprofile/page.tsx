'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"

export default function Profile()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <h1>Client Profile Placeholder</h1>
        </main>
    </SidebarProvider>  
    )
}