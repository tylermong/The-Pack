'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar"
import KeyGenerator from '@/components/admin/KeyGenerator';

export default function AdminCoaches()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <div className='flex flex-col'>
                <KeyGenerator/>
            </div>
        </main>
    </SidebarProvider>  
    )
}