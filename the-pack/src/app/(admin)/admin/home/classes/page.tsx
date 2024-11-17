'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar"
import ClassesList from "@/components/tables/admin/Classes"


export default function AdminClasses()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <div className='flex flex-col'>
                <ClassesList/>
            </div>
        </main>
    </SidebarProvider>  
    )
}