'use client'

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
import { Card, CardContent, CardFooter, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AnnouncementCarousel from '@/components/coach/home/Carousel';
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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"




const Dashboard = () => {

    //Data display values
    const [users, setUsers] = useState([]); 
    const [classes, setClasses] = useState([]); 

    //Selection States
    const [userRowSelection, setUserRowSelection] = useState({});
    const [classRowSelection, setClassRowSelection] = useState({});

    //For Key generation
    const [coachKey, setCoachKey] = useState('');
    const [isKeyGenerated, setIsKeyGenerated] = useState(false);


    //Table configuration for classes
    const classColumns: ColumnDef<Class>[] = [
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
        { accessorKey: "name", header: "Class Name" },
        { accessorKey: "creator", header: "Creator" },
        { accessorKey: "currentlyEnrolled", header: "Enrolled" },
    ];

    //Table configuration for users
    const userColumns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className={`bg-primary border border-solid border-white scale-50 mr-2 ${table.getIsSomePageRowsSelected() ? "indeterminate" : ""}`}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    className="bg-primary border border-solid border-white scale-50 mr-2"
                />
            ),
        },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
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

    //User Table Object
    const userTable = useReactTable({
        data: users,
        columns: userColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: userRowSelection },
        onRowSelectionChange: setUserRowSelection,
    });

    //Gets the data from DB
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axios.get('http://localhost:3001/class');
            setClasses(response.data);
        };
        fetchClasses();
    }, []);

    //backend handler for deleting selected classes
    const handleDeleteSelected = async () => {
        const selectedIds = classTable.getSelectedRowModel().rows.map(row => row.original.id);
        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:3001/class/${id}`)));
        setClasses(prevClasses => prevClasses.filter(cls => !selectedIds.includes(cls.id)));
    };

    //backend handler for deleting selected users
    const handleDeleteSelectedUsers = async () => {
        const selectedIds = userTable.getSelectedRowModel().rows.map(row => row.original.id);
        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:3001/user/${id}`)));
        setUsers(prevAccounts => prevAccounts.filter(acc => !selectedIds.includes(acc.id)));
    };

    //Generates random coach keys
    function generateRandomKey() {
        return Math.random().toString(36).substr(2, 9); // generates a short unique string
    }

    //handler for sending generated coach key to database
    const handleGenerateKey = async () => {
        const key = generateRandomKey();
        setCoachKey(key);
        setIsKeyGenerated(true);

        // Send the key to the backend to store in the database
        try {
            await axios.post('http://localhost:3001/coach-key', { key });
            console.log('Key saved to database');
        } catch (error) {
            console.error('Error saving key:', error);
        }
    };


    return (
        <div className='flex flex-col pb-24'>

            {/* ALL DASHBOARD UTILITIES IN A GRID LAYOUT (CARD LIKE) */}
            <div className='grid grid-cols-2 gap-4 items-center justify-center pl-20 pt-6'>
                

                {/* VIEW, ADD, AND DELETE ANNOUNCEMENTS */}
                <div className='w-auto h-auto'>
                    <AnnouncementCarousel/>
                </div>

                {/* VIEW AND DELETE ACCOUNTS (SHOW FULL LIST IN A DATA TABLE OF ACCOUNTS THEN CHECKMARK THEN BUTTON FOR DELETION) */}
                <div className='w-auto h-auto'>
                    <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                        <CardContent className='flex flex-col'>

                            {/* THIS IS IMPLEMENTATION FOR DYNAMIC UPDATING UNCOMMENT AFTER BACKEDN AND DB ARE DONE */}
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

                            {/* LEAVE THIS ALONE */}
                            <CardFooter className="flex justify-between mt-4">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" onClick={handleDeleteSelected} disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}>
                                            Delete Selected Classes
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
                                            <AlertDialogAction className='border border-solid'>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </div>

                <div className ="grid grid-cols-subgrid gap-4 col-span-3">

                    {/* VIEW AND DELETE CLASSES (SHOW FULL LIST IN A DATA TABLE OF ACCOUNTS THEN CHECKMAR THEN BUTTON FOR DELETION) */}
                    <div className='w-auto h-auto'>
                        <Card className='bg-primary text-white w-full h-auto pt-3'>
                            <CardContent className='flex flex-col'>

                                {/* THIS IS IMPLEMENTATION FOR DYNAMIC UPDATING UNCOMMENT AFTER BACKEDN AND DB ARE DONE */}
                                <Table>
                                    <TableHeader>
                                        {userTable.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => (
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
                                            userTable.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={row.getIsSelected() ? "bg-gray-50 text-black" : ""}>
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>

                                {/* LEAVE THIS ALONE */}
                                <CardFooter className="flex justify-between mt-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" onClick={handleDeleteSelectedUsers} disabled={!(userTable.getIsSomeRowsSelected() || userTable.getIsAllPageRowsSelected())}>
                                                Delete Selected Users
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-primary'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription className='text-white font-bold'>
                                                    This action cannot be undone. This will permanently delete the selected user(s).
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className='border border-solid'>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardFooter>

                            </CardContent>
                        </Card>
                    </div>

                    {/* COACH KEY BUTTON, ON PRESS SHOULD GENERATE A UNIQUE COACH KEY THAT GETS ADDED ON DB  */}
                    <div className='w-auto h-auto'>
                        <Card className='bg-primary text-white w-full h-full justify-center'>
                            <CardTitle className='flex justify-center font-bold text-5xl pt-2'>
                                    Coach Key Generator
                                </CardTitle>
                            <CardContent className='flex flex-col justify-center items-center pt-20'>
                                <Drawer>
                                    <DrawerTrigger className='bg-primary border border-solid text-white hover:bg-gray-300 hover:text-black'>
                                        Generate Key
                                    </DrawerTrigger>
                                    <DrawerContent className='bg-primary justify-center items-center content-center'>
                                        <DrawerHeader>
                                            <DrawerTitle>GENERATE KEY</DrawerTitle>
                                            <DrawerDescription>
                                                Give this key to a coach for them to create a coach account on register.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <Card className='bg-primary flex flex-col items-center justify-center'>
                                            <CardContent className='flex justify-center items-center text-white text-base'>
                                                {isKeyGenerated ? coachKey : 'Press Generate to create a new key.'}
                                            </CardContent>
                                        </Card>
                                        <DrawerFooter className='flex flex-row justify-between mt-4  '>
                                            <Button variant="outline" className='hover:bg-gray-300' onClick={handleGenerateKey}>
                                                Generate
                                            </Button>
                                            <DrawerClose asChild>
                                                <Button variant="outline" className='hover:bg-gray-300'>Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard