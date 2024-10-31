import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//Format data of appointment
const FormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    coach: z.string().nonempty('Coach name is required'),
    appointmentType: z.string().nonempty('Appointment Type is required'),
    appointmentDate: z.date().refine(date => date !== undefined, 'Date is required'),
});


const Scheduler = () => {

    //Used for current date of the monthly schedule
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>()
    const [schedule, setSchedule] = useState([]);

    //User Input Calendar Format
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(FormSchema),
    });


    //Used for updating the monthly schedule with the current events
    useEffect(() => {
        const currentSchedule = async () => {
            try{
                const response = await axios.post('http://localhost:3001/schedule');
                setSchedule(response.data);
            }catch(error){
                console.error("Error Fetching Schedule:", error)
            }
        };
        currentSchedule();
    }, []);

    const onSubmit = async (data) => {
        try {

            const appointmentData = {
                ...data,
                appointmentDate: appointmentDate?.toISOString(),
            };

            // Send POST request to the database
            const response = await axios.post('http://localhost:3001/schedule', appointmentData);

            // Update local state with the response data
            setSchedule([...schedule, response.data]);
            console.log('Submitted:', response.data);

            reset();
            setAppointmentDate(undefined);
        } catch (error) {
            console.error('Error submitting announcement:', error);
        }
    };

    return(
        <div className='main flex w-full flex-col items-center justify-center'>
            
            {/*SHOW CASE CURRENT MONTHLY SCHEDULE */}
            <div className='mb-2'>
                <div className="mb-6">
                    <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">MONTHLY SCHEDULE</h3>
                </div>
                <div className='calendar'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />


                    {/*PROBABLY MAKE IT SO THAT WHEN A USER CLICKS ON THE DATE IT WOULD POP UP A NEW CARD AND GRAY OUT
                    THE BACKGROUND TO SHOWCASE THE CURRENT SCHEDULES AND TIME FOR THAT DAY */}
                </div>
            </div>

            <div className='AppointmentForm mb-20 mt-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Create an Appointment</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-black">
                        <Card className="w-[350px] bg-black text-white border-none">
                            <CardHeader>
                                <CardTitle className='text-base'>Make an Appointment</CardTitle>
                            </CardHeader>

                            <CardContent>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid w-full items-center gap-4">

                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name" className='mb-1'>Name</Label>
                                                <Input id="name" placeholder="Your name" />
                                            </div>

                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="coach" className='mb-1'>Coach Name</Label>
                                                <Input id="coach" placeholder="Coach name" {...register('coach')} />
                                            </div>

                                            <div className="flex flex-col space-y-1.5 ">
                                                <Label htmlFor="appointmentType">
                                                    Appointment Type
                                                </Label>

                                                <Select onValueChange={(value) => setValue('appointmentType', value)}>
                                                    <SelectTrigger id="appointmentType" className='border-solid border-white'>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>

                                                    <SelectContent position="popper">
                                                        <SelectItem value="inquiry">Inquiry</SelectItem>
                                                        <SelectItem value="1-on-1">1-on-1</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>


                                            <div className='flex flex-col space-y-1.5'>
                                                <Label htmlFor="appointmentDate">Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal bg-black text-white border-solid border-white",
                                                            !appointmentDate && "text-muted-foreground"
                                                        )}
                                                        >
                                                        <CalendarIcon />
                                                        {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto h-auto p-0">
                                                        <div className='bg-black text-white'>
                                                        <Calendar
                                                        mode="single"
                                                        selected={appointmentDate}
                                                        onSelect={(date) => {
                                                            setAppointmentDate(date);
                                                            setValue('appointmentDate', date);
                                                        }}
                                                        initialFocus
                                                        />
                                                        </div>
                                                        
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                    </form>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button type = "submit" variant="outline">Submit</Button>
                            </CardFooter>

                        </Card>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
export default Scheduler;