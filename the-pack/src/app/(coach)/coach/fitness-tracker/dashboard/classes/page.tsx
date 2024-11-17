'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"
import CoachClassesListTable from '@/components/tables/coach/ClassList';


export default function CoachClasses()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <CoachClassesListTable/>
                </div>
            </main>
        </SidebarProvider>  
    )
}