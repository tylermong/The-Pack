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

    //Used for appointment making
    const [schedule, setSchedule] = useState([]);

    //State handler for schedule viewing on EACH DAY ONLY
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //Schedule viewer data (UNCOMMENT AFTER DB AND BACKEND API CALLS ARE IMPLEMENTED)
    const [events, setEvents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [coach, setCoach] = useState<Record<string, string>>({});
    const [appointment, setAppointment] = useState<any[]>([]);

    //Used for coach schedules
    const [coachDate, setCoachDate] = React.useState<Date | undefined>()
    const [timeslots, setTimeslots] = useState<string>("");
    const [appDate, setAppDate] = useState<string>("");

    //User Input Calendar Format
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(FormSchema),
    });

    // Fetch coach
    useEffect(() => {
        const fetchCoach = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user'); // Update endpoint
                const usersMap = response.data.reduce((acc: Record<string, string>, user: { id: string, name: string }) => {
                    acc[user.id] = user.name;
                    return acc;
                }, {});
                setCoach(usersMap);
                console.log(usersMap)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchCoach();
    }, []);

    // Fetch appointment
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/scheduling'); // Update endpoint
                const appointmentsWithClientNames = await Promise.all(response.data.map(async (appointment) => {
                    const clientResponse = await axios.get(`http://localhost:3001/user/${appointment.clientId}`);
                    return { ...appointment, name: clientResponse.data.name };
                }));
                setAppointment(appointmentsWithClientNames);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);



    //Used for updating the monthly schedule with the current events
    useEffect(() => {
        const currentSchedule = async () => {
            try{
                const events = await axios.get('http://localhost:3001/announcements')
                const classes = await axios.get('http://localhost:3001/class')
                const appointments = await axios.get('http://localhost:3001/scheduling')
                setEvents(events.data)
                setClasses(classes.data)
                setAppointments(appointments.data)
            }catch(error){
                console.error("Error Fetching Schedule:", error)
            }
        };
        currentSchedule();
    }, []);

    //Handler for making appointments
    const onAppointmentSubmit = async (data) => {
        console.log('Form Submitted:', data);
        try {
            // Assuming you already have clientId and coachId available (perhaps from user context or form input)
            // const clientId = data.clientId;  // Replace with actual clientId from context or form
            // const coachId = data.coachId;    // Replace with actual coachId from context or form
    
            // Create the appointment data matching the Prisma schema
            const appointmentData = {
                clientId: "a215a03b-0fff-4f0f-94e9-43dba6f8046b",  // The ID of the client
                coachId: "1e42b84a-077d-4411-9249-cc0d6334f6ee",    // The ID of the coach
                timeSlot: appointmentDate?.toISOString(),  // Adjust this to match your time format
                date: appDate
            };
    
            // Send POST request to the database
            const response = await axios.post('http://localhost:3001/scheduling', appointmentData);
    
            // Update local state with the response data
            setSchedule([...schedule, response.data]);
            console.log('Submitted:', response.data);
    
            // Reset form state
            reset();
            setAppointmentDate(undefined);
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    };

    // Handle form submission to save coach schedule
    const onCoachSubmit = async (data) => {
        const scheduleData = {
            coachId: "1e42b84a-077d-4411-9249-cc0d6334f6ee", // You need to get the coach ID (probably from logged-in user)
            date: coachDate?.toISOString(),
            timeslots: timeslots,
        };

        try {
            const response = await axios.post('http://localhost:3001/coachAvailability', scheduleData);
            console.log('Schedule saved:', response.data);
            setTimeslots('');
            setCoachDate(undefined);
        } catch (error) {
            console.error('Error submitting schedule:', error);
        }
    };

    //Handler for checking day schedule (displays and update respective info)
    const handleDayClick = async (date) => {
        console.log('Day clicked:', date);
        setSelectedDate(date);
        setIsDialogOpen(true);
      
        try {
          const events = await axios.get('http://localhost:3001/announcements')
          const classes = await axios.get('http://localhost:3001/class')
          const appointments = await axios.get('http://localhost:3001/scheduling')
          setEvents(events.data)
          setClasses(classes.data)
          setAppointments(appointments.data)
        } catch (error) {
          console.error('Error fetching schedule data:', error);
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
                    <DialogContent className="sm:max-w-md flex flex-col w-full h-auto bg-black">
                        <DialogTitle>
                            DAY SCHEDULE
                        </DialogTitle>

                        <Tabs defaultValue="events" className="w-auto h-auto pt-5">

                            <TabsList className="flex flex-row bg-primary text-white border border-white">
                                <TabsTrigger value="events" className='bg-primary w-full text-white hover:bg-gray-300'>Events</TabsTrigger>
                                <TabsTrigger value="classes" className='bg-primary w-full text-white hover:bg-gray-300'>Classes</TabsTrigger>
                                <TabsTrigger value="appointments" className='bg-primary w-full text-white hover:bg-gray-300'>Appointments</TabsTrigger>
                            </TabsList>

                            <TabsContent value = "events">
                                <Card className='bg-primary text-white'>
                                    <Table>
                                        <TableHeader className='flex flex-row w-full'>
                                            <TableRow className='w-full'>
                                                <TableHead className='text-lg w-full'>Event Name</TableHead>
                                                <TableHead className='text-lg w-full'>Content</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-full h-auto'>
                                            {events?.length > 0 ? (
                                                events.map((event) => (
                                                    <TableRow key={event.title} className="w-full">
                                                        <TableCell className="text-base w-full">{event.title}</TableCell>
                                                        <TableCell className="text-base w-full">{event.content}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2}>No events available</TableCell>
                                                </TableRow>
                                            )}
                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

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
                                            <TableBody className='flex flex-col w-full h-auto'>
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
                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='mt-1'>
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
                                <form onSubmit={handleSubmit(onAppointmentSubmit)}>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name" className='mb-1'>Name</Label>
                                                <Input id="name" placeholder="Your name" {...register('name')} />
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

                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="coach" className='mb-1'>Time</Label>
                                                <Input id="time" placeholder="Time" {...register('time')} />
                                            </div>

                                        </div>
                                        <Button type = "submit" variant="outline" className='pt-4'>Submit</Button>
                                    </form>
                            </CardContent>

                        </Card>
                    </DialogContent>
                </Dialog>
            </div>


            <div className='mb-20 mt-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Create Day Schedule</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-black">
                        <Card className="w-[350px] bg-black text-white border-none">
                            <CardHeader>
                                <CardTitle className='text-base'>Day Schedule Details</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit(onCoachSubmit)}>
                                        <div className="grid w-full items-center gap-4">
                                            <div className='flex flex-col space-y-1.5'>
                                                <Label htmlFor="appointmentDate">Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal bg-black text-white border-solid border-white",
                                                            !coachDate && "text-muted-foreground"
                                                        )}
                                                        >
                                                        <CalendarIcon />
                                                        {coachDate ? format(coachDate, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto h-auto p-0">
                                                        <div className='bg-black text-white'>
                                                        <Calendar
                                                        mode="single"
                                                        selected={coachDate}
                                                        onSelect={(date) => {
                                                            setCoachDate(date);
                                                            setValue('coachDate', date);
                                                        }}
                                                        initialFocus
                                                        />
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>

                                                <div className="flex flex-col space-y-1.5 pt-4">
                                                    <Label htmlFor="name" className='mb-1'>Time Slots</Label>
                                                    <Textarea 
                                                    placeholder="Type your time slots (i.e 10AM - 5PM)..."
                                                    value={timeslots}
                                                    onChange={(e) => setTimeslots(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" variant="outline">Save Availability</Button>
                                    </form>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            </div>
            
        </div>
    );
};
export default Scheduler;