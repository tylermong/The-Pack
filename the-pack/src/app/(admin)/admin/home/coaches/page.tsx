'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar"
import CoachListTable from '@/components/tables/admin/CoachList';

export default function AdminCoaches()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <div className='flex flex-col'>
                <CoachListTable/>
            </div>
        </main>
    </SidebarProvider>  
    )
}