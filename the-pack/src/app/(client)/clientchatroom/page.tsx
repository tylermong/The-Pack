'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"

export default function Chatroom()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <h1>Client Chatroom Placeholder</h1>
        </main>
    </SidebarProvider>  
    )
}