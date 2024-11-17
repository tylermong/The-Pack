'use client'

//Table that lists all ongoing classes

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card"
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
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'


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

//ClassesListTable component

const ClassesListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Constants for when mounting table data
    const [classes, setClasses] = useState<Class[]>([]);

    //Constants for selection state
    const [classRowSelection, setClassRowSelection] = useState({});


    //JWT Token Call for all ongoing classes
    const getClasses = async () => {
        try{
            const response = await axios.get('http://localhost:3001/class');
            const classes = response.data;
            setClasses(classes);
            console.log("Fetched classes:", classes);
        }catch(error){
            console.error("Error fetching classes:", error);
            toast({
                title: "Error",
                description: "Could not fetch classes.",
                variant: "destructive",
            });
        }
    };

    // Fetch the clients when the component mounts
    useEffect(() => {
        getClasses();
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


    return (
        <div className='flex flex-col pb-24 w-full h-auto px-5'>
            {/* Reroute button to go back to dashboard */}
            <div className='flex pt-5'>
                <Button variant='outline' onClick={() => router.push('/admin/home')}>
                    <ArrowLeftIcon/>
                    Return to Dashboard
                </Button>
            </div>


            <div className='flex flex-col text-white font-bold items-center'>
                Classes Table
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
                </CardContent>
            </Card>
        </div>
    )
}
export default ClassesListTable;