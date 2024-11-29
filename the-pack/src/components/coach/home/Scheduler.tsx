import React, { useState } from 'react';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";


export type Class = {
    id: string
    name: string
    description: string
    currentlyEnrolledIn: number
    coachId: string
    assignedCoach: {
        name: string
    }
    classDates: {
        startTime: string
        endTime: string
        date: {
            date: string
        }
    }[]
}

export type Appointment = {
    clientId: string
    coachId: string
    date: string
    timeSlotId: string
    timeSlot: {
        startTime: string
        endTime: string
    }
    appointmentHolder: {
        name: string
    }
    client: {
        name: string
    }
}

export type Availability = {
    id: string
    date: Date
    coachId: string
    timeSlots: Timeslot[]
}

export type Timeslot = {
    id: string
    startTime: string
    endTime: string
    availabilityId: string
    isBooked: boolean
}

export enum Role{
    CLIENT = 'CLIENT',
    COACH = 'COACH',
    ADMIN = 'ADMIN'
}

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
    const [appointment, setAppointments] = useState<Appointment[]>([]);



    //Handles day click and fetches data for the day
    const handleDayClick = async (date: Date) => {
        console.log('Day clicked:', date);
        setSelectedDate(date);
        setIsDialogOpen(true);

        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];
                const classesResponse = await axios.get<Class[]>('http://localhost:3001/class');
                const appointmentsResponse = await axios.get<Appointment[]>(`http://localhost:3001/appointments/coach/${coachId}`);

                console.log('Appointment Response:', appointmentsResponse.data);

                const classesData = classesResponse.data;
                const appointmentsData = appointmentsResponse.data;

                //Map the class name, coach name, start time and end time to the existing class
                const classData = classesData
                    .map((classItem) => ({
                        id: classItem.id,
                        name: classItem.name,
                        description: classItem.description,
                        currentlyEnrolledIn: classItem.currentlyEnrolledIn,
                        coachId: classItem.coachId,
                        assignedCoach: {
                            name: classItem.assignedCoach.name
                        },
                        classDates: classItem.classDates.map(dateItem => ({
                            startTime: dateItem.startTime,
                            endTime: dateItem.endTime,
                            date: dateItem.date
                        }))
                    }));

                //Map the coach name, start time and end time to the existing appointment
                const appointmentData = appointmentsData
                    .map((appointmentItem) => ({
                        clientId: coachId,
                        coachId: appointmentItem.coachId,
                        date: appointmentItem.date,
                        timeSlotId: appointmentItem.timeSlotId,
                        appointmentHolder: {
                            name: appointmentItem.appointmentHolder.name
                        },
                        timeSlot: {
                            startTime: appointmentItem.timeSlot.startTime,
                            endTime: appointmentItem.timeSlot.endTime,
                            date: appointmentItem.timeSlot.startTime,
                        },
                        client: {
                            name: appointmentItem.client.name
                        }
                    }));

                //Get the date of appointments and classes
                const classDate = classData.flatMap((classItem) => classItem.classDates.map(dateItem => dateItem.date.date));
                const appointmentDate = appointmentData.map((appointmentItem) => appointmentItem.timeSlot.date);

                console.log('Class Date:', classDate);
                console.log('Appointment Date:', appointmentDate);

                //For each class extract the date and compare it to the selected date
                const classes = classData.filter((classItem) => classItem.classDates.some(dateItem => new Date(dateItem.date.date).toISOString().split('T')[0] === date.toISOString().split('T')[0]));

                //For each appointment extract the date and compare it to the selected date
                const appointments = appointmentData.filter((appointmentItem) => new Date(appointmentItem.timeSlot.date).toISOString().split('T')[0] === date.toISOString().split('T')[0]);

                console.log('Classes:', classes);
                console.log('Appointments:', appointments);

                setClasses(classes);
                setAppointments(appointments);

            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        } else {
            console.log("No token found");
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
                    <DialogContent className="sm:max-w-md flex flex-col w-auto h-auto bg-black">
                        <DialogTitle>
                            DAY SCHEDULE
                        </DialogTitle>
                        <DialogDescription className='font-semibold'>
                            Here you can find the available classes for the day. You can also find your appointments for the day.
                        </DialogDescription>

                        <Tabs defaultValue="events" className="w-auto h-auto pt-5">

                            <TabsList className="flex flex-row bg-primary text-white border border-white">
                                <TabsTrigger value="classes" className='bg-primary w-full text-white hover:bg-gray-300'>Classes</TabsTrigger>
                                <TabsTrigger value="appointments" className='bg-primary w-full text-white hover:bg-gray-300'>Appointments</TabsTrigger>
                            </TabsList>

                            <TabsContent value = "classes">
                                <Card className='bg-primary text-white'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-auto">Class</TableHead>
                                                <TableHead className="w-auto">Coach</TableHead>
                                                <TableHead className="w-auto">Start Time</TableHead>
                                                <TableHead className="w-auto">End Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>

                                            {classes?.length > 0 ? (
                                                classes.map((classItem) => (
                                                    <TableRow key={classItem.id} className="w-full">
                                                        <TableCell className="text-base w-full">{classItem.name}</TableCell>
                                                        <TableCell className="text-base w-full">{classItem['assignedCoach']['name']}</TableCell>
                                                        <TableCell className="text-base w-full">
                                                            {new Date(classItem['classDates'][0]['startTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                        </TableCell>
                                                        <TableCell className="text-base w-full">
                                                            {new Date(classItem['classDates'][0]['endTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4}>No classes available</TableCell>
                                                </TableRow>
                                            )}
                                        
                                        </TableBody>
                                    </Table>
                                </Card>
                            </TabsContent>

                            <TabsContent value = "appointments">
                                <Card className='bg-primary text-white'>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-auto">Client</TableHead>
                                                <TableHead className="w-auto">Start Time</TableHead>
                                                <TableHead className="w-auto">End Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>

                                            {appointment?.length > 0 ? (
                                                appointment.map((appointmentItem) => (
                                                    <TableRow key={appointmentItem.coachId} className="w-full">
                                                        <TableCell className="text-base w-full">{appointmentItem.client['name']}</TableCell>
                                                        <TableCell className="text-base w-full">
                                                            {new Date(appointmentItem.timeSlot['startTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                        </TableCell>
                                                        <TableCell className="text-base w-full">
                                                            {new Date(appointmentItem.timeSlot['endTime']).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3}>No appointments available</TableCell>
                                                </TableRow>
                                            )}

                                        </TableBody>
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