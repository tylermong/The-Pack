'use client'

//Table that lists all registered coaches (for admin specifically: allow for deletion)

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
import { Card, CardFooter } from "@/components/ui/card"
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
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'


//Defining enum type
export type Coach = {
    id: string
    name: string
    email: string
    phoneNum: string
}

//Defining coach type
export enum Role {
    CLIENT = "CLIENT",
    COACH = "COACH",
    ADMIN = "ADMIN",
}




const CoachListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Client object
    const [coach, setCoach] = useState<Coach[]>([]);

    //Constants for selection state
    const [coachRowSelection, setCoachRowSelection] = useState<Record<string, boolean>>({});


    //JWT Token Call for coaches
    const getCoaches = async () => {
        try {
            // Fetch clients associated with the coach
            const response = await axios.get(`http://localhost:3001/user?role=${'COACH'}`);

            const coaches = response.data; 
            setCoach(coaches); 
            console.log("Fetched clients:", coaches);
        } catch (error) {
            console.error("Error fetching coaches:", error);
            toast({
                title: "Error",
                description: "Could not fetch coaches.",
                variant: "destructive",
            });
        }
    };


    // Fetch the clients when the component mounts
    useEffect(() => {
        getCoaches();
    }, []);


    //Table configuration for client
    const coachColumns: ColumnDef<Coach>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className= {`bg-primary border border-solid border-white text-white scale-50 mr-2 ${table.getIsSomePageRowsSelected() ? "indeterminate" : ""}`}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    className='bg-primary border border-solid border-white text-white scale-50 mr-2'
                />
            ),
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phoneNum", header: "Phone Number" },
    ];

    //Client Table Object
    const coachTable = useReactTable({
        data: coach,
        columns: coachColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: coachRowSelection },
        onRowSelectionChange: setCoachRowSelection,
    });



    //handler for deleting a coach
    const deleteSelectedCoaches = async () => {
        //Get the ID of the coach to be deleted
        const selectedIds = coachTable.getSelectedRowModel().rows.map((row) => row.original.id);

        console.log("Selected coaches:", selectedIds);

        try {
            const token = localStorage.getItem('accessToken');

            await axios.delete(`http://localhost:3001/user/${selectedIds}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Successfully deleted selected coaches");

            toast({ title: "Success", description: "Selected coaches deleted successfully.", variant: "default" });

            getCoaches(); // Refresh the list
        } catch (error) {
            console.error("Error deleting coaches:", error);
            toast({ title: "Error", description: "Could not delete selected coaches.", variant: "destructive" });
        }
    };


    return(
        <div className='flex flex-col pb-24 w-full h-auto px-5'>
            {/* Reroute button to go back to dashboard */}
            <div className='flex pt-5'>
                <Button variant='outline' onClick={() => router.push('/admin/home')}>
                    <ArrowLeftIcon/>
                    Return to Dashboard
                </Button>
            </div>

            <div className='flex flex-col text-white font-bold items-center'>
                Coach Table
            </div>


            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                {/* TABLE LISTING OF ALL COACHES */}
                <Table>
                    <TableHeader>
                        {coachTable.getHeaderGroups().map(headerGroup => (
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
                        {coachTable.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={coachColumns.length} className="text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            coachTable.getRowModel().rows.map(row => (
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

                {/* -----------------------------Functionality Buttons - View user stats ---------------------------------------- */}
                <CardFooter className="flex justify-between mt-4">
                    {/* DELETE BUTTON */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={!(coachTable.getIsSomeRowsSelected() || coachTable.getIsAllPageRowsSelected())}>
                                <Cross1Icon/>
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-primary'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className='text-white font-bold'>
                                    This action cannot be undone. This will permanently delete the coach(es).
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteSelectedCoaches} className='border border-solid'>DELETE</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
};
export default CoachListTable;