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
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
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


    //Handles the current monthly date selected
    const [date, setDate] = useState<Date | undefined>(new Date());

    //Monthly calendar constants for showing the data
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // The selected date
    const [classes, setClasses] = useState<Class[]>([]); // The classes for the selected date
    const [appointment, setAppointments] = useState<Appointment[]>([]); // The appointments for the selected date


    //Create appointment constants
    const [coachList, setCoachList] = useState<string[]>([]);
    const [selectedCoach, setSelectedCoach] = useState<string | undefined>();   
    const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();
    const [coachAvailability, setCoachAvailability] = useState<Availability[]>([]);
    const [timeSlot, setTimeSlot] = useState<string[] | undefined>();
    const [timeslotId, setTimeslotId] = useState<string | undefined>();
    
    //Dialog constants
    const [isDialogOpen, setIsDialogOpen] = useState(false);






    //User Input Calendar Format
    const { register, formState: {}, setValue } = useForm({
        resolver: zodResolver(FormSchema),
    });



    //Handles day click and fetches data for the day
    const handleDayClick = async (date: Date) => {
        console.log('Day clicked:', date);
        setSelectedDate(date);
        setIsDialogOpen(true);

        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const clientId = decodedToken.sub['id'];
                const classesResponse = await axios.get<Class[]>('http://localhost:3001/class');
                const appointmentsResponse = await axios.get<Appointment[]>(`http://localhost:3001/appointments/user/${clientId}`);

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
                        clientId: clientId,
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



    // Fetch List of Coaches For the Calendar Day
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
                    console.log("Calendar Day Coaches: ",usersMap)
                }catch(error){
                    console.error('Error fetching coaches:', error);
                }
            } else {
                console.log("No token found")
            }
        };
        fetchCoach();
    }, []);




    // Fetch coach availability
    const fetchCoachAvailability = async () => {
        try{

            console.log('Appointment Date:', appointmentDate);

            //Gets all the coaches
            const coachIds = await axios.get('http://localhost:3001/user?role=COACH');
            const coach = coachIds.data.reduce((acc: Record<string, string>, user: { id: string, name: string }) => {
                acc[user.id] = user.name;
                return acc;
            }, {});
            const coachId = selectedCoach ? Object.keys(coach).find(key => coach[key] === selectedCoach) : undefined;

            //Gets all the availability of the selected coach
            const response = await axios.get(`http://localhost:3001/coachAvailability/timeslots/${coachId}`);
            const availability = response.data;

            if(appointmentDate){
                //Filter the availability by the selected date
                const availabilityDate = appointmentDate ? availability.filter((slot: Availability) => new Date(slot.date).toISOString().split('T')[0] === appointmentDate.toISOString().split('T')[0]) : [];
                setCoachAvailability(availabilityDate);

                console.log('Coach Availability:', coachAvailability);

                //Check if the timeslot is booked or not
                const booked = coachAvailability.map((slot: Availability) => slot.timeSlots.map((time: Timeslot) => time.isBooked));

                console.log('Booked:', booked[0][0]);

                //Only include the timeslots that are not booked
                const timeslots = coachAvailability.map((slot: Availability) => slot.timeSlots.filter((time: Timeslot) => time.isBooked === false).map((time: Timeslot) => time.startTime));
                setTimeSlot(timeslots ? timeslots[0] : undefined);

                console.log('Timeslots:', timeSlot);

                if(timeslots){
                    //Loop through the availability to get the start times and end times per timeslot
                    for(let i = 0; i < coachAvailability.length; i++){

                        //Lists the timeslot ids
                        const timeslotId = coachAvailability[i].timeSlots.map((slot: Timeslot) => slot.id);
                        timeslotId.map((id: string) => setTimeslotId(id));

                        const startTime = coachAvailability[i].timeSlots.map((slot: Timeslot) => slot.startTime);
                        const endTime = coachAvailability[i].timeSlots.map((slot: Timeslot) => slot.endTime);

                        //Filter the start and end times to only the times not the date and only unique times
                        const start = startTime.map((time: string) => time.split('T')[1].split('.')[0]).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
                        const end = endTime.map((time: string) => time.split('T')[1].split('.')[0]).filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

                        //Fixes the time format to 12 hour format
                        const start12 = start.map((time: string) => {
                            const hour = parseInt(time.split(':')[0]);
                            const minute = time.split(':')[1];
                            return hour > 12 ? `${hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                        });
                        const end12 = end.map((time: string) => {
                            const hour = parseInt(time.split(':')[0]);
                            const minute = time.split(':')[1];
                            return hour > 12 ? `${hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                        });

                        //Combine the start and end times
                        const timeSlots = start12.map((time: string, index: number) => `${time} - ${end12[index]}`);

                        //Set the timeslots
                        setTimeSlot(timeSlots);
                    }

                    //Clear the timeslot id
                    setTimeslotId(undefined);
                    
                } else{
                    //Clear the timeslot
                    setTimeSlot(undefined);
                }

                
            }
        }catch(error){
            console.error('Error fetching coach availability:', error);
        }
    }


    useEffect(() => {
        if (appointmentDate && selectedCoach) {
            fetchCoachAvailability();
        }
    }, [appointmentDate, selectedCoach]);



    //Handler for making appointments
    const handleAppointmentSubmit = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const clientId = decodedToken.sub;
                const coachId = Object.keys(coachList).find(key => coachList[key] === selectedCoach);

                //Loop through the the list of timeslot id to get the correct timeslot id of the selected time slot
                const timeSlotIDCurrent = coachAvailability.map((slot: Availability) => slot.timeSlots.map((time: Timeslot) => time.id));

                console.log('Time Slot ID:', timeSlotIDCurrent[0][0]);
                console.log('Time slots:', timeSlot);

                const createAppointmentDTO = {
                    clientId: clientId['id'],
                    coachId: coachId,
                    timeSlotId: timeSlotIDCurrent[0][0],
                };

                const response = await axios.post('http://localhost:3001/appointments/schedule', createAppointmentDTO);

                console.log('Appointment created:', response.data);

                setIsDialogOpen(false);
            } else {
                console.log('No token found');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
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
                                                <TableHead className="w-auto">Coach</TableHead>
                                                <TableHead className="w-auto">Start Time</TableHead>
                                                <TableHead className="w-auto">End Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>

                                            {appointment?.length > 0 ? (
                                                appointment.map((appointmentItem) => (
                                                    <TableRow key={appointmentItem.clientId} className="w-full">
                                                        <TableCell className="text-base w-full">{appointmentItem.appointmentHolder['name']}</TableCell>
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



            {/* CREATE AN APPOINTMENT FUNCTION */}
            <div className='mb-20 mt-1'>
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
                            The timeslots are based on the coach availability. If no timeslots are available, please choose another date.
                        </DialogDescription>

                        <div className="flex flex-col w-min gap-4">
                                
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className='mb-1'>Name</Label>
                                    <Input id="name" placeholder="Your name" {...register('name')} />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="coach" className='mb-1'>Coach Name</Label>


                                    <Select onValueChange={(value) => {setValue('coach', value); setSelectedCoach(value);}} >
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

                                <div className='flex flex-col space-y-1.5'>
                                    <Label htmlFor="appointmentDate">Date (Quadruple click the desired date) </Label>
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
                                            onSelect={(date) => { setAppointmentDate(date); fetchCoachAvailability(); }}
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
                                            {timeSlot?.map((time) => (
                                                <SelectItem key={time} value={time}>{time}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className='pt-4'>
                                <Button variant="outline" onClick={handleAppointmentSubmit}>Submit</Button>
                            </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
export default Scheduler;