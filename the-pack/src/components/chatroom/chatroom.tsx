'use client'

import React, { useEffect, useState } from 'react';
import { Send, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { db, messaging, onMessage, getToken  } from '@/lib/firebase';
import { Timestamp, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, where } from 'firebase/firestore';


// SUPER IMPORTANT NOTE: Firebase uses a completely SEPERATE DATABASE.
// That means when retrieving current users it has to be done from 
// Prisma and transferred to Firebase. Or when users are being 
// added, it adds to both sides


const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging, { vapidKey: 'BKkoGiHUSiFdFNoc27oC5oJwPStuV2ABl07Ddm9tqp2YfXPd3q-XCTVmsa_ovWQPf-Y7FtVi4Ao65nLTN8t40HM' });
    console.log('FCM Token:', token);
    // Can use this token to send push notifications
  } catch (error) {
    console.error('Permission denied or error occurred:', error);
  }
};


interface Message {
    id: string;
    user: string;
    content: string;
    timestamp: string | Timestamp;
    chatroomId: string;
}

interface Chatroom {
    id: string;
    name: string;
    lastMessage: string;
    users: string[];
}
  

const Chatroom = () =>{
    const [messages, setMessages] = React.useState<Message[]>([])
    const [newMessage, setNewMessage] = React.useState("")
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const [selectedChatroomId, setSelectedChatroomId] = useState<string | null>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    //Loads current chatrooms and listen for any changes
    useEffect(() => {
        const chatroomsRef = collection(db, 'chatrooms');
        const unsubscribe = onSnapshot(chatroomsRef, (snapshot) => {
            const chatroomsData: Chatroom[] = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || "Unnamed Chatroom",
                    lastMessage: data.lastMessage || "No messages yet",
                    users: data.users || [],
                };
            });
            setChatrooms(chatroomsData);
        });
        return () => unsubscribe();
    }, []);

    // Load messages for the selected chatroom
    useEffect(() => {
        if (selectedChatroomId) {
            const q = query(collection(db, 'messages'), where('chatroomId', '==', selectedChatroomId), orderBy('timestamp'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const messagesData: Message[] = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        user: data.user || "Unknown User",
                        content: data.content || "",
                        timestamp: data.timestamp || new Date().toISOString(),
                        chatroomId: data.chatroomId,
                    };
                });
                setMessages(messagesData);
            });
            return () => unsubscribe();
        }
    }, [selectedChatroomId]);


    //Listening from Firebase for new messages and loads them
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesData: Message[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return { //CHANGE THIS HERE SO IT WORKS WITH PRISMA AND FIREBASE DATABASE DATA
              id: doc.id,
              user: data.user || "Unknown User",
              content: data.content || "",
              timestamp: data.timestamp || new Date().toISOString(),
              chatroomId: data.chatroomId,
            };
          });
          setMessages(messagesData);
        });
        return () => unsubscribe();
      }, [selectedChatroomId]);

    //Handler for sending messages
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && selectedChatroomId){
            try {
                // Add the message to Firestore
                await addDoc(collection(db, 'messages'), {
                    user: 'You', // Adjust this to use the current user's name if needed
                    content: newMessage.trim(),
                    timestamp: serverTimestamp(),
                });
                // Clear the input field
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    // Request notification permission for FCM and log token
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js').then(() => {
                requestPermission();
            }).catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
        }
    }, []);

    //Time formatter (use everywhere when rendering user message time)
    const formatTimestamp = (timestamp: Timestamp | string) => {
        return timestamp instanceof Timestamp
          ? timestamp.toDate().toLocaleTimeString()
          : timestamp;
    };

    //Automatic scrolling to the newest message
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, [messages])


    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            if(payload.data && payload.data.type == 'chat'){
                const incomingMessage: Message = {
                    id: payload.data.id,
                    user: payload.data.user,
                    content: payload.data.content,
                    timestamp: new Date().toISOString(),
                    chatroomId: payload.data.chatroomId,
                };
                setMessages(prevMessages => [...prevMessages, incomingMessage])
            }
        });
    }, []);


    return(
        <div className="flex h-screen">
            <div className="flex flex-1 overflow-hidden text-sm">
                <Card className="w-64 flex-none border-r rounded-none bg-black text-white">

                    <CardHeader>
                        <CardTitle>Inbox</CardTitle>
                    </CardHeader>

                    {/*List of active chat rooms with users*/}
                    <ScrollArea className="flex-1">
                        {chatrooms.map((chatroom) => (
                            <div 
                            key={chatroom.id} 
                            className="flex items-center gap-3 px-4 py-2 hover:bg-accent hover:text-black"
                            onClick={() => setSelectedChatroomId(chatroom.id)}
                            >
                                <Avatar>
                                    <User className="content-center justify-center h-auto w-auto" />
                                </Avatar>
                                <span>{chatroom.name}</span>
                                </div>
                        ))}
                        </ScrollArea>
                    </Card>

                    {/*Active chat rooms with current user*/}
                    <div className="flex-1 flex flex-col text-base">
                        <CardHeader className="border-b">
                            <CardTitle>Chatroom</CardTitle>
                            {/*CHANGE TO ELECTED USER TO CHAT */}
                        </CardHeader>
                        <ScrollArea className="flex-1 p-4">
                            {messages.map((message, index) => (
                                <div key={message.id} className="mb-4 last:mb-0">
                                    <div className="flex items-center gap-2 mb-1">

                                    <Avatar>
                                        <User className="content-center justify-center h-auto w-auto" />
                                    </Avatar>

                                    <span className="font-semibold">{message.user}</span>
                                    <span className="text-sm text-muted-foreground">{formatTimestamp(message.timestamp)}</span>
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