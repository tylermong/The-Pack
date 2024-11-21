'use client'

// Lists all available classes (for coach specifically allow for creation, modification, and deletion)
// FOR VIEWING ALSO ALLOW TO CLICK ON A CLASS THEN POP UP WITH CLASS INFORMATION IN CARDS
// FOR THE CREATE CLASS BUTTON
// Requirements: Name, description, dates(ex:Monday, Wdnesday, Friday), start time, and endtime

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
import { ArrowLeftIcon, Pencil1Icon, Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ClockIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"


//Defining class type
export type Class = {
    id: string
    name: string
    description: string
    creatorId: string
    currentlyEnrolled: number
    date: string
    startTime: string
    endTime: string
}

interface CustomJwtPayload extends JwtPayload {
    sub: string;
}

const FormSchema = z.object({
    name: z.string().nonempty('Name is required'),
    coach: z.string().nonempty('Coach name is required'),
    appointmentType: z.string().nonempty('Appointment Type is required'),
    appointmentDate: z.date().refine(date => date !== undefined, 'Date is required'),
});




const ClassListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Constants for when mounting table data
    const [classes, setClasses] = useState<Class[]>([]);

    //Constants for selection state
    const [classRowSelection, setClassRowSelection] = useState({});

    //Constants for making a class
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<Date | undefined>(new Date());
    const [endTime, setEndTime] = useState<Date | undefined>(new Date());
    const [date, setDate] = useState<Date | undefined>(new Date());

    //For editing a class
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [editDate, setEditDate] = useState<Date | undefined>(new Date());
    const [editStartTime, setEditStartTime] = useState<Date | undefined>(new Date());
    const [editEndTime, setEditEndTime] = useState<Date | undefined>(new Date());
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newDate, setNewDate] = useState<Date | undefined>(new Date());


    //Adding a client
    const [client, setClient] = useState("");


    //User Input Calendar Format
    const { handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(FormSchema),
    });


    //JWT Token Call for Coach specific classes
    const getCoachClasses = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decode the JWT token to get the coachId
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub;

                if (!coachId) {
                    console.error("Coach ID not found in token.");
                    return;
                }

                console.log("Fetching classes for coach:", coachId['id']);

                // Fetch clients associated with the coach
                const response = await axios.get(`http://localhost:3001/class/coach/${coachId['id']}`);

                const classes = response.data; 

                //Map the values to the classes constant for only name, description, date, start time, end time
                setClasses(classes.map((classItem: any) => ({
                    id: classItem.id,
                    name: classItem.name,
                    description: classItem.description,
                    currentlyEnrolled: classItem.currentlyEnrolled,
                    date: classItem.classDates[0].date['date'].split('T')[0],
                    startTime: classItem.classDates[0].startTime.split('T')[1].split(':')[0] + ':' + classItem.classDates[0].startTime.split('T')[1].split(':')[1],
                    endTime: classItem.classDates[0].endTime.split('T')[1].split(':')[0] + ':' + classItem.classDates[0].endTime.split('T')[1].split(':')[1],
                })));



                
                console.log("Fetched classes:", classes);
            } catch (error) {
                console.error("Error fetching classes:", error);
                toast({
                    title: "Error",
                    description: "Could not fetch classes.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "No Token",
                description: "Access token is missing. Please log in.",
                variant: "destructive",
            });
        }
    };

    // Fetch the clients when the component mounts
    useEffect(() => {
        getCoachClasses();
    }, []);



    //Table configuration for coach schedule
    const classColumns: ColumnDef<Class>[] = [
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
        { accessorKey: "name", header: "Name" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "currentlyEnrolled", header: "Member Count" },
        { accessorKey: "date", header: "Date" },
        { accessorKey: "startTime", header: "Start Time" },
        { accessorKey: "endTime", header: "End Time" },
    ];

    //Class Table Object
    const classTable = useReactTable({
        data: classes,
        columns: classColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: classRowSelection },
        onRowSelectionChange: setClassRowSelection,
    });


    const handleCreateClass = async () => {
        const token = localStorage.getItem("accessToken");
        if(token) {
            try {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub;

                console.log('Coach ID:', coachId['id']);

                if (!coachId) {
                    console.error("Coach ID not found in token.");
                    return;
                }

                const formattedDate = date ? date.toISOString().split('T')[0] : '';

                const classData = {
                    creatorId: coachId['id'],
                    assignedCoachId: coachId['id'],
                    name: name,
                    description: description,
                    classDates: [{
                        date: date,
                        startTime: new Date(`${formattedDate}T${startTime}:00.000Z`).toISOString(),
                        endTime: new Date(`${formattedDate}T${endTime}:00.000Z`).toISOString(),
                    }]
                };

                console.log("Creating class with data:", classData);


                const response = await axios.post("http://localhost:3001/class", {creatorId: coachId['id'], ...classData}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (response.status === 201) {
                    alert("Class created successfully!");
                    // Reset form
                    setName("");
                    setDescription("");
                    setDate(undefined);
                    setStartTime(undefined);
                    setEndTime(undefined);
                    
                    // Refresh class list
                    getCoachClasses();
                }
            } catch (error) {
                console.error("Error creating class:", error);
                alert("Failed to create class. Please try again.");
            }
        } else {
            toast({
                title: "No Token",
                description: "Access token is missing. Please log in.",
                variant: "destructive",
            });
        }

        if (!name || !description || !date || !startTime || !endTime) {
            alert("Please fill out all fields.");
            return;
        }
    };


    //Handles deletion of selected schedule
    const handleDeleteClass = async () => {
        const selectedClasses = classTable.getSelectedRowModel().rows.map((row) => row.original);

        if (selectedClasses.length > 0) {
            try {
                await Promise.all(
                    selectedClasses.map((classItem) =>
                        axios.delete(`http://localhost:3001/class/${classItem.id}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                        })
                    )
                );

                setClasses((prevClasses) =>
                    prevClasses.filter((classItem) => !selectedClasses.some((selectedClass) => selectedClass.id === classItem.id))
                );

                toast({ description: "Class deleted successfully" });
            } catch (error) {
                console.error("Error deleting class", error);
                toast({ description: "Failed to delete class", variant: "destructive" });
            };
        }
    };



    //Editing mode handler
    const handleEditClick = () => {
        const selectedClass = classTable.getSelectedRowModel().rows[0]?.original;

        if (selectedClass) {
            setEditingClass(selectedClass);
            setEditName(selectedClass.name);
            setEditDescription(selectedClass.description);
            setEditDate(new Date(selectedClass.date));
            setEditStartTime(new Date(selectedClass.startTime));
            setEditEndTime(new Date(selectedClass.endTime));
            setIsEditDialogOpen(true);
        }
    };

    //handles completed editing
    const handleSaveChanges = async () => {
        const selectedClass = classTable.getSelectedRowModel().rows[0]?.original;

        if (selectedClass) {
            try {
                const formattedDate = editDate ? editDate.toISOString().split('T')[0] : '';

                const classData = {
                    name: editName,
                    description: editDescription,
                    classDates: [{
                        date: editDate,
                        startTime: new Date(`${formattedDate}T${editStartTime}:00.000Z`).toISOString(),
                        endTime: new Date(`${formattedDate}T${editEndTime}:00.000Z`).toISOString(),
                    }]
                };

                console.log("Updating class with data:", classData);

                const response = await axios.patch(`http://localhost:3001/class/${selectedClass.id}`, classData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });

                if (response.status === 200) {
                    alert("Class updated successfully!");
                    // Reset form
                    setEditName("");
                    setEditDescription("");
                    setEditDate(undefined);
                    setEditStartTime(undefined);
                    setEditEndTime(undefined);
                    setIsEditDialogOpen(false);
                    // Refresh class list
                    getCoachClasses();
                }
            } catch (error) {
                console.error("Error updating class:", error);
                alert("Failed to update class. Please try again.");
            }
        }

        if (!editName || !editDescription || !editDate || !editStartTime || !editEndTime) {
            alert("Please fill out all fields.");
            return;
        }
    };







    //UNTESTED FUNCTION---------------------------------------------------------------------





    //handles adding a client to a class
    const handleAddClient = async () => {
        // Get the selected class
        const selectedClass = classTable.getSelectedRowModel().rows[0]?.original;

        // Get the selected client
        const selectedClient = client;

        if (selectedClass && selectedClient) {
            try {
                // Make the request to the backend
                await axios.post(`http://localhost:3001/class/${selectedClass.id}/client/${selectedClient.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });

                toast({ description: "Client added successfully" });
            } catch (error) {
                console.error("Error adding client to class", error);
                toast({ description: "Failed to add client to class", variant: "destructive" });
            }
        }
    }

    //handles removing a client from a class
    const handleRemoveClient = async () => {
        // Get the selected class
        const selectedClass = classTable.getSelectedRowModel().rows[0]?.original;

        // Get the selected client
        const selectedClient = client;

        if (selectedClass && selectedClient) {
            try {
                // Make the request to the backend
                await axios.delete(`http://localhost:3001/class/${selectedClass.id}/client/${selectedClient.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });

                toast({ description: "Client removed successfully" });
            } catch (error) {
                console.error("Error removing client from class", error);
                toast({ description: "Failed to remove client from class", variant: "destructive" });
            }
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
                Class Table
            </div>

            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                <CardContent className='flex flex-col'>

                    {/* TABLE LISTING OF ALL COACH SCHEDULES - DISPLAYS DATE AND TIME-SLOT FOR THAT DAY */}
                    <Table>
                        <TableHeader>
                            {classTable.getHeaderGroups().map(headerGroup => (
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
                            {classTable.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={classColumns.length} className="text-center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                classTable.getRowModel().rows.map(row => (
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

                        {/* CREATE BUTTON */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant ="outline">
                                    <Pencil1Icon/>
                                    Create Class
                                </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Create A Class
                                    </DialogTitle>
                                    <DialogDescription>
                                        Give your class a name. Write a brief description.
                                        Indicate the dates (ex: Mon, Wed, Fri). 
                                        Choose the start and end times.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Class Name Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Name:
                                    </Label>
                                    <Input 
                                    type="text"
                                    placeholder="Class Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Class Description Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Description:
                                    </Label>
                                    <Textarea 
                                    placeholder="Write class description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* Date Input */} 
                                <div className='flex flex-row space-y-1.5 items-center justify-between'>
                                    <Label htmlFor="font-bold text-lg pr-6">Date:</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal bg-black text-white border-solid border-white",
                                                !date && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto h-auto p-0">
                                            <div className='bg-black text-white'>
                                            <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(date) => {
                                                setDate(date);
                                                setValue('appointmentDate', date);
                                            }}
                                            initialFocus
                                            />
                                            </div>
                                            
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                

                                {/* Time Pickers */}
                                <div className='flex flex-row items-center justify-between'>
                                    <Label className='font-bold text-lg pr-6'>Start Time:</Label>
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

                                <div className='flex flex-row items-center justify-between'>
                                    <Label className='font-bold text-lg pr-6'>End Time:</Label>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="w-5 h-5" />
                                        <Input
                                        type="time"
                                        id="startTime"
                                        name="startTime"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className='w-auto bg-black text-white border border-white'
                                        />
                                    </div>
                                </div>

                                

                                <Button variant='outline' onClick={handleCreateClass}>Create Schedule</Button>

                            </DialogContent>
                        </Dialog>



                        {/* DELETE BUTTON */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                variant="destructive" 
                                disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}>
                                    <Cross1Icon/>
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-primary'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className='text-white font-bold'>
                                        This action cannot be undone. This will permanently delete the class(es).
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                    className='border border-solid' 
                                    onClick={handleDeleteClass}
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
                        disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}
                        >
                            <Pencil2Icon/>
                            Edit Class
                        </Button>

                        {/* Edit the class details */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Edit Class
                                    </DialogTitle>
                                    <DialogDescription>
                                        Edit the class name, description, date, start time, and end time.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Class Name Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Name:
                                    </Label>
                                    <Input 
                                    type="text"
                                    placeholder="Class Name"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    />
                                </div>

                                {/* Class Description Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Description:
                                    </Label>
                                    <Textarea 
                                    placeholder="Write class description..."
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </div>
                                    
                                    {/* Date Input */}
                                    <div className='flex flex-row space-y-1.5 items-center justify-between'>
                                        <Label htmlFor="font-bold text-lg pr-6">Date:</Label>
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
                                                    setValue('appointmentDate', date);
                                                }}
                                                initialFocus
                                                />
                                                </div>
                                                
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                        
    
                                        {/* Time Pickers */}
                                        <div className='flex flex-row items-center justify-between'>
                                            <Label className='font-bold text-lg pr-6'>Start Time:</Label>
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

                                        <div className='flex flex-row items-center justify-between'>
                                            <Label className='font-bold text-lg pr-6'>End Time:</Label>
                                            <div className="flex items-center space-x-2">
                                                <ClockIcon className="w-5 h-5" />
                                                <Input
                                                type="time"
                                                id="startTime"
                                                name="startTime"
                                                value={editEndTime}
                                                onChange={(e) => setEditEndTime(e.target.value)}
                                                className='w-auto bg-black text-white border border-white'
                                                />
                                            </div>
                                        </div>

                                        <Button variant='outline' onClick={handleSaveChanges}>Save Changes</Button>
                            </DialogContent>
                        </Dialog>


                        
                        {/* ADD CLIENT BUTTON */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant ="outline" disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}>
                                    <Pencil1Icon/>
                                    Add Client
                                </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Add a Client
                                    </DialogTitle>
                                    <DialogDescription>
                                        Write the client name. Then submit.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Client Name Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Name:
                                    </Label>
                                    <Input 
                                    type="text"
                                    placeholder="Client Name"
                                    value={name}
                                    onChange={(e) => setClient(e.target.value)}
                                    />
                                </div>
                                <Button variant='outline' onClick={handleAddClient}>Add</Button>
                            </DialogContent>
                        </Dialog>


                        {/* REMOVE CLIENT BUTTON */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant ="outline" disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}>
                                    <Pencil1Icon/>
                                    Remove Client
                                </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Remove a Client
                                    </DialogTitle>
                                    <DialogDescription>
                                        Write the client name. Then submit.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Client Name Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Name:
                                    </Label>
                                    <Input 
                                    type="text"
                                    placeholder="Client Name"
                                    value={name}
                                    onChange={(e) => setClient(e.target.value)}
                                    />
                                </div>
                                <Button variant='outline' onClick={handleRemoveClient}>Add</Button>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
};
export default ClassListTable;