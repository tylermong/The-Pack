'use client'

import React from 'react';
import ChatroomComponent from "@/components/chatroom/chatroom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Chatroom()
{
    return(
        <SidebarProvider>
            <AppSidebar />
            <main className='flex w-screen'>
                <div>
                    <SidebarTrigger />
                </div>
                <div className="w-full">
                    <ChatroomComponent/>
                </div>
            </main>
        </SidebarProvider>
    )
}