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
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { UserIcon, DumbbellIcon, CalendarIcon, CalendarCheckIcon } from "lucide-react"




//EXAMPLE DATA FOR THE CLASSES LIST
export type Class = {
    id: string
    name: string
    creator: string 
    currentlyEnrolled: number
    usersInClasses: string[]
  }

const hardCodedClasses: Class[] = [
{
    id: "1",
    name: "Morning Class",
    creator: "Joe",
    currentlyEnrolled: 3,
    usersInClasses: ["Ellen", "Arnold", "Bob"]
},
{
    id: "2",
    name: "Night Class",
    creator: "Al",
    currentlyEnrolled: 3,
    usersInClasses: ["Dan", "Alice", "Xun"]
},
]


//EXMAPLE DATA FOR THE USERS LIsST
export type User = {
    id: string
    name: string
    email: string
  }

const hardcodedUsers: User[] = [
{
    id: "728ed52f",
    name: "Bob",
    email: "bob@yahoo.com",
},
{
    id: "489e1d42",
    name: "Angela",
    email: "angela@gmail.com",
},
]

//EXMAPLE DATA FOR THE APPOINTMENT LIsST
export type Appointment = {
    coach: string
    type: string
    time: string
  }

  const hardcodedAppointments: Appointment[] = [
    {
        coach: "Danny",
        type: "Inquiry",
        time: "10:00AM",
    },
]



const Dashboard = () => {

    //Router
    const router = useRouter()

    //Data display values
    //const [users, setUsers] = useState([]); UNCOMMENT AFTER DONE WITH DB AND BACKEND IMPLEMENTATION
    //const [classes, setClasses] = useState([]); UNCOMMENT AFTER DONE WITH DB AND BACKEND IMPLEMENTATION
    //const [appointments, setAppointments] = useState([]); UNCOMMENT AFTER DONE WITH DB AND BACKEND IMPLEMENTATION

    //For creating a new class
    const [newClass, setNewClass] = useState({ name: '', creator: '', users: ''});
    const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);

    //Selected data instances
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedClass, setEditedClass] = useState({ name: '', creator: '', users: '' });
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState({ coach: '', type: '', time: '' });
    const [userStats, setUserStats] = useState(null);


    //Selection States
    const [userRowSelection, setUserRowSelection] = useState({});
    const [classRowSelection, setClassRowSelection] = useState({});
    const [appointmentRowSelection, setAppointmentRowSelection] = useState({});


    //Gets the data from DB
    useEffect(() => {
        const fetchClasses = async () => {
            const classes = await axios.get('http://localhost:3001/classes');
            setClasses(classes.data);
            const appointment = await axios.get('http://localhost:3001/appointments');
            setAppointments(appointment.data);
            const user = await axios.get('http://localhost:3001/users');
            setUsers(user.data);
        };
        fetchClasses();
    }, []);





    //HARDCODED IMPLEMENTATION FOR NOW DELETE AFTER
    const [classes, setClasses] = useState<Class[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    // Set the classes with hardcoded values when the component mounts
    useEffect(() => {
        setClasses(hardCodedClasses); // Set static data instead of fetching from API (CHANGE THIS WHEN DB AND BACKEND ADDED)
    }, []);

    // Set the users with hardcoded values when the component mounts
    useEffect(() => {
        setUsers(hardcodedUsers); // Set static data instead of fetching from API (CHANGE THIS WHEN DB AND BACKEND ADDED)
    }, []);

    // Set the appointments with hardcoded values when the component mounts
    useEffect(() => {
        setAppointments(hardcodedAppointments); // Set static data instead of fetching from API (CHANGE THIS WHEN DB AND BACKEND ADDED)
    }, []);





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

    //Table configuration for appointments
    const appointmentColumns: ColumnDef<Appointment>[] = [
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
        { accessorKey: "coach", header: "Coach Name" },
        { accessorKey: "type", header: "Type" },
        { accessorKey: "time", header: "Time" },
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

    //User Table Object
    const appointmentTable = useReactTable({
        data: appointments,
        columns: appointmentColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { rowSelection: appointmentRowSelection },
        onRowSelectionChange: setAppointmentRowSelection,
    });


    //Handler for new classes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass((prevClass) => ({ ...prevClass, [name]: value }));
    };

    //backend handler for creating a class
    const handleCreateClass = async () => {
        try {
            const response = await axios.post('http://localhost:3001/classes', newClass);
            setClasses((prevClasses) => [...prevClasses, response.data]);
            setNewClass({ name: '', creator: '', users: '' }); // Reset form
            setIsClassDialogOpen(false); // Close dialog after creating class
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };

    //Selects via row for editing
    const selectedClassData = classTable.getSelectedRowModel().rows[0]?.original;

    //handler for editing a class
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedClass((prevClass) => ({ ...prevClass, [name]: value }));
    };

    // Handler to open the edit dialog and load the selected class data
    const handleEditClass = (classData) => {
        setSelectedClass(classData);
        setEditedClass({ name: classData.name, creator: classData.creator, users: classData.users });
        setIsEditDialogOpen(true);
    };

    //backend handler for updating the class
    const handleSaveEditedClass = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/classes/${selectedClass.id}`, editedClass);
            setClasses((prevClasses) =>
                prevClasses.map((cls) =>
                    cls.id === selectedClass.id ? response.data : cls
                )
            );
            setIsEditDialogOpen(false);
            setSelectedClass(null); // Reset the selected class
        } catch (error) {
            console.error("Error editing class:", error);
        }
    };


    //Slects via row for editing appointment
    const selectedAppointmentData = appointmentTable.getSelectedRowModel().rows[0]?.original;

    //handler for editing an appointment
    const handleEditAppointment = () => {
        if (selectedAppointmentData) {
            setSelectedAppointment(selectedAppointmentData);
            setEditedAppointment({ coach: selectedAppointmentData.coach, type: selectedAppointmentData.type, time: selectedAppointmentData.time });
            setIsEditDialogOpen(true);  // Open the dialog
        }
    };

    //backend handler for updating appointment
    const handleAppointmentInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAppointment((prevAppointment) => ({ ...prevAppointment, [name]: value }));
    };

    //backend handler for updating appointment
    const handleSaveEditedAppointment = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/appointments/${selectedAppointment.id}`, editedAppointment);
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === selectedAppointment.id ? response.data : appointment
                )
            );
            setIsEditDialogOpen(false);
            setSelectedAppointment(null); // Reset the selected appointment
        } catch (error) {
            console.error("Error editing appointment:", error);
        }
    };


    //handler for user stats
    const handleUserStat = (user) => {
        setSelectedUser(user);
        fetchUserStats(user.id);
    };

    //backend handler for getting user stats
    // Function to fetch user stats from the backend
    const fetchUserStats = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/userss/${userId}`);
            const data = response.data;  // Ensuring the response is typed as UserStats
            setUserStats(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //backend handler for deleting selected classes
    const handleDeleteSelectedClasses = async () => {
        const selectedIds = classTable.getSelectedRowModel().rows.map(row => row.original.id);
        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:3001/classes/${id}`)));
        setClasses(prevClasses => prevClasses.filter(cls => !selectedIds.includes(cls.id)));
    };

    //backend handler for deleting selected appointments
    const handleDeleteSelectedAppointments = async () => {
        const selectedIds = appointmentTable.getSelectedRowModel().rows.map(row => row.original.id);
        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:3001/appointments/${id}`)));
        setAppointments(prevAccounts => prevAccounts.filter(acc => !selectedIds.includes(acc.id)));
    };



    return (
        <div className='flex flex-col pb-24'>

            {/* ALL DASHBOARD UTILITIES IN A GRID LAYOUT (CARD LIKE) */}
            <div className='grid grid-cols-2 gap-4 items-center justify-center pl-20 pt-6 pr-3'>

                {/* Coach Schedule Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Coach Schedule
                        </CardTitle>
                        <CalendarIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachschedule')}> 
                            View Schedule
                        </Button>
                    </CardContent>
                </Card>

                {/* Class Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Class List
                        </CardTitle>
                        <DumbbellIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachclasses')}> 
                            View Classes
                        </Button>
                    </CardContent>
                </Card>

                {/* Client Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Client List
                        </CardTitle>
                        <UserIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachclients')}> 
                            View Clients
                        </Button>
                    </CardContent>
                </Card>

                {/* Appointment Table Card */}
                <Card className='flex flex-col bg-primary border border-solid worder-white items-center'>
                    <CardHeader className='flex items-center'>
                        <CardTitle className='text-white font-bold'>
                            Appointments
                        </CardTitle>
                        <CalendarCheckIcon className='bg-primary text-white' size={64}/>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant='outline' onClick={() => router.push('/coachappointments')}> 
                            View Appointments
                        </Button>
                    </CardContent>
                </Card>






                {/* DISPLAY, EDIT, AND DELETE APPOINTMENTS */}
                <div className='w-auto h-auto'>
                    <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                        <CardContent className='flex flex-col'>

                            {/* THIS IS IMPLEMENTATION FOR DYNAMIC UPDATING UNCOMMENT AFTER BACKEDN AND DB ARE DONE */}
                            {/* <Table>
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
                            </Table> */}

                            {/* THIS IS IMPLEMENTATION FOR HARDCODED VALUES DELETE ONCE DONE DB AND BACKEND */}
                            <Table>
                                <TableHeader>
                                    {appointmentTable.getHeaderGroups().map((headerGroup) => (
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
                                    {appointmentTable.getRowModel().rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={appointmentColumns.length} className="text-center">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        appointmentTable.getRowModel().rows.map((row) => (
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
                                        <Button variant="destructive" disabled={!(appointmentTable.getIsSomeRowsSelected() || appointmentTable.getIsAllPageRowsSelected())}>
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
                                            <AlertDialogAction className='border border-solid' onClick={handleDeleteSelectedAppointments}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Button
                                variant="outline"
                                onClick={handleEditAppointment}
                                disabled={!(appointmentTable.getIsSomeRowsSelected() || appointmentTable.getIsAllPageRowsSelected() || selectedAppointmentData)}
                                >
                                    Edit
                                </Button>

                                {/* Dialog for editing appointment details */}
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Appointment Details</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                type="text"
                                                name="coach"
                                                placeholder="Coach"
                                                value={editedAppointment.coach}
                                                onChange={handleAppointmentInputChange}
                                            />
                                            <Input
                                                type="text"
                                                name="type"
                                                placeholder="Type (e.g., Inquiry, Follow-up)"
                                                value={editedAppointment.type}
                                                onChange={handleAppointmentInputChange}
                                            />
                                            <Input
                                                type="text"
                                                name="time"
                                                placeholder="Time"
                                                value={editedAppointment.time}
                                                onChange={handleAppointmentInputChange}
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleSaveEditedAppointment}>Save</Button>
                                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </div>

                
                {/* VIEW CLIENT LIST (SHOW FULL LIST IN A DATA TABLE OF ACCOUNTS THEN CHECKMARK THEN BUTTON FOR STATS) */}
                <div className='w-auto h-auto'>
                    <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                        <CardContent className='flex flex-col'>

                            {/* THIS IS IMPLEMENTATION FOR DYNAMIC UPDATING UNCOMMENT AFTER BACKEDN AND DB ARE DONE */}
                            {/* <Table>
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
                            </Table> */}

                            {/* THIS IS IMPLEMENTATION FOR HARDCODED VALUES DELETE ONCE DONE DB AND BACKEND */}
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
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => handleUserStat(selectedUser)} disabled={!(userTable.getIsSomeRowsSelected() || userTable.getIsAllPageRowsSelected())}>
                                            View Stats 
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className='bg-primary'>
                                        <DialogHeader>
                                            <DialogTitle>Client Details</DialogTitle>
                                        </DialogHeader>
                                        <Card>
                                            <CardContent>
                                            {userStats ? (
                                                <Card>
                                                    <CardContent>
                                                        <h3>Nutrition Stats</h3>
                                                        <div>
                                                            <p>Nutrition Entries: {userStats.nutritionEntries}</p>
                                                            <p>Fitness Entries: {userStats.fitnessEntries}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : (
                                                <p>Loading stats...</p>
                                            )}
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </CardContent>
                    </Card>
                </div>

                

            </div>

            <div className='grid grid-cols-1 gap-4 items-center justify-center pl-20 pt-6 pr-3'>
                <div className ="grid gap-4 col-span-3">
                    {/* DISPLAY, CREATE, EDIT, DELETE CLASSES (SHOW FULL LIST IN A DATA TABLE OF ACCOUNTS THEN CHECKMARK THEN BUTTON FOR DELETION OR EDIT) */}
                    <div className='w-auto h-auto'>
                        <Card className='bg-primary text-white w-full h-auto rounded-md border pt-3'>
                            <CardContent className='flex flex-col'>

                                {/* THIS IS IMPLEMENTATION FOR DYNAMIC UPDATING UNCOMMENT AFTER BACKEDN AND DB ARE DONE */}
                                {/* <Table>
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
                                </Table> */}

                                {/* DELETE THIS TABLE WHEN DONE DB AND BACKEND */}
                                {/* THIS IMPLEMENTATION IS FOR HARDCODED VALUES */}
                                <Table>
                                    <TableHeader>
                                        {classTable.getHeaderGroups().map((headerGroup) => (
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
                                        {classTable.getRowModel().rows.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={classColumns.length} className="text-center">
                                                    No data available
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            classTable.getRowModel().rows.map((row) => (
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
                                {/* BASICALLY WHEN A CLASS GETS CLICKED IT EITHER GETS EDITED OR DELETED */}
                                <CardFooter className="flex justify-between mt-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive"  disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected())}>
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
                                                <AlertDialogAction className='border border-solid' onClick={handleDeleteSelectedClasses}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                
                                    {/* Button to trigger the edit dialog */}
                                    <Button variant="outline" onClick={() => selectedClassData && handleEditClass(selectedClassData)} disabled={!(classTable.getIsSomeRowsSelected() || classTable.getIsAllPageRowsSelected() || selectedClassData)}>
                                        Edit 
                                    </Button>

                                    {/* Dialog for editing class details */}
                                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                        <DialogContent className='bg-primary'>
                                            <DialogHeader>
                                                <DialogTitle>Edit Class Details</DialogTitle>
                                                <DialogDescription>
                                                    Edit your class information. Users are comma-seperated.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4">
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Class Name"
                                                    value={editedClass.name}
                                                    onChange={handleEditInputChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="creator"
                                                    placeholder="Creator"
                                                    value={editedClass.creator}
                                                    onChange={handleEditInputChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="users"
                                                    placeholder="Users (comma-seperated)"
                                                    value={editedClass.users}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleSaveEditedClass} className='border border-solid'>Save</Button>
                                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button onClick={() => setIsClassDialogOpen(true)} variant="outline">
                                        Create New Class
                                    </Button>
                                    <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
                                        <DialogContent className='bg-primary'>
                                            <DialogHeader>
                                                <DialogTitle>Create a New Class</DialogTitle>
                                                <DialogDescription>
                                                    Edit your class information. Users are comma-seperated.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4">
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Class Name"
                                                    value={newClass.name}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="creator"
                                                    placeholder="Creator"
                                                    value={newClass.creator}
                                                    onChange={handleInputChange}
                                                />
                                                <Input
                                                    type="text"
                                                    name="users"
                                                    placeholder="Users (comma-seperated)"
                                                    value={newClass.users}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleCreateClass} className='border border-solid'>Save</Button>
                                                <Button variant="outline" onClick={() => setIsClassDialogOpen(false)}>Cancel</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Dashboard