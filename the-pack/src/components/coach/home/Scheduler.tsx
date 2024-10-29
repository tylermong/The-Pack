import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Scheduler = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return(
        
        <div className='main flex w-full flex-col items-center justify-center'>
            {/*MAKE IT SO THAT ON CLICK FOR THE BUTTON IT POPS OUT A CARD FOR THE APPOINTMENT MAKER */}
            <Button 
            className='bg-white text-black hover:bg-gray-300'
            >
                Create an Appointment
            </Button>

            <Card className="w-[370px] bg-black text-white">
                <CardHeader>
                    <CardTitle className='text-base'>Make an Appointment</CardTitle>
                    <CardDescription>Pick a date and time</CardDescription>
                </CardHeader>

                <CardContent>
                <div className='calendar w-auto'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </div>
                
                    <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your project" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Framework</Label>
                        <Select>
                            <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>

            </Card>
        </div>
    );
};
export default Scheduler;