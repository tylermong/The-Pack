'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"
import CoachScheduleListTable from '@/components/tables/CoachScheduleList';


export default function CoachSchedule()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <CoachScheduleListTable/>
                </div>
            </main>
        </SidebarProvider>  
    )
}