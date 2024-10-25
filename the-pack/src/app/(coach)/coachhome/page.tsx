'use client'

import React from 'react';
import Carousel from "@/components/coach/home/Carousel";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Home()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <Carousel />
            </main>
        </SidebarProvider>  
    )
}