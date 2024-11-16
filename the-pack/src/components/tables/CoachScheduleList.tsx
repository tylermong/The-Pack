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
    DialogFooter,
    DialogHeader,
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
import { CalendarIcon, ArrowLeftIcon, Pencil1Icon, Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'



//Defining coach scheudle type
export type CoachSchedule = {
    id: string
    coachID: string 
    date: string
    startTime: string
    endTime: string
}

interface CustomJwtPayload extends JwtPayload {
    coachId: string;
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

    //Constants for when making a schedule
    const [startTime, setStartTime] = useState<string>("00:00");
    const [endTime, setEndTime] = useState<string>("00:00");
    const [date, setDate] = useState<Date>();

    //For time pickers
    const [time, setTime] = useState<string>("00:00");


    //Constants for editing a schedule
    const [editingSchedule, setEditingSchedule] = useState<CoachSchedule | null>(null);
    const [editDate, setEditDate] = useState<Date | undefined>();
    const [editStartTime, setEditStartTime] = useState<string>("00:00");
    const [editEndTime, setEditEndTime] = useState<string>("00:00");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


    //JWT Token Call for Coach Specific information
    const getCoachProfile = async () => {
        const token = localStorage.getItem('accessToken');
        if(token){
            try {
                const response = await axios.get("http://localhost:3001/auth/user", {
                    headers: {
                        Authorization: 'Bearer ${token}',
                    },
                });

                const coachData = response.data;
                const coachID = jwtDecode<CustomJwtPayload>(token);

                console.log("Coach Data", coachData)
                console.log("Coach ID", coachID)

                return coachID;
            } catch (error) {
                console.log("Error fetching profile", error)
            }
        }
    };
    

    //Mounts table with newest data (specific to current coach)
    useEffect(() => {
        const fetchCoachSchedule = async () => {
            const coachID = await getCoachProfile();
            if(coachID){
                try{
                    const response = await axios.get('http://localhost:3001/coachAvailability');
                    setCoachSchedule(response.data)
                } catch(error) {
                    console.error("Error fetching schedule", error)
                }
            }
        };
        fetchCoachSchedule();
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
                    className= {`bg-primary border border-solid border-white scale-50 mr-2 ${table.getIsSomePageRowsSelected() ? "indeterminate" : ""}`}
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
        state: { rowSelection: coachScheduleRowSelection },
        onRowSelectionChange: setCoachScheduleRowSelection,
    });



    //handles creation of new schedules
    const handleCreateSchedule = async () => {
        if (date && startTime && endTime) {
          const token = localStorage.getItem('accessToken');
      
          // Data being sent
          const scheduleData = {
            date: date.toISOString().split("T")[0], // Format as yyyy-mm-dd
            startTime,
            endTime,
          };
      
          try {
            // Send the schedule data to the backend
            await axios.post("http://localhost:3001/coachAvailability", scheduleData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            toast({
              description: "Schedule created successfully!",
            });
      
            //Refetch the schedule data to update the table
            const response = await axios.get("http://localhost:3001/coachAvailability", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCoachSchedule(response.data);

            setDate(undefined);      
            setStartTime("00:00");   
            setEndTime("00:00"); 
          } catch (error) {
            console.error("Error creating schedule:", error);
            toast({
              description: "Failed to create schedule.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            description: "Please fill in all fields before creating a schedule.",
            variant: "destructive",
          });
        }
    };

    //Handles deletion of selected schedule
    const handleDeleteSchedules = async () => {
        const selectedSchedules = coachScheduleTable.getSelectedRowModel().rows;
        const scheduleIds = selectedSchedules.map((row) => row.original.id);

        try {
            // Make the delete request to the backend
            await axios.delete('http://localhost:3001/coachAvailability', {
                data: { ids: scheduleIds },
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            // Update local state to remove deleted schedules
            setCoachSchedule((prev) => prev.filter((schedule) => !scheduleIds.includes(schedule.id)));

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
            setEditStartTime(selectedSchedule.startTime);
            setEditEndTime(selectedSchedule.endTime);
            setIsEditDialogOpen(true);
        }
    };

    //handles completed editing
    const handleSaveChanges = async () => {
        if (editingSchedule && editDate && editStartTime && editEndTime) {
            const updatedSchedule = {
                ...editingSchedule,
                date: editDate.toISOString(),
                startTime: editStartTime,
                endTime: editEndTime,
            };
    
            try {
                await axios.put(`http://localhost:3001/coachAvailability/${editingSchedule.id}`, updatedSchedule, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });
    
                // Update the local state with the new values
                setCoachSchedule((prevSchedules) =>
                    prevSchedules.map((schedule) =>
                        schedule.id === editingSchedule.id ? updatedSchedule : schedule
                    )
                );
    
                toast({ description: "Schedule updated successfully" });
                setIsEditDialogOpen(false); // Close the dialog
            } catch (error) {
                console.error("Error updating schedule", error);
                toast({ description: "Failed to update schedule", variant: "destructive" });
            }
        }
    };


    return(
        <div className='flex flex-col pb-24 w-full h-auto px-5'>

            {/* Reroute button to go back to dashboard */}
            <div className='flex pt-5'>
                <Button variant='outline' onClick={() => router.push('/coachfitnesstracker')}>
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

                    
                    {/* -----------------------------Functionality Buttons - Create, Edit, Delete ---------------------------------------- */}
                    <CardFooter className="flex justify-between mt-4">

                        {/* ADD BUTTON */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant ="outline">
                                    <Pencil1Icon/>
                                    Create Schedule
                                </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Create Your Monthly Schedule
                                    </DialogTitle>
                                    <DialogDescription>
                                        Pick a date from the calendar. Choose a start and end time.
                                        Once done, press create schedule!
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Date Picker */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Date:
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground bg-primary border border-solid border-white"
                                            )}
                                            >
                                            <CalendarIcon />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 flex flex-col bg-primary text-white">
                                            <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                

                                {/* Time Pickers */}
                                {["Start Time", "End Time"].map((label, index) => (
                                    <div className="flex flex-row items-center" key={label}>
                                        <Label className="font-bold text-lg pr-6">{label}:</Label>
                                        <Select
                                            defaultValue={time}
                                            onValueChange={(e) => index === 0 ? setStartTime(e) : setEndTime(e)}
                                        >
                                            <SelectTrigger className="font-normal w-[120px] border border-white border-solid">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <ScrollArea className="h-[15rem]">
                                                    {Array.from({ length: 96 }).map((_, i) => {
                                                        const hour = String(Math.floor(i / 4)).padStart(2, "0");
                                                        const minute = String((i % 4) * 15).padStart(2, "0");
                                                        return (
                                                            <SelectItem key={i} value={`${hour}:${minute}`}>
                                                                {hour}:{minute}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </ScrollArea>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}

                                <Button variant='outline' onClick={handleCreateSchedule}>Create Schedule</Button>
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

                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Edit Schedule Details</DialogTitle>
                                </DialogHeader>

                                <div className="flex flex-row items-center">
                                <Label className="font-bold text-lg pr-6">Date:</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground bg-primary border border-solid border-white"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 flex flex-col bg-primary text-white">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                </div>

                                {/* Time Pickers */}
                                {["Start Time", "End Time"].map((label, index) => (
                                <div className="flex flex-row items-center" key={label}>
                                    <Label className="font-bold text-lg pr-6">{label}:</Label>
                                    <Select
                                    value={index === 0 ? startTime : endTime}
                                    onValueChange={(e) => index === 0 ? setStartTime(e) : setEndTime(e)}
                                    >
                                    <SelectTrigger className="font-normal w-[120px] border border-white border-solid">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <ScrollArea className="h-[15rem]">
                                        {Array.from({ length: 96 }).map((_, i) => {
                                            const hour = String(Math.floor(i / 4)).padStart(2, "0");
                                            const minute = String((i % 4) * 15).padStart(2, "0");
                                            return (
                                            <SelectItem key={i} value={`${hour}:${minute}`}>
                                                {hour}:{minute}
                                            </SelectItem>
                                            );
                                        })}
                                        </ScrollArea>
                                    </SelectContent>
                                    </Select>
                                </div>
                                ))}

                                <DialogFooter>
                                    <Button variant='outline' onClick={handleSaveChanges}>Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>

                </CardContent>
            </Card>
        </div>
    )
};

export default CoachScheduleListTable;