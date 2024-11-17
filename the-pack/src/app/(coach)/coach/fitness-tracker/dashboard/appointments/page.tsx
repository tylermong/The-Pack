'use client'

import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"
import CoachAppointmentsListTable from '@/components/tables/coach/AppointmentList';


export default function CoachAppointments()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                <SidebarTrigger />
                <div className='flex flex-col'>
                    <CoachAppointmentsListTable/>
                </div>
            </main>
        </SidebarProvider>  
    )
}