'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"
import Dashboard from "@/components/coach/dashboard/dashboard"

export default function FitnessDashboard()
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