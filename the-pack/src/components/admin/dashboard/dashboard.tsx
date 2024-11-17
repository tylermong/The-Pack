'use client'

import React from 'react';
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserIcon, DumbbellIcon, KeyIcon, Contact } from "lucide-react"



const Dashboard = () => {

    //Router
    const router = useRouter()

    return (
        <div className='flex flex-col pb-24'>

            {/* ALL DASHBOARD UTILITIES IN A GRID LAYOUT (CARD LIKE) */}
            <div className='grid grid-cols-2 gap-4 items-center justify-center pl-20 pt-6'>
                
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
                        <Button variant='outline' onClick={() => router.push('/admin/home/classes')}> 
                            View Classes
                        </Button>
                    </CardContent>
                </Card>

                {/* Clients Table Card */}
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
                        <Button variant='outline' onClick={() => router.push('/admin/home/clients')}> 
                            View Clients
                        </Button>
                    </CardContent>
                </Card>

                {/* Coaches Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Coaches List
                        </CardTitle>
                        <Contact className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/admin/home/coaches')}> 
                            View Coaches
                        </Button>
                    </CardContent>
                </Card>

                {/* Coach Key Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Coach Key Generator
                        </CardTitle>
                        <KeyIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/admin/home/coachkey')}> 
                            Go Make Key
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default Dashboard;