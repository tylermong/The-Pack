'use client'

//Lists all appointments (Allow for deletion)
//ONLY FOR COACHES NO NEED FOR ADMIN

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
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'


//Defining appointment type
export type Appointment = {
    id: string
    coachId: string 
    clientId: string
    startTime: string
    endTime: string
    date: string
}

interface CustomJwtPayload extends JwtPayload {
    sub: string;
}



const AppointmentsListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Constants for when mounting table data
    const [appointment, setAppointment] = useState<Appointment[]>([]);

    //Constants for selection state
    const [appointmentRowSelection, setAppointmentRowSelection] = useState({});



    //NEEED TO FIX AKA HAVE A SAMPLE OF AN APPOINTMENT WITH A TIMESLOT TOSEE DATA FORMAT AND DISPLAY TO THE TABLE!!!!!!!!!!!!!!!!!!!!!!!

    //JWT Token Call for Appointments associated with the coach
    const getAppointments = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decode the JWT token to get the coachId
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub['id'];

                console.log("Coach ID:", coachId);

                // Fetch the appointments associated with the coach
                const response = await axios.get(`http://localhost:3001/appointments/coach/${coachId}`);

                const appointments = response.data; 
                setAppointment(appointments); 
                console.log("Fetched appointments:", appointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                toast({
                    title: "Error",
                    description: "Could not fetch appointments.",
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

    // Fetch the appointments when the component mounts
    useEffect(() => {
        getAppointments();
    }, []);



    //Table configuration for coach schedule
    const appointmentColumns: ColumnDef<Appointment>[] = [
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
    const appointmentTable = useReactTable({
        data: appointment,
        columns: appointmentColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: appointmentRowSelection },
        onRowSelectionChange: setAppointmentRowSelection,
    });


    //Handler for deleting an appointment
    const handleDeleteAppointment = async () => {
        //Get the selected appointment
        const appointmentIds = appointmentTable.getSelectedRowModel().rows.map((row) => row.original.id);

        console.log("Deleting appointments:", appointmentIds[0]);

        const appId = appointmentIds[0];

        try {
            // Make the delete request to the backend
            await axios.delete(`http://localhost:3001/appointments/${appId}`);

            // Update local state to remove deleted schedules
            setAppointment((prev) => prev.filter((schedule) => !appointmentIds.includes(schedule.id)));

            console.log("Appointment deleted successfully");

            // Optionally, show a success toast
            toast({ description: "Appointment deleted successfully" });
        } catch (error) {
            console.error("Error deleting appointment", error);
            toast({ description: "Failed to delete appointment", variant: "destructive" });
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
                Appointments Table
            </div>

            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                <CardContent className='flex flex-col'>

                    {/* TABLE LISTING OF ALL COACH SCHEDULES - DISPLAYS DATE AND TIME-SLOT FOR THAT DAY */}
                    <Table>
                        <TableHeader>
                            {appointmentTable.getHeaderGroups().map(headerGroup => (
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
                            {appointmentTable.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={appointmentColumns.length} className="text-center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointmentTable.getRowModel().rows.map(row => (
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

                    
                    {/* -----------------------------Functionality Buttons - Delete ---------------------------------------- */}
                    <CardFooter className="flex justify-between mt-4">
                        {/* DELETE BUTTON */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                variant="destructive" 
                                disabled={!(appointmentTable.getIsSomeRowsSelected() || appointmentTable.getIsAllPageRowsSelected())}>
                                    <Cross1Icon/>
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-primary'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className='text-white font-bold'>
                                        This action cannot be undone. This will permanently delete the appointment(es).
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                    className='border border-solid' 
                                    onClick={handleDeleteAppointment}
                                    >
                                        DELETE
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
};
export default AppointmentsListTable;