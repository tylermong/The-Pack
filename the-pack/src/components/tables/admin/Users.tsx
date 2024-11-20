'use client'

//Table that lists all users within the system

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
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'



//Defining enum type
export type User = {
    id: string
    name: string
    email: string
    phoneNum: string
    role: Role
}

//Defining coach type
export enum Role {
    CLIENT = "CLIENT",
    COACH = "COACH",
    ADMIN = "ADMIN",
}




const UsersListTable = () => {

    //Router
    const router = useRouter()

    //Toaster
    const { toast } = useToast()

    //Client object
    const [user, setUser] = useState<User[]>([]);

    //Constants for selection state
    const [userRowSelection, setUserRowSelection] = useState<Record<string, boolean>>({});


    //JWT Token Call for coaches
    const getUsers = async () => {
        try{
            const response = await axios.get("http://localhost:3001/user");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast({
                title: "Error",
                description: "Could not fetch users.",
                variant: "destructive",
            });
        }
    };


    // Fetch the clients when the component mounts
    useEffect(() => {
        getUsers();
    }, []);


    //Table configuration users
    const userColumns: ColumnDef<User>[] = [
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
        { accessorKey: "role", header: "Role" },
    ];

    //Client Table Object
    const userTable = useReactTable({
        data: user,
        columns: userColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: userRowSelection },
        onRowSelectionChange: setUserRowSelection,
    });


    //handler for deleting a coach
    const deleteSelectedUser = async () => {
        //get the user data from user that corresponds to the selected row
        const selectedId = userTable.getSelectedRowModel();
        console.log("Selected users:", selectedId['rows'][0]['original']['id']);

        const id = selectedId['rows'][0]['original']['id'];

        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:3001/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { ids: selectedId },
            });
            toast({ title: "Success", description: "Selected user deleted successfully.", variant: "default" });
            getUsers(); // Refresh the list
        } catch (error) {
            console.error("Error deleting user:", error);
            toast({ title: "Error", description: "Could not delete selected users.", variant: "destructive" });
        }
    };


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
                Users Table
            </div>


            <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                {/* TABLE LISTING OF ALL COACHES */}
                <Table>
                    <TableHeader>
                        {userTable.getHeaderGroups().map(headerGroup => (
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
                        {userTable.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={userColumns.length} className="text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            userTable.getRowModel().rows.map(row => (
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
                            <Button variant="destructive" disabled={!(userTable.getIsSomeRowsSelected() || userTable.getIsAllPageRowsSelected())}>
                                <Cross1Icon/>
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-primary'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className='text-white font-bold'>
                                    This action cannot be undone. This will permanently delete the user(s).
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteSelectedUser} className='border border-solid'>DELETE</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    )
}
export default UsersListTable;