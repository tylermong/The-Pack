'use client'

import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from "@radix-ui/react-icons";




const KeyGenerator = () => {

    //Router
    const router = useRouter()

    //For Key generation
    const [coachKey, setCoachKey] = useState('');
    const [isKeyGenerated, setIsKeyGenerated] = useState(false);


    //Generates random coach keys
    function generateRandomKey() {
        return Math.random().toString(36).substr(2, 9); // generates a short unique string
    }

    //handler for sending generated coach key to database
    const handleGenerateKey = async () => {
        const key = generateRandomKey();
        setCoachKey(key);
        setIsKeyGenerated(true);

        // Send the key to the backend to store in the database
        try {
            await axios.post('http://localhost:3001/coach-key', { data : key });
            console.log('Key saved to database');
        } catch (error) {
            console.error('Error saving key:', error);
        }
    };


    return(

        <div className='flex flex-col pb-24 w-full h-auto px-5'>
            {/* Reroute button to go back to dashboard */}
            <div className='flex pt-5'>
                <Button variant='outline' onClick={() => router.push('/admin/home')}>
                    <ArrowLeftIcon/>
                    Return to Dashboard
                </Button>
            </div>

            <div className='w-auto h-auto'>
                <Card className='bg-primary text-white w-full h-full justify-center'>
                    <CardTitle className='flex justify-center font-bold text-5xl pt-2'>
                            Coach Key Generator
                        </CardTitle>
                    <CardContent className='flex flex-col justify-center items-center pt-20'>
                        <Drawer>
                            <DrawerTrigger className='bg-primary border border-solid text-white hover:bg-gray-300 hover:text-black'>
                                Generate Key
                            </DrawerTrigger>
                            <DrawerContent className='bg-primary justify-center items-center content-center'>
                                <DrawerHeader>
                                    <DrawerTitle>GENERATE KEY</DrawerTitle>
                                    <DrawerDescription>
                                        Give this key to a coach for them to create a coach account on register.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <Card className='bg-primary flex flex-col items-center justify-center'>
                                    <CardContent className='flex justify-center items-center text-white text-base'>
                                        {isKeyGenerated ? coachKey : 'Press Generate to create a new key.'}
                                    </CardContent>
                                </Card>
                                <DrawerFooter className='flex flex-row justify-between mt-4  '>
                                    <Button variant="outline" className='hover:bg-gray-300' onClick={handleGenerateKey}>
                                        Generate
                                    </Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline" className='hover:bg-gray-300'>Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default KeyGenerator;