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


//Defining class type
export type Class = {
    id: string
    name: string
    description: string
    currentlyEnrolledIn: number
    assignedCoach: string
    date: string
    startTime: string
    endTime: string
}

interface CustomJwtPayload extends JwtPayload {
    coachId: string;
}




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
    const [startTime, setStartTime] = useState<string>("00:00");
    const [endTime, setEndTime] = useState<string>("00:00");
    const [date, setDate] = useState<string>();

    //For editing a class
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [editDate, setEditDate] = useState<string>();
    const [editStartTime, setEditStartTime] = useState<string>("00:00");
    const [editEndTime, setEditEndTime] = useState<string>("00:00");
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);


    //JWT Token Call for Coach specific classes
    const getCoachClasses = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decode the JWT token to get the coachId
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.coachId;

                if (!coachId) {
                    console.error("Coach ID not found in token.");
                    return;
                }

                // Fetch clients associated with the coach
                const response = await axios.get(`http://localhost:3001/class?assignedCoach=${coachId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const classes = response.data; 
                setClasses(classes); 
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
        { accessorKey: "currentlyEnrolledIn", header: "Member Count" },
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
        if (!name || !description || !date || !startTime || !endTime) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/classes", {
                name: name,
                description,
                date,
                startTime,
                endTime,
            });

            if (response.status === 201) {
                alert("Class created successfully!");
                // Clear form
                setName("");
                setDescription("");
                setDate("");
                setStartTime("");
                setEndTime("");
            }
        } catch (error) {
            console.error("Error creating class:", error);
            alert("Failed to create class. Please try again.");
        }
    };


    //Handles deletion of selected schedule
    const handleDeleteClass = async () => {
        const selectedClass = classTable.getSelectedRowModel().rows;
        const classIds = selectedClass.map((row) => row.original.id);

        try {
            // Make the delete request to the backend
            await axios.delete('http://localhost:3001/class', {
                data: { ids: classIds },
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            });

            // Update local state to remove deleted schedules
            setClasses((prev) => prev.filter((schedule) => !classIds.includes(schedule.id)));

            // Optionally, show a success toast
            toast({ description: "Class deleted successfully" });
        } catch (error) {
            console.error("Error deleting class", error);
            toast({ description: "Failed to delete class", variant: "destructive" });
        }
    };



    //Editing mode handler
    const handleEditClick = () => {
        const selectedClass = classTable.getSelectedRowModel().rows[0]?.original;

        if (selectedClass) {
            setEditingClass(selectedClass);
            setEditName(selectedClass.name);
            setEditDescription(selectedClass.description);
            setEditDate(selectedClass.date);
            setEditStartTime(selectedClass.startTime);
            setEditEndTime(selectedClass.endTime);
            setIsEditDialogOpen(true);
        }
    };

    //handles completed editing
    const handleSaveChanges = async () => {
        if (editingClass && editDate && editStartTime && editEndTime && editName && editDescription) {
            const updatedClass = {
                ...editingClass,
                name: editName,
                description: editDescription,
                date: editDate,
                startTime: editStartTime,
                endTime: editEndTime,
            };
    
            try {
                await axios.put(`http://localhost:3001/class/${editingClass.id}`, updatedClass, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                });
    
                // Update the local state with the new values
                setClasses((prevClass) =>
                    prevClass.map((classes) =>
                        classes.id === editingClass.id ? updatedClass : classes
                    )
                );
    
                toast({ description: "Class updated successfully" });
                setIsEditDialogOpen(false); // Close the dialog
            } catch (error) {
                console.error("Error updating class", error);
                toast({ description: "Failed to update class", variant: "destructive" });
            }
        }
    };

    


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
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Date:
                                    </Label>
                                    <Input 
                                    type="text"
                                    placeholder="Enter date(s) (e.g., Mon, Wed, Fri)"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                

                                {/* Time Pickers */}
                                {["Start Time", "End Time"].map((label, index) => (
                                    <div className="flex flex-row items-center my-2" key={label}>
                                        <Label className="font-bold text-lg pr-6">{label}:</Label>
                                        <Select
                                            value={index === 0 ? startTime : endTime}
                                            onValueChange={(value) =>
                                                index === 0 ? setStartTime(value) : setEndTime(value)
                                            }
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

                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Edit Class Details</DialogTitle>
                                </DialogHeader>

                                {/* Class Name Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Name:
                                    </Label>
                                    <Input type="name" value={name} onChange={(e) => setEditName(e.target.value)}/>
                                </div>

                                {/* Class Description Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Description:
                                    </Label>
                                    <Textarea placeholder="Write class description..." value={description} onChange={(e) => setEditDescription(e.target.value)}/>
                                </div>

                                {/* Date Input */}
                                <div className='flex flex-row items-center'>
                                    <Label className='font-bold text-lg pr-6'>
                                        Date:
                                    </Label>
                                    <Input placeholder="Date"  value={date} onChange={(e) => setEditDate(e.target.value)}/>
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
    );
};
export default ClassListTable;