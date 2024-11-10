'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Send, User } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import io from 'socket.io-client';
import SocketMock from 'socket.io-mock';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';


interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: string;
    chatroomId: string;
}

interface Chatroom {
    id: string;
    name: string;
    lastMessage: string;
    users: string[];
}

//WebSocket for real time messaging
//const socket = io('http://localhost:3001');  //UNCOMMENT ONCE DONE TESTING MOCK






//WebSocket for testing without DB and Backend (DELETE ONCE DONE)
const socket = process.env.NODE_ENV === 'test' ? new SocketMock() : io('http://localhost:3002');








const Chatroom = () =>{

    //Messages related
    const [messages, setMessages] = React.useState<Message[]>([]) //Content of messages
    const [newMessage, setNewMessage] = React.useState("") //content of new messages

    //Chatroom related
    //const [chatrooms, setChatrooms] = useState<Chatroom[]>([]); //Current chatroom list
    const [chatroomName, setChatroomName] = useState(''); //Chatroom name for creating new rooms
    const [coachName, setCoachName] = useState(''); //Coach name for creating new rooms
    const [participants, setParticipants] = useState(''); //List of participants for creating new rooms
    const [selectedChatroomId, setSelectedChatroomId] = useState<string | null>(null); //Chatroom object for selecting current room user active in

    //For scroll view
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    //For Role handling (allow only coaches to make rooms)
    const [userRole, setUserRole] = useState<'coach' | 'client'>('client');












    //MOCK STUFF DELETE ONCE DONE TESTING
    // Simulate the user role retrieval in a test environment
    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            // Mock user role as 'coach' or 'client' for testing
            setUserRole('coach');
        } else {
            // Fetch actual user role if backend is running
            const fetchUserRole = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/user');
                    setUserRole(response.data.role);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            };
            fetchUserRole();
        }
    }, []);


    // Set up mock chatroom data
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([
        { id: '1', name: 'General', lastMessage: '', users: ['user1', 'user2'] },
        { id: '2', name: 'Private', lastMessage: '', users: ['user1'] }
    ]);


    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            // Mock receiving messages
            socket.on('sendMessage', (messageData: Message) => {
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });
        } else {
            socket.on('receiveMessage', (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }

        return () => {
            socket.off('sendMessage');
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const participantsList = participants.split(',').map((p) => p.trim());

        const newChatroom = {
            name: chatroomName,
            coach: coachName,
            users: participantsList,
            id: uuidv4(),
            lastMessage: '',
        };

        if (process.env.NODE_ENV === 'test') {
            // Directly update local chatrooms state for testing
            setChatrooms([...chatrooms, newChatroom]);
        } else {
            // Actual API call to backend
            try {
                const newRoom = await axios.post('http://localhost:3001/chatrooms', newChatroom);
                console.log("New chatroom created:", newRoom);
                setChatrooms([...chatrooms, newChatroom]);
            } catch (error) {
                console.error('Error creating chatroom:', error);
            }
        }

        setChatroomName('');
        setCoachName('');
        setParticipants('');
    };

    useEffect(() => {
        // Listen for storage changes (when a new message is received in another tab)
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'newMessage') {
                const messageData = JSON.parse(event.newValue || '{}');
                setMessages((prevMessages) => [...prevMessages, messageData]);
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);












    //Fetching current user role
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user');  
                setUserRole(response.data.role);  
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
        fetchUserRole();  // Call the async function
    }, []);

    //handling participants when creating chatroom
    const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParticipants(e.target.value);
    };

    //(UNCOMMENT ONCE DONE TESTING AND DELETE THE OTHER ONE)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Handle form submission to create the chatroom 
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();  

    //     // Convert the comma-separated participants string into an array
    //     const participantsList = participants.split(',').map((participant) => participant.trim());

    //     // New Room Details, pass to backend
    //     const newChatroom = {
    //         name: chatroomName,
    //         coach: coachName,
    //         users: participantsList,  
    //         id: uuidv4(), //uniquely generated ID
    //         lastMessage: '',
    //     };

    //     try {
    //         // Send POST request to the database
    //         const newRoom = await axios.post('http://localhost:3001/chatrooms', newChatroom);
    //         console.log("New chatroom created:", newRoom);

    //         // Update the state for local rendering
    //         setChatrooms([...chatrooms, newChatroom]);

    //         // Reset the form after successful submission
    //         setChatroomName('');
    //         setCoachName('');
    //         setParticipants('');
    //     } catch (error) {
    //         console.error('Error creating chatroom:', error);
    //     }
    // };


    //Connecting to chatroom
    useEffect(() => {
        if (selectedChatroomId) {
          socket.emit('joinChatroom', selectedChatroomId);
        }
    }, [selectedChatroomId]);
 

    //Listening for oncoming messages
    useEffect(() => {
        socket.on('receiveMessage', (message: Message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
          socket.off('receiveMessage');
        };
    }, []);

    //Socket handler for messages
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && selectedChatroomId) {
          const messageData = {
            id: Date.now().toString(),
            user: 'You',
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            chatroomId: selectedChatroomId,
          };
          socket.emit('sendMessage', messageData);


          //TEMPORARY DELETE ONCE BACKEND AND DB IS IMPLEMENTED
          // Save the message to localStorage to trigger updates in other tabs
          localStorage.setItem('newMessage', JSON.stringify(messageData));




          setMessages((prevMessages) => [...prevMessages, messageData]);
          setNewMessage('');
        }
    };


    //Handler for updating current chatroom name to chosen chatroom
    useEffect(() => {
        // Find the selected chatroom from the list of chatrooms
        const selectedChatroom = chatrooms.find(
          (chatroom) => chatroom.id === selectedChatroomId
        );
        // If a chatroom is found, update the chatroom name
        if (selectedChatroom) {
          setChatroomName(selectedChatroom.name);
        }
      }, [selectedChatroomId, chatrooms]);

    //Automatic scrolling to the newest message
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, [messages])

    return(
        <div className="flex h-screen">
            <div className="flex flex-1 overflow-hidden text-sm">
                <Card className="w-64 flex flex-col border-r rounded-none bg-black text-white">

                    <CardHeader>
                        <CardTitle>Inbox</CardTitle>
                    </CardHeader>

                    {/*List of Chat rooms*/}
                    <ScrollArea className="flex-1">
                        {chatrooms.map((chatroom) => (
                            <div 
                            key={chatroom.id} 
                            className={`flex items-center gap-3 px-4 py-2 ${selectedChatroomId === chatroom.id ? 'bg-gray-300 text-black' : 'hover:bg-accent hover:text-black'}`}
                            onClick={() => setSelectedChatroomId(chatroom.id)}
                            >
                                <Avatar>
                                    <User className="content-center justify-center h-auto w-auto" />
                                </Avatar>
                                <span>{chatroom.name}</span>
                            </div>
                        ))}
                    </ScrollArea>

                    {/*Buttons for making chatroom - COACH SPECIFIC (CLIENTS SHOULD NOT BE ABLE TO MAKE CHATROOMS)*/}
                    <div className='flex mt-auto justify-center'>
                        <Dialog>
                            {userRole == 'coach' && (
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Make a chatroom</Button>
                                </DialogTrigger>
                            )}

                                {/* DELETE ONCE DONE TESTING*/}
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Make a chatroom</Button>
                                </DialogTrigger>

                            <DialogContent className="sm:max-w-md bg-black">
                                <DialogTitle>Make a Chatroom</DialogTitle>
                                <Card className="w-[350px] bg-black text-white border-none">

                                    <CardHeader>
                                        {/* DEAD SPACE */}
                                    </CardHeader>

                                    <CardContent>
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name" className="mb-1">Chatroom Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Chatroom name"
                                                value={chatroomName}
                                                onChange={(e) => setChatroomName(e.target.value)}  // Handle input change
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="coach" className="mb-1">Coach Name</Label>
                                            <Input
                                                id="coach"
                                                placeholder="Coach name"
                                                value={coachName}
                                                onChange={(e) => setCoachName(e.target.value)}  // Handle input change
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="participants" className="mb-1">Participants (comma separated)</Label>
                                            <Input
                                                id="participants"
                                                placeholder="Enter participants"
                                                value={participants}
                                                onChange={handleParticipantsChange}  // Attach handleParticipantsChange here
                                            />
                                        </div>
                                            </div>
                                        </form>
                                    </CardContent>

                                    <CardFooter className="flex justify-between">
                                        <Button type = "submit" variant="outline">Create chatroom</Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>

                {/*Selected Active chat rooms*/}
                <div className="flex-1 flex flex-col text-base">
                    {/* Chatroom Name (dynamically update based on current chatroom) */}
                    <CardHeader className="border-b">
                        <CardTitle>{chatroomName}</CardTitle>
                    </CardHeader>

                    {/* Chatroom Content */}
                    <ScrollArea className="flex-1 p-4">
                        {messages .filter((message) => message.chatroomId == selectedChatroomId) .map((message, index) => (
                            <div key={message.id} className="mb-4 last:mb-0">
                                <div className="flex items-center gap-2 mb-1">

                                <Avatar>
                                    <User className="content-center justify-center h-auto w-auto" />
                                </Avatar>

                                <span className="font-semibold">{message.user}</span>
                                <span className="text-sm text-muted-foreground">{format(new Date(message.timestamp), 'MMM d, hh:mm a')}</span>
                                </div>
                                <p className="pl-10">{message.content}</p>
                                {index < messages.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </ScrollArea>

                    <Card className="rounded-none border-t bg-black">
                        <CardContent className="p-4">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 text-white"
                                />
                                <Button type="submit" size="icon" className='border-white'>
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Send message</span>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>    
                </div>
            </div>
        </div>
    );
};
export default Chatroom;