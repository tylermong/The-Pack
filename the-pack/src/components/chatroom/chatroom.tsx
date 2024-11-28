'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Send, User } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";
import { MessageSquare } from 'lucide-react';
import socket from '@/app/api/socket';
import { Separator } from '@/components/ui/separator';




interface Message {
    id: string;
    content: string;
    userID: string;
    chatroomId: string;
    createdAt: Date;
}

interface ChatroomParticipant {
    id: string;
    userID: string;
    chatroomID: string;
    joinedAt: Date;
}

interface Chatroom {
    id: string;
    name: string;
    coachId: string;
    createdAt: Date;
    chatroomParticipants: ChatroomParticipant[];
    messages: Message[];
}

interface CreateChatroomDto {
    name: string;
}


interface CustomJwtPayload extends JwtPayload {
    sub: string;
}




const Chatroom = () =>{

    //For scroll view
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    //For Role handling (allow only coaches to make rooms)
    const [userRole, setUserRole] = useState<'COACH' | 'CLIENT'>('CLIENT');
    const [userId, setUserId] = useState<string>('');
    const [username, setUserName] = useState<string>('');

    //States for chatrooms
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [newRoomName, setNewRoomName] = useState('');
    const [participants, setParticipants] = useState<ChatroomParticipant[]>([]);
    const [coachName, setCoachName] = useState('');
    const [currentRoomName, setCurrentRoomName] = useState('');




    //Gets the current role of the user
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem('accessToken');
            if(token){
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const userRole = decodedToken.sub['role'];

                //Get the user name
                const response = await axios.get(`http://localhost:3001/user/${decodedToken.sub['id']}`);
                console.log('User:', response.data);

                if(userRole){
                    setUserRole(userRole);
                    setUserId(decodedToken.sub['id']);
                    setUserName(response.data['name']);
                }
            } else {
                return;
            }
        };
        fetchUserRole();
    }, []);




    //Gets all the chatrooms that a user is in
    useEffect(() => {
        const fetchUserChatrooms = async () => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const userId = decodedToken.sub['id'];
                console.log('User ID:', userId);

                try {
                    const response = await axios.get(`http://localhost:3001/chatroom/user/${userId}`);
                    setChatrooms(response.data);
                    console.log('Chatrooms:', response.data);
                } catch (error) {
                    console.error('Error fetching chatrooms:', error);
                }
            }
        };

        fetchUserChatrooms();

        const intervalId = setInterval(fetchUserChatrooms, 5000); // Fetch chatrooms every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);




    //Creating a chatroom--------------------------------------------------------------------------------------------------------------
    const createChatroom = async () => {

        if (!newRoomName) return;

        const token = localStorage.getItem('accessToken');

        if(token){
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            const coachId = decodedToken.sub['id'];

            const chatroomData: CreateChatroomDto = {
                name: newRoomName,
            };

            //Creating a chatroom
            const response = await axios.post('http://localhost:3001/chatroom', { coachId: coachId, ...chatroomData });

            console.log('Chatroom created:', response.data);

            //Adding participants to the chatroom
            const chatroomID = response.data.id;
            const participant = participants.map((participant) => ({ userID: participant.userID, chatroomID }));

            console.log('Chatroom ID:', chatroomID);
            console.log('Participants:', participants);

            //Get all the participants userIds
            const users = await axios.get(`http://localhost:3001/user?role=CLIENT`);
            const coaches = await axios.get(`http://localhost:3001/user?role=COACH`);

            console.log('Users:', users.data);
            console.log('Coaches:', coaches.data);

            //Get all the participants userIds and names
            const participantsAll = users.data.map((user) => ({ userID: user.id, name: user.name }));
            const coachesAll = coaches.data.map((coach) => ({ userID: coach.id, name: coach.name }));

            console.log('Participants:', participantsAll);

            //Check in participantsAll if the participants are in the list, if so, add them to the chatroom
            const participantsToAdd: string[] = [];
            for(let i = 0; i < participantsAll.length; i++){
                for(let j = 0; j < participant.length; j++){
                    if(participantsAll[i].name === participant[j].userID){
                        participantsToAdd.push(participantsAll[i].userID);
                    }
                }
            }

            for(let i = 0; i < coachesAll.length; i++){
                for(let j = 0; j < participant.length; j++){
                    if(coachesAll[i].name === participant[j].userID){
                        participantsToAdd.push(coachesAll[i].userID);
                    }
                }
            }

            //Join multiple users to the chatroom
            await axios.post('http://localhost:3001/chatroom-participants/join-multiple', { userIds: participantsToAdd, chatroomId: chatroomID});

            console.log('Participants added to chatroom:', participantsToAdd);
    
            //Emitting the chatroom data to the server using socket.io
            await createChatroomSocket();

            setNewRoomName('');
            setParticipants([]);

        }
        else{
            return;
        }
    };



    //Chatroom aesthetics--------------------------------------------------------------------------------------------------------------

    //Handler for splitting the participants into an array of strings and adding them to the chatroom when creating a chatroom
    function handleParticipantsChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const participantsArray = event.target.value.split(',').map(participant => participant.trim());
        setParticipants(participantsArray.map(userID => ({ id: uuidv4(), userID, chatroomID: selectedRoom, joinedAt: new Date() })));
    }

    //Automatic scrolling to the newest message
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])





    //ALL SOCKET.IO LISTENERS---------------------------------------------------------------------------------------------------
    //Socket Handlers: Emitting (joining room and sending messages) and Listening (receiving messages and chatrooms)

    //Socket handler for on mount
    useEffect(() => {
        // Connect the socket when the component mounts
        socket.connect();

        // Listen for events
        socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        });

        socket.on('new_message', (message) => {
        setMessages((prev) => [...prev, message]);
        });

        // Clean up when the component unmounts
        return () => {
        socket.disconnect();
    };
    }, []);


    //Handler for updating current chatroom name to chosen chatroom also joining the room
    const handleRoomChange = (roomName: string) => {
        setCurrentRoomName(roomName);
        joinRoomSocket(selectedRoom);
    };


    //Socket handler for creating a chatroom (client side) - sends the chatroom data to the server using emit
    const joinRoomSocket = async (roomId: string) => {
        await socket.emit('join_room', { roomId: roomId, username: username });
    };


    //Socket handler for creating a chatroom (client side) - sends the chatroom data to the server using emit
    const createChatroomSocket = async () => {
        if (newRoomName.trim()) {
            await socket.emit('create_room', { roomId: newRoomName, username: username });
            setNewRoomName('');
        }
    };



    //Socket handler for sending a message (client side) - sends the message to the server using emit
    const sendMessage = async () => {
        if (currentMessage.trim() && selectedRoom) {
            console.log('Sending message:', currentMessage);

            //Find the chatroom ID based on the selected room
            const chatroom = chatrooms.find((chatroom) => chatroom['chatroom']['name'] === selectedRoom);
            console.log('Chatroom:', chatroom);

            //Message data
            const messageData: Message = {
                content: currentMessage,
                userID: userId,
                chatroomId: chatroom['chatroom']['id'],
            };

            console.log('Message data:', messageData);

            //send message to DB
            await axios.post('http://localhost:3001/messages', messageData);

            await socket.emit('send_message', { roomId: selectedRoom, message: currentMessage });

            
            setCurrentMessage('');
        }
    };



    //Fetching old messages for the selected chatroom on change of selected room
    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedRoom) {

                //Get the chatroom ID based on the selected room
                const chatroom = chatrooms.find((chatroom) => chatroom['chatroom']['name'] === selectedRoom);

                const response = await axios.get(`http://localhost:3001/messages/chatroom/${chatroom['chatroom']['id']}`);
                setMessages(response.data);
                console.log('Messages:', response.data);
            }
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [selectedRoom, currentMessage]);



    //Socket handler for receiving a message (client side) - listens for incoming messages using on
    socket.on('receive_message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    });





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
                            className={`flex items-center gap-3 px-4 py-2 ${selectedRoom === chatroom['chatroom']['name'] ? 'bg-gray-300 text-black' : 'hover:bg-accent hover:text-black'}`}
                            onClick={() => { setSelectedRoom(chatroom['chatroom']['name']); handleRoomChange(chatroom['chatroom']['name']); }}
                            >
                                <Avatar>
                                    <MessageSquare className="content-center justify-center h-auto w-auto" />
                                </Avatar>
                                <span>{chatroom['chatroom']['name']}</span>
                            </div>
                        ))}
                    </ScrollArea>


                    {/*Create chatroom button - Coach Specific*/}
                    {userRole === 'COACH' && (
                        <div className='flex mt-auto justify-center'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='bg-white text-black hover:bg-gray-300'>Create Chatroom</Button>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-md bg-black">

                                    <DialogTitle>
                                        Make a Chatroom
                                    </DialogTitle>

                                    <Card className="w-[350px] bg-black text-white border-none">

                                        <CardHeader>
                                            {/* DEAD SPACE */}
                                        </CardHeader>

                                        <CardContent>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="name" className="mb-1">Chatroom Name</Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Chatroom name"
                                                        value={newRoomName}
                                                        onChange={(e) => setNewRoomName(e.target.value)}  // Handle input change
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
                                                        value={participants.map(p => p.userID).join(', ')}
                                                        onChange={handleParticipantsChange}  // Handle input change
                                                    />
                                                </div>
                                                
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-between">
                                            <Button type="submit" variant="outline" onClick={createChatroom}>Create chatroom</Button>
                                        </CardFooter>
                                    </Card>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                </Card>


                {/*Selected Active chat rooms*/}
                <div className="flex-1 flex flex-col text-base">

                    {/* Chatroom Name (dynamically update based on the current selected chatroom) */}
                    <Card className="rounded-none border-b bg-black">
                        <CardHeader>
                            <CardTitle className='text-white'>
                                {currentRoomName}
                            </CardTitle>
                        </CardHeader>
                    </Card>




                    {/* Chatroom Content */}
                    <ScrollArea className="flex-1 p-4">
                        {/* Dynamically updates the chatroom conent with old, current, and incoming messages */}
                        {messages.map((message) => (
                            <React.Fragment key={message.id}>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <User className="content-center justify-center h-auto w-auto" />
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold">{message['user']['name']}</span>
                                            <span className="text-xs text-gray-400">{format(new Date(message.createdAt), 'hh:mm a')}</span>
                                        </div>
                                        <span className="text-white">{message.content}</span>
                                    </div>
                                </div>
                                <Separator className="my-2" />
                            </React.Fragment>
                        ))}
                    </ScrollArea>

                    <Card className="rounded-none border-t bg-black">
                        <CardContent className="p-4">
                            <div className="flex gap-4 text-white">
                                <Input
                                    placeholder="Type a message..."
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage();
                                        }
                                    }}
                                />
                                <Button onClick={sendMessage}>
                                    <Send/>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>    

                </div>
            </div>
        </div>
    );
};
export default Chatroom;