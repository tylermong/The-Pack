'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"
import CoachClientsListTable from '@/components/tables/coach/ClientList';


export default function CoachClients()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <CoachClientsListTable/>
                </div>
            </main>
        </SidebarProvider>  
    )
}