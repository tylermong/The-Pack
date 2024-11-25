import React, { useState } from 'react';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";


export type Class = {
    id: string
    name: string
    description: string
    currentlyEnrolledIn: number
    coachId: string
    date: string
    startTime: string
    endTime: string
}

export type Appointment = {
    clientId: string
    coachId: string
    date: string
    timeSlotId: string
}

export type coachAvailability = {
    id: string;
    coachId: string;
    date: Date;
    timeSlots: {
        startTime: string;
        endTime: string;
    }
};

interface CustomJwtPayload extends JwtPayload {
    sub: string;
}



const Scheduler = () => {

    //Used for current date of the monthly schedule
    const [date, setDate] = useState<Date | undefined>(new Date());

    //State handler for schedule viewing on EACH DAY ONLY
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //Schedule viewer data 
    const [classes, setClasses] = useState<Class[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);



    //Handles day click and fetches data for the day (clases and appointments of the current coach logged in)
    const handleDayClick = async (date: Date) => {

        console.log('Day clicked:', date);
        setSelectedDate(date);
        setIsDialogOpen(true);

        const token = localStorage.getItem('accessToken');

        if(token){

            try{

                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId: string = decodedToken.sub['id'];

                console.log('Coach ID:', coachId);

                //Get the classes and appointments for the coach
                const classesResponse = await axios.get(`http://localhost:3001/class/${coachId}`);
                const appointmentsResponse = await axios.get(`http://localhost:3001/appointments/coach/${coachId}`);

                console.log('Classes response:', classesResponse);
                console.log('Appointments response:', appointmentsResponse);

                //Set the classes and appointments state
                setClasses(classesResponse.data);
                setAppointments(appointmentsResponse.data);

                console.log('Classes:', classes);
                console.log('Appointments:', appointments);

                //Filter the classes and appointments for the selected date
                const formattedDate = date.toISOString().split('T')[0];

                //Loop through the classes and appointments to find the ones for the selected date
                const classesForSelectedDate = Array.isArray(classes) ? classes.filter((cls) => cls.date === formattedDate) : [];
                const appointmentsForSelectedDate = Array.isArray(appointments) ? appointments.filter((appointment) => appointment.date === formattedDate) : [];

                setClasses(classesForSelectedDate);
                setAppointments(appointmentsForSelectedDate);

                console.log('Classes for selected date:', classesForSelectedDate);
                console.log('Appointments for selected date:', appointmentsForSelectedDate);

                

            }catch(error){
                console.error('Error fetching schedule data:', error);
            }
        } else {
            console.log("No token found")
        }
    };
    



    return(
        <div className='main flex w-full flex-col items-center justify-center pb-10'>
            
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
                        onDayClick={(date) => handleDayClick(date)}
                    />
                </div>
                
                <Dialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md flex flex-col w-full h-auto bg-black">
                        <DialogTitle>
                            DAY SCHEDULE
                        </DialogTitle>

                        <Tabs defaultValue="events" className="w-auto h-auto pt-5">

                            <TabsList className="flex flex-row bg-primary text-white border border-white">
                                <TabsTrigger value="classes" className='bg-primary w-full text-white hover:bg-gray-300'>Classes</TabsTrigger>
                                <TabsTrigger value="appointments" className='bg-primary w-full text-white hover:bg-gray-300'>Appointments</TabsTrigger>
                            </TabsList>

                            <TabsContent value = "classes">
                                <Card className='bg-primary text-white'>
                                    <Table>
                                        <TableHeader className='flex flex-row w-full'>
                                            <TableRow className='w-full'>
                                                <TableHead className='text-lg w-full'>Class Name</TableHead>
                                                <TableHead className='text-lg w-full'>Coach</TableHead>
                                                <TableHead className='text-lg w-full'>Start Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-auto h-auto'>
                                            {classes?.length > 0 ? (
                                                classes.map((cls) => (
                                                    <TableRow key={cls.id} className="w-full">
                                                        <TableCell className="text-base w-full">{cls.name}</TableCell>
                                                        <TableCell className="text-base w-full">{cls.coachId}</TableCell>
                                                        <TableCell className="text-base w-full">{cls.startTime}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2}>No classes available</TableCell>
                                                </TableRow>
                                            )}
                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                            <TabsContent value = "appointments">
                                <Card className='bg-primary text-white'>
                                    <Table>
                                        <TableHeader className='flex flex-row w-full'>
                                            <TableRow className='w-full'>
                                                <TableHead className='text-lg w-full'>Client</TableHead>
                                                <TableHead className='text-lg w-full'>Start Time</TableHead>
                                                <TableHead className='text-lg w-full'>End Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-auto h-auto'>
                                            {appointments?.length > 0 ? (
                                                appointments.map((appointment) => (
                                                    <TableRow key={appointment.clientId} className="w-full">
                                                        <TableCell className="text-base w-full">{appointment.clientId}</TableCell>
                                                        <TableCell className="text-base w-full">{appointment.date}</TableCell>
                                                        <TableCell className="text-base w-full">{appointment.timeSlotId}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2}>No appointments available</TableCell>
                                                </TableRow>
                                            )}
                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
export default Scheduler;