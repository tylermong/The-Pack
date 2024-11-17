'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar"
import Users from "@/components/tables/admin/Users"

export default function AdminClients()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <div className='flex flex-col'>
                <Users/>
            </div>
        </main>
    </SidebarProvider>  
    )
}