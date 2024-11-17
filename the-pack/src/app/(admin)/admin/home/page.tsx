'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar"
import Dashboard from "@/components/admin/dashboard/dashboard"

export default function Home()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <Dashboard/>
                </div>
            </main>
        </SidebarProvider>  
    )
}