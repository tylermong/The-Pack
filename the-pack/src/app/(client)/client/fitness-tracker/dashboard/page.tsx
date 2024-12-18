'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"
import ProgramList from "@/components/client/fitnessTracker/Dashboard"

export default function FitnessTracker()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <ProgramList />
        </main>
    </SidebarProvider>  
    )
}