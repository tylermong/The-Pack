'use client'

import CoachSideBar from "@/components/sidebar/CoachSideBar";
import ChatroomComponent from "@/components/chatroom/chatroom";
import React from 'react';

export default function Chatroom()
{
    return(
        <div>
            <CoachSideBar/>
            <ChatroomComponent/>
        </div>
    )
}