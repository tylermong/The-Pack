'use client'

import React from 'react';
import NutritionTrackerComponent from '@/components/client/nutritionTracker/nutritionTracker';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/coach/sidebar/app-sidebar"

export default function NutritionTracker()
{
    return(
        <SidebarProvider>
        <AppSidebar />
        <main className='w-screen'>
            <SidebarTrigger />
            <NutritionTrackerComponent/>
        </main>
    </SidebarProvider>  
    )
}