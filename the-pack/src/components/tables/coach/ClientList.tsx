'use client'

//Table that lists all clients (For coaches: only shows clients assigned to them, also add button to allow to view client fitness stats)

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";
import { ArrowLeftIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'



//Defining user type
export type Client = {
    id: string
    name: string
    email: string
    phoneNum: string
    programs: string[]
}

export type NutritionEntry = {
    id: string
    userID: string
    date: Date
    goals: number
    calories: number
    protein: number
    carbohydrates: number
    fats: number
}

export type ProgramEntry = {
    id: string
    programName: string
    userID: string
    weekEntries: programWeeks[]
}

export type programWeeks = {
    id: string
    numOfWeeks: number
    programId: string
    dayEntries: programDays[]
}

export type programDays = {
    id: string
    name: string
    week: programWeeks
    weekNum: string
    exerciseEntries: dailyExercise[]
}

export type dailyExercise = {
    id: string
    name: programDays
    dayNum: string
    exerciseName: string
    numOfSets: string
    numOfReps: string
    weightLifted: string
}


//Defining JWT token payload to contain a coachID
interface CustomJwtPayload extends JwtPayload {
    sub: string;
}



const ClientListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Client object
    const [client, setClient] = useState<Client[]>([]);

    //Constants for selection state
    const [clientRowSelection, setClientRowSelection] = useState({});

    //Constants for viewing client stats
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [dailyNutrition, setDailyNutrition] = useState<NutritionEntry[]>([])
    const [programEntries, setProgramEntries] = useState<ProgramEntry[]>([])


    //JWT Token Call for Clients associated with the coach
    const getCoachClients = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decode the JWT token to get the coachId
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub;

                console.log("Decoded token:", coachId);

                // Fetch all clients
                const response = await axios.get(`http://localhost:3001/user?role=${'CLIENT'}`);

                const clients = response.data; 
                setClient(clients); 
                console.log("Fetched clients:", clients);

            } catch (error) {
                console.error("Error fetching clients:", error);
                toast({
                    title: "Error",
                    description: "Could not fetch clients.",
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
        getCoachClients();
    }, []);


    //Table configuration for client
    const clientColumns: ColumnDef<Client>[] = [
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
    const clientTable = useReactTable({
        data: client,
        columns: clientColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: clientRowSelection },
        onRowSelectionChange: setClientRowSelection,
    });


    // Fetch the nutrition entries for the selected client
    const fetchClientFitnessStats = async (clientId: string) => {
        try {
            // Fetch the nutrition entries for the selected client
            const nutritionResponse = await axios.get(`http://localhost:3001/nutrition/${clientId}`);
            const nutritionEntries = nutritionResponse.data;
            setDailyNutrition(nutritionEntries);

            // Fetch the program entries for the selected client
            const programResponse = await axios.get(`http://localhost:3001/programs/${clientId}`);
            const programEntries = programResponse.data;
            setProgramEntries(programEntries);
        } catch (error) {
            console.error("Error fetching client fitness stats:", error);
            toast({
                title: "Error",
                description: "Could not fetch client fitness stats.",
                variant: "destructive",
            });
        }
    }



    //Viewing mode
    const handleViewClick = () => {
        const selectedRow = clientTable.getSelectedRowModel().rows[0]?.original;
        if (selectedRow) {
            setSelectedClientId(selectedRow.id);
            fetchClientFitnessStats(selectedRow.id); // Fetch stats for selected client
        } else {
            toast({
                title: "No Client Selected",
                description: "Please select a client to view stats.",
                variant: "destructive",
            });
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
                Clients Table
            </div>


            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                {/* TABLE LISTING OF ALL CLIENTS OF THE COACH */}
                <Table>
                    <TableHeader>
                        {clientTable.getHeaderGroups().map(headerGroup => (
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
                        {clientTable.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={clientColumns.length} className="text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            clientTable.getRowModel().rows.map(row => (
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
            </Card>
        </div>
    );
};
export default ClientListTable;