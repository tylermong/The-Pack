'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserIcon, DumbbellIcon, CalendarIcon, CalendarCheckIcon } from "lucide-react"



const Dashboard = () => {

    //Router
    const router = useRouter()

    
    return (
        <div className='flex flex-col pb-24'>

            {/* ALL DASHBOARD UTILITIES IN A GRID LAYOUT (CARD LIKE) */}
            <div className='grid grid-cols-2 gap-4 items-center justify-center pl-20 pt-6 pr-3'>

                {/* Coach Schedule Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Coach Schedule
                        </CardTitle>
                        <CalendarIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachschedule')}> 
                            View Schedule
                        </Button>
                    </CardContent>
                </Card>

                {/* Class Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Class List
                        </CardTitle>
                        <DumbbellIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachclasses')}> 
                            View Classes
                        </Button>
                    </CardContent>
                </Card>

                {/* Client Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Client List
                        </CardTitle>
                        <UserIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachclients')}> 
                            View Clients
                        </Button>
                    </CardContent>
                </Card>

                {/* Appointment Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Appointments
                        </CardTitle>
                        <CalendarCheckIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachappointments')}> 
                            View Appointments
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default Dashboard