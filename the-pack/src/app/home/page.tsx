'use client'

import FloatingNav from "@/src/components/bottomfloatingnav/FloatingNav";
import Carousel from "@/src/components/home/Carousel";

//THIS WILL ONLY HAVE ANNOUNCEMENT AND SCHEDULING 
// CAN ALSO PUT LIKE A SMALL JUMBOTRON TO WELCOME THE USER
// CONFIGURE ANNOUNCEMENT TO BE EDITABLE BUT ONLY FOR COACHES


import React from 'react';


export default function Home()
{
    return(
        <div>
            <FloatingNav/>
            <Carousel/>
        </div>
    )
}