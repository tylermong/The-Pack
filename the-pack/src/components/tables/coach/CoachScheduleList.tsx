'use client'

//Table that lists all schedules for a coach (monthly basis) (For coaches: allow for creation, modification, and deletion)

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, ColumnDef  } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
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
import { CalendarIcon, ArrowLeftIcon, Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { ClockIcon, PencilIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';



//Defining coach scheudle type
export type CoachSchedule = {
    id: string;
    coachId: string;
    date: Date;
    timeSlots: TimeSlot[];
};

export type TimeSlot = {
    id: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

interface CustomJwtPayload extends JwtPayload {
    sub: string;
}




const CoachScheduleListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Constants for when mounting table data
    const [coachSchedule, setCoachSchedule] = useState<CoachSchedule[]>([]);

    //Constants for selection state
    const [coachScheduleRowSelection, setCoachScheduleRowSelection] = useState({});

    //Used for creating a coach schedule
    const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    //For time pickers
    const [time] = useState<string>("00:00");


    //Constants for editing a schedule
    const [editingSchedule, setEditingSchedule] = useState<CoachSchedule | null>(null);
    const [editDate, setEditDate] = useState<Date | undefined>();
    const [editStartTime, setEditStartTime] = useState<Date>(new Date());
    const [editEndTime, setEditEndTime] = useState<Date>(new Date());
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    //Pagination state
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10 // Default number of items per page
    });


    //JWT Token Call for Coach Specific information
    const getCoachSchedule = async () => {
        const token = localStorage.getItem('accessToken');
        if(token){
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];

                const response = await axios.get(`http://localhost:3001/user/${coachId}`);
                const coachData = await axios.get(`http://localhost:3001/coachAvailability/${coachId}`);

                console.log('Coach Data:', coachData.data);


                //Extract the date, start time, and end time from the response
                const coachScheduleData = coachData.data.map((schedule: any) => ({
                    id: schedule.id,
                    coachId: schedule.coachId,
                    date: new Date(schedule.date),
                    //Check if timeSlots is not empty then append, otherwise append an empty time slot
                    timeSlots: schedule.timeSlots.length > 0 ? schedule.timeSlots : [{startTime: '', endTime: ''}]
                }));
                

                //Extract the start and end times for each time slot
                coachScheduleData.forEach((schedule: any, index: number) => {
                    
                    //Ensure index starts at 1
                    if(index === 0){
                        index = 1;
                    } else {
                        index = index;
                    }

                    //Format the date, start time, and end time for each scedule in a 12-hour format
                    const formattedDate = schedule.date.toISOString().split('T')[0];
                    let formattedStartTime = schedule['timeSlots'][0]['startTime'];
                    let formattedEndTime = schedule['timeSlots'][0]['endTime'];

                    // Convert to 12-hour format with AM/PM
                    const startTimeDate = new Date(formattedStartTime);
                    const endTimeDate = new Date(formattedEndTime);

                    const formatTime = (date: Date) => {
                        let hours = date.getUTCHours();
                        const minutes = date.getUTCMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
                        return `${hours}:${minutesStr} ${ampm}`;
                    };

                    formattedStartTime = formatTime(startTimeDate);
                    formattedEndTime = formatTime(endTimeDate);
                    
                    //Update the date, start time, and end time for each schedule
                    schedule.date = formattedDate;
                    schedule['timeSlots'][0]['startTime'] = formattedStartTime;
                    schedule['timeSlots'][0]['endTime'] = formattedEndTime;
                });

                //Make a new constant containing the scchedule data but with only the date, start time, and end time
                const formattedScheduleData = coachScheduleData.map((schedule: any) => ({
                    id: schedule.id,
                    date: schedule.date,
                    startTime: schedule['timeSlots'][0]['startTime'],
                    endTime: schedule['timeSlots'][0]['endTime']
                }));

                //Set the state of the coach schedule
                setCoachSchedule(formattedScheduleData);

            } catch (error) {
                console.log("Error fetching profile", error)
            }
        }
    };

    // Fetch the coach schedule when the component mounts
    useEffect(() => {
        getCoachSchedule();
    }, []);
    


    //Table configuration for coach schedule
    const coachScheduleColumns: ColumnDef<CoachSchedule>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className= {`bg-primary border border-solid border-white scale-50 mr-2 text-white ${table.getIsSomePageRowsSelected() ? "indeterminate" : ""}`}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    className='bg-primary border border-solid border-white scale-50 mr-2'
                />
            ),
        },
        { accessorKey: "date", header: "Date" },
        { accessorKey: "startTime", header: "Start Time" },
        { accessorKey: "endTime", header: "End Time" },
    ];

    //Class Table Object
    const coachScheduleTable = useReactTable({
        data: coachSchedule,
        columns: coachScheduleColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { 
            rowSelection: coachScheduleRowSelection,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onRowSelectionChange: setCoachScheduleRowSelection,
        onPaginationChange: setPagination,
    });



    //Handles form submission for creating a schedule
    const handleNewSchedule = async () => {
        console.log('Creating new schedule:', scheduleDate, startTime, endTime);

        const token = localStorage.getItem('accessToken');
        if(token){
            try{
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];

                if (scheduleDate && startTime && endTime) {
                    const availabilityData = {
                        coachId: coachId,
                        date: new Date(`${scheduleDate.toISOString().split('T')[0]}T00:00:00.000Z`).toISOString(),
                        timeSlots: [{
                            startTime: new Date(`${scheduleDate.toISOString().split('T')[0]}T${startTime}:00.000Z`).toISOString(),
                            endTime: new Date(`${scheduleDate.toISOString().split('T')[0]}T${endTime}:00.000Z`).toISOString(),
                        }]
                    };

                    const response = await axios.post(`http://localhost:3001/coachAvailability`, availabilityData );
                    console.log('New schedule created:', response.data);

                    //Reset form
                    setDate(undefined);
                    setStartTime('');
                    setEndTime('');
                } else {
                    console.error('Invalid date or time values');
                    return;
                }

                getCoachSchedule();

            }catch(error){
                console.error('Error creating new schedule:', error);
            }
        } else {
            console.log("No token found")
        }
    }

    //Handles deletion of selected schedule
    const handleDeleteSchedules = async () => {
        const selectedSchedules = coachScheduleTable.getSelectedRowModel().rows;
        const scheduleIds = selectedSchedules.map((row) => row.original.id);

        console.log('Deleting schedules:', scheduleIds);

        try {
            // Make the delete request to the backend
            await axios.delete(`http://localhost:3001/coachAvailability/${scheduleIds}`);

            // Update local state to remove deleted schedules
            setCoachSchedule((prevSchedules) =>
                prevSchedules.filter((schedule) => !scheduleIds.includes(schedule.id))
            );

            // Optionally, show a success toast
            toast({ description: "Schedules deleted successfully" });
        } catch (error) {
            console.error("Error deleting schedules", error);
            toast({ description: "Failed to delete schedules", variant: "destructive" });
        }
    };


    //Editing mode handler
    const handleEditClick = () => {
        const selectedSchedule = coachScheduleTable.getSelectedRowModel().rows[0]?.original;

        if (selectedSchedule) {
            setEditingSchedule(selectedSchedule);
            setEditDate(new Date(selectedSchedule.date));
            setEditStartTime(selectedSchedule.statTime); //Leave these alone
            setEditEndTime(selectedSchedule.endTime);
            setIsEditDialogOpen(true);
        }
    };

    //handles completed editing
    const handleSaveChanges = async () => {
        if (editingSchedule && editDate && editStartTime && editEndTime) {
            console.log('Editing schedule:', editDate, editStartTime, editEndTime);

            const token = localStorage.getItem('accessToken');
            if(token){
                try{
                    const decodedToken = jwtDecode<CustomJwtPayload>(token);
                    const coachId = decodedToken.sub['id'];

                    console.log('New schedule:', editDate, editStartTime, editEndTime, editingSchedule.id);

                    //Convert the date, start time, and end time to a Date instance

                    const updatedSchedule = {
                        coachId: coachId,
                        date: editDate.toISOString(),
                    };

                    console.log('Updated schedule:', updatedSchedule);

                    const response = await axios.patch(`http://localhost:3001/coachAvailability/${editingSchedule.id}`, updatedSchedule);
                    console.log('Schedule updated:', response.data);

                    //Reset form
                    setEditDate(undefined);
                    setEditStartTime(new Date());
                    setEditEndTime(new Date());
                    setIsEditDialogOpen(false);

                    getCoachSchedule();

                }catch(error){
                    console.error('Error updating schedule:', error);
                }
            } else {
                console.log("No token found")
            }
        }
    };


    function setValue(field: string, value: Date | undefined) {
        if (field === 'appointmentDate') {
            setScheduleDate(value);
        }
    }

    return(
        <div className='flex flex-col pb-24 w-full h-auto px-5'>

            {/* Reroute button to go back to dashboard */}
            <div className='flex pt-5'>
                <Button variant='outline' onClick={() => router.push('/coach/fitness-tracker/dashboard')}>
                    <ArrowLeftIcon/>
                    Return to Dashboard
                </Button>
            </div>


            <div className='flex flex-col text-white font-bold items-center'>
                Coach Schedule Table
            </div>

            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                <CardContent className='flex flex-col'>

                    {/* TABLE LISTING OF ALL COACH SCHEDULES - DISPLAYS DATE AND TIME-SLOT FOR THAT DAY */}
                    <Table>
                        <TableHeader>
                            {coachScheduleTable.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {/* Displays the date, start time, and end time for each coach availability */}
                            {coachScheduleTable.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={coachScheduleColumns.length} className="text-center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                coachScheduleTable.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                     {/* Pagination for the table */}
                    <div className="flex items-center justify-between px-4 py-2 border-t">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-700">
                                Page {coachScheduleTable.getState().pagination.pageIndex + 1} of{' '}
                                {coachScheduleTable.getPageCount()}
                            </p>
                            <Select
                                value={`${coachScheduleTable.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    coachScheduleTable.setPageSize(Number(value));
                                }}
                            >
                                <SelectContent>
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            Show {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                
                            </Select>
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => coachScheduleTable.previousPage()}
                                disabled={!coachScheduleTable.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => coachScheduleTable.nextPage()}
                                disabled={!coachScheduleTable.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>


                    
                    {/* -----------------------------Functionality Buttons - Create, Edit, Delete ---------------------------------------- */}
                    <CardFooter className="flex justify-between mt-4">

                        {/* ADD BUTTON */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>
                                    <PencilIcon/>
                                    Create Schedule
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md bg-black">
                                <DialogTitle>
                                    Create Day Schedule
                                </DialogTitle>

                                <DialogDescription>
                                    Create a schedule for a specific day. This will allow clients to book appointments with you.
                                    The start and end times will be available for booking. Quadruple click the desired date to select it.
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
                                                        console.log('Date:', scheduleDate);
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



                        {/* DELETE BUTTON */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                variant="destructive" 
                                disabled={!(coachScheduleTable.getIsSomeRowsSelected() || coachScheduleTable.getIsAllPageRowsSelected())}>
                                    <Cross1Icon/>
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-primary'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className='text-white font-bold'>
                                        This action cannot be undone. This will permanently delete the schedule(es).
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                    className='border border-solid' 
                                    onClick={handleDeleteSchedules}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>






                        {/* EDIT BUTTON */}
                        <Button
                        variant="outline"
                        onClick={handleEditClick}
                        disabled={!(coachScheduleTable.getIsSomeRowsSelected() || coachScheduleTable.getIsAllPageRowsSelected())}
                        >
                            <Pencil2Icon/>
                            Edit Schedule
                        </Button>

                        {/* EDIT DIALOG */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className="sm:max-w-md bg-black">
                                <DialogTitle>
                                    Edit Schedule
                                </DialogTitle>

                                <DialogDescription>
                                    Edit the date, start time, and end time for the selected schedule.
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
                                                        !editDate && "text-muted-foreground"
                                                    )}
                                                    >
                                                    <CalendarIcon />
                                                    {editDate ? format(editDate, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto h-auto p-0">
                                                    <div className='bg-black text-white'>
                                                    <Calendar
                                                    mode="single"
                                                    selected={editDate}
                                                    onSelect={(date) => {
                                                        setEditDate(date);
                                                        console.log('Date:', editDate);
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
                                                value={editStartTime}
                                                onChange={(e) => setEditStartTime(e.target.value)}
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
                                                value={editEndTime}
                                                onChange={(e) => setEditEndTime(e.target.value)}
                                                className='w-auto bg-black text-white border border-white'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-4'>
                                    <Button variant="outline" onClick={handleSaveChanges}>Save Changes</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>

                </CardContent>
            </Card>
        </div>
    )
};

export default CoachScheduleListTable;