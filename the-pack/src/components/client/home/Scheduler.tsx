import React, { useEffect, useState } from 'react';
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
    Card
  } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
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
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";


//Format data of appointment
const FormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    coach: z.string().nonempty('Coach name is required'),
    appointmentType: z.string().nonempty('Appointment Type is required'),
    appointmentDate: z.date().refine(date => date !== undefined, 'Date is required'),
});

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


    //Current date of the monthly schedule
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [appointmentDate, setAppointmentDate] = React.useState<Date | undefined>()

    //Monthly calendar constants
    const [selectedDate, setSelectedDate] = useState(null); // The selected date
    const [classes, setClasses] = useState<Class[]>([]); // The classes for the selected date
    const [appointment, setAppointments] = useState<Appointment[]>([]); // The appointments for the selected date


    //Create appointment constants
    const [coachList, setCoachList] = useState<string[]>([]);
    const [appointmentType, setAppointmentType] = useState<string | undefined>();
    const [selectedCoach, setSelectedCoach] = useState<string | undefined>();
    const [coachAvailability, setCoachAvailability] = useState<Availability[]>([]);
    
    //Dialog constants
    const [isDialogOpen, setIsDialogOpen] = useState(false);






    //User Input Calendar Format
    const { register, handleSubmit, formState: {}, reset, setValue, watch } = useForm({
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
                const clientId = decodedToken.sub['id'];
                const classes = await axios.get('http://localhost:3001/class')
                const appointments = await axios.get(`http://localhost:3001/appointments/user/${clientId}`)
                setClasses(classes.data)
                setAppointments(appointments.data)
            }catch(error){
                console.error('Error fetching schedule data:', error);
            }
        } else {
            console.log("No token found")
        }
      };



    // Fetch List of Coaches
    useEffect(() => {
        const fetchCoach = async () => {
            const token = localStorage.getItem('accessToken');
            if(token){
                try{
                    const response = await axios.get('http://localhost:3001/user?role=COACH');
                    const usersMap = response.data.reduce((acc: Record<string, string>, user: { id: string, name: string }) => {
                        acc[user.id] = user.name;
                        return acc;
                    }, {});
                    setCoachList(usersMap);
                    console.log(usersMap)
                }catch(error){
                    console.error('Error fetching coaches:', error);
                }
            } else {
                console.log("No token found")
            }
        };
        fetchCoach();
    }, []);




//ANYTHING BEYOND THIS NEEDS FIXING----------------------------------------------------------------------------------------

    // Fetch coach availability
    const fetchCoachAvailability = async () => {
        try{
            const coachIds = await axios.get('http://localhost:3001/user?role=COACH');
            const coach = coachIds.data.reduce((acc: Record<string, string>, user: { id: string, name: string }) => {
                acc[user.id] = user.name;
                return acc;
            }, {});
            const coachId = selectedCoach ? Object.keys(coach).find(key => coach[key] === selectedCoach) : undefined;
            console.log('Coach:', coachId);


            const response = await axios.get(`http://localhost:3001/coachAvailability/timeslots/${coachId}`);
            const availability = response.data;

            console.log('Coach availability:', availability);

            // Filter availability by selected coach
            if(selectedCoach){
                const coachAvailability = availability.filter((slot: Availability) => slot.coachId === selectedCoach);
                setCoachAvailability(coachAvailability);
                console.log('Coach availability:', coachAvailability);
            } else {
                setCoachAvailability(availability);
            }
        }catch(error){
            console.error('Error fetching coach availability:', error);
        }
    }

    useEffect(() => {
        fetchCoachAvailability();
    }, [selectedCoach]);


    //Handler for making appointments
    const onAppointmentSubmit = async (data) => {
        
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
                        onDayClick={(date) => handleDayClick(date)}
                    />
                </div>
                
                <Dialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md flex flex-col w-full h-auto bg-black">
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
                                        <TableHeader className='flex-row flex w-full'>
                                            <TableRow className='w-full'>
                                                <TableHead >Class</TableHead>
                                                <TableHead >Coach</TableHead>
                                                <TableHead >Time Slot</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-full h-auto'>

                                            {/* {classes?.length > 0 ? (
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
                                            )} */}

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
                                                <TableHead className='text-lg w-full'>Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-auto h-auto'>

                                            {/* {appointment?.length > 0 ? (
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
                                            )} */}

                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>



            {/* CREATE AN APPOINTMENT FUNCTION */}
            <div className='mt-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Create an Appointment</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-black flex flex-col w-full h-auto">
                        <DialogTitle className='text-base'>
                            Create an Appointment
                        </DialogTitle>

                        <DialogDescription>
                            Here you can make your appointment with a coach. You can choose the coach, the type of appointment, the date and the time slot.
                            The timeslots are based on the coach availability.
                        </DialogDescription>

                        <form onSubmit={handleSubmit(onAppointmentSubmit)}>
                            <div className="flex flex-col w-min gap-4">
                                
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className='mb-1'>Name</Label>
                                    <Input id="name" placeholder="Your name" {...register('name')} />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="coach" className='mb-1'>Coach Name</Label>


                                    <Select onValueChange={(value) => {setValue('coach', value); setSelectedCoach(value)}} >
                                        <SelectTrigger id="coach" className='border-solid border-white'>
                                            <SelectValue placeholder="Select coach" />
                                        </SelectTrigger>

                                        <SelectContent position="popper">
                                            {Object.entries(coachList).map(([id, name]) => (
                                                <SelectItem key={id} value={name}>{name}</SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
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

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="time" className='mb-1'>Timeslot</Label>

                                    <Select onValueChange={(value) => setValue('time', value)}>
                                        <SelectTrigger id="time" className='border-solid border-white'>
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>

                                        <SelectContent position="popper">
                                            {coachAvailability.map((slot, index) => (
                                                <SelectItem key={index} value={slot.date.toString()}>{new Date(slot.date).toDateString()}</SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                </div>
                            </div>

                            <div className='pt-4'>
                                <Button type = "submit" variant="outline">Submit</Button>
                            </div>

                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
export default Scheduler;