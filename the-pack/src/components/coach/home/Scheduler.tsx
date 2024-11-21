import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format, set } from "date-fns"
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
    DialogTitle,
    DialogFooter,
    DialogDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import Script from 'next/script';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";
import { ClockIcon } from 'lucide-react';



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

    //State handler for schedule viewing on EACH DAY ONLY
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //Schedule viewer data 
    const [classes, setClasses] = useState<Class[]>([]);
    const [coach, setCoach] = useState<Record<string, string>>({});
    const [appointment, setAppointments] = useState<Appointment[]>([]);

    //Used for coach schedules
    const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");






    //User Input Calendar Format
    const { handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(FormSchema),
    });

    //Handles day click and fetches data for the day
    const handleDayClick = async (date) => {
        console.log('Day clicked:', date);
        setSelectedDate(date);
        setIsDialogOpen(true);

        const token = localStorage.getItem('accessToken');
        if(token){
            try{
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];
                const classes = await axios.get(`http://localhost:3001/class/coach/${coachId}`)
                const appointments = await axios.get(`http://localhost:3001/appointments/user/${coachId}`)
                setClasses(classes.data)
                setAppointments(appointments.data)

                const coachAva = await axios.get(`http://localhost:3001/coachAvailability/${coachId}`)

                console.log('Coach availability:', coachAva.data);
                console.log('Classes:', classes.data);
                console.log('Appointments:', appointments.data);



            }catch(error){
                console.error('Error fetching schedule data:', error);
            }
        } else {
            console.log("No token found")
        }
    };






    //Handles form submission for creating a schedule
    const handleNewSchedule = async () => {
        console.log('Creating new schedule:', scheduleDate, startTime, endTime);

        const token = localStorage.getItem('accessToken');
        if(token){
            try{
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];

                const formattedDate = date ? date.toISOString().split('T')[0] : '';

                const availabilityData = {
                    coachId: coachId,
                    date: date,
                    timeSlots: [{
                        startTime: new Date(`${formattedDate}T${startTime}:00.000Z`).toISOString(),
                        endTime: new Date(`${formattedDate}T${endTime}:00.000Z`).toISOString(),
                    }]
                };

                const response = await axios.post(`http://localhost:3001/coachAvailability`, availabilityData );
                console.log('New schedule created:', response.data);

                //Reset form
                setDate(undefined);
                setStartTime('');
                setEndTime('');

            }catch(error){
                console.error('Error creating new schedule:', error);
            }
        } else {
            console.log("No token found")
        }
    }
    



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
                                            {/* <TableBody className='flex flex-col w-full h-auto'>
                                            {classes?.length > 0 ? (
                                                classes.map((event) => (
                                                    <TableRow key={event.name} className="w-full">
                                                        <TableCell className="text-base w-full">{event.name}</TableCell>
                                                        <TableCell className="text-base w-full">{coach[event.creatorId]}</TableCell>
                                                        <TableCell className="text-base w-full">{event.time}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2}>No classes available</TableCell>
                                                </TableRow>
                                            )}
                                            </TableBody> */}
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
                                            {/* <TableBody className='flex flex-col w-auto h-auto'>
                                            {appointment?.length > 0 ? (
                                                appointment.map((appointment) => (
                                                    <TableRow key={appointment.id} className="w-full">
                                                        <TableCell className="text-base w-full">{appointment.name}</TableCell>
                                                        <TableCell className="text-base w-full">{appointment.timeSlot}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2}>No appointments available</TableCell>
                                                </TableRow>
                                            )}
                                            </TableBody> */}
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>


            <div className='mb-20 mt-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Create Day Schedule</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-black">
                        <DialogTitle>
                            Create Day Schedule
                        </DialogTitle>

                        <DialogDescription>
                            Create a schedule for a specific day. This will allow clients to book appointments with you.
                            The start and end times will be available for booking.
                        </DialogDescription>

                        <div>
                            <div className='flex flex-col space-y-1.5'>
                                <div className='flex flex-row justify-between'>
                                    <Label className='text-2xl'>Date:</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal bg-black text-white border-solid border-white",
                                                !scheduleDate && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon />
                                            {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto h-auto p-0">
                                            <div className='bg-black text-white'>
                                            <Calendar
                                            mode="single"
                                            selected={scheduleDate}
                                            onSelect={(date) => {
                                                setScheduleDate(date);
                                                setValue('appointmentDate', date);
                                            }}
                                            initialFocus
                                            />
                                            </div>
                                            
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 pt-4">
                                {/* Start Time */}
                                <div className="flex flex-row items-center justify-between">
                                    <Label className='text-2xl'>Start Time:</Label>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="w-5 h-5" />
                                        <Input
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className='w-auto bg-black text-white border border-white'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-1.5 pt-4">
                                {/* End Time */}
                                <div className="flex flex-row items-center justify-between">
                                    <Label className='text-2xl'>End Time:</Label>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="w-5 h-5" />
                                        <Input
                                        type="time"
                                        id="endTime"
                                        name="endTime"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className='w-auto bg-black text-white border border-white'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-4'>
                            <Button variant="outline" onClick={handleNewSchedule}>Save Schedule</Button>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
            
        </div>
    );
};
export default Scheduler;