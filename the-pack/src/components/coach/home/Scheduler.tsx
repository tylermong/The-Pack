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
    // const [events, setEvents] = useState([]);
    // const [classes, setClasses] = useState([]);
    // const [appointments, setAppointments] = useState([]);

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

    //Handler for making appointments
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

    //Handler for checking day schedule (displays and update respective info)
    const handleDayClick = async (date) => {
        setSelectedDate(date);
        setIsDialogOpen(true);
      
        try {
          const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          const response = await axios.get(`http://localhost:3001/schedule`, {
            params: { date: formattedDate },
          });
          const { events, classes, appointments } = response.data;
          setEvents(events);
          setClasses(classes);
          setAppointments(appointments);
        } catch (error) {
          console.error('Error fetching schedule data:', error);
        }
      };

      
//EXAMPLE DATA DELETE ONCE DONE
const events = [
    {
      name: "EVENT001",
      availability: "ALL",
      time: "10:00AM",
    },
    {
        name: "EVENT002",
        availability: "ALL",
        time: "1:00PM",
    },
    {
        name: "EVENT003",
        availability: "ALL",
        time: "2:00PM",
    },
    {
        name: "EVENT004",
        availability: "ALL",
        time: "3:00PM",
    },
    {
        name: "EVENT005",
        availability: "ALL",
        time: "5:00PM",
    },
    {
        name: "EVENT006",
        availability: "ALL",
        time: "8:00PM",
    },
    {
        name: "EVENT007",
        availability: "ALL",
        time: "10:00PM",
    },
]


//EXAMPLE DATA DELETE ONCE DONE
const classes = [
    {
        name: "EVENT001",
        coach: "Bob",
        time: "10:00AM",
    },
    {
        name: "EVENT002",
        coach: "Alfred",
        time: "1:00PM",
    },
    {
        name: "EVENT003",
        coach: "John",
        time: "2:00PM",
    },
]

//EXAMPLE DATA DELETE ONCE DONE
const appointments = [
    {
        coach: "Danny",
        type: "Inquiry",
        time: "10:00AM",
    },
]





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
                                                <TableHead className='text-lg w-full'>Availability</TableHead>
                                                <TableHead className='text-lg w-full'>Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-full h-auto'>
                                                {events.map((event) => (
                                                    <TableRow key={event.name} className='w-full'>
                                                        <TableCell className="text-base w-full">{event.name}</TableCell>
                                                        <TableCell className="text-base w-full">{event.availability}</TableCell>
                                                        <TableCell className="text-base w-full">{event.time}</TableCell>
                                                    </TableRow>
                                                ))}
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
                                                <TableHead className='text-lg w-full'>Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-full h-auto'>
                                                {classes.map((event) => (
                                                    <TableRow key={event.name} className='w-full'>
                                                        <TableCell className="text-base w-full">{event.name}</TableCell>
                                                        <TableCell className="text-base w-full">{event.coach}</TableCell>
                                                        <TableCell className="text-base w-full">{event.time}</TableCell>
                                                    </TableRow>
                                                ))}
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
                                                <TableHead className='text-lg w-full'>Coach</TableHead>
                                                <TableHead className='text-lg w-full'>Type</TableHead>
                                                <TableHead className='text-lg w-full'>Time</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <ScrollArea className="h-auto w-full p-4">
                                            <TableBody className='flex flex-col w-full h-auto'>
                                                {appointments.map((event) => (
                                                    <TableRow key={event.coach} className='w-full'>
                                                        <TableCell className="text-base w-full">{event.coach}</TableCell>
                                                        <TableCell className="text-base w-full">{event.type}</TableCell>
                                                        <TableCell className="text-base w-full">{event.time}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </ScrollArea>
                                    </Table>
                                </Card>
                            </TabsContent>

                        </Tabs>
                    </DialogContent>
                </Dialog>
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