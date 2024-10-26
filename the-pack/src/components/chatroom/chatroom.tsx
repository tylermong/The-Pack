'use client'

import React from 'react';
import { Send, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Message {
    id: number
    user: string
    content: string
    timestamp: string
}
  
interface ChatUser {
    id: number
    name: string
    avatar: string
}

const initialMessages: Message[] = [
    { id: 1, user: "User#1", content: "Testing testing testing!", timestamp: new Date().toLocaleTimeString() },
]

const users: ChatUser[] = [
    { id: 1, name: "User #1", avatar: "#1" },
]

const Chatroom = () =>{
    const [messages, setMessages] = React.useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = React.useState("")
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    const handleSendMessage = (e:React.FormEvent) => {
        e.preventDefault()

        if(newMessage.trim()){
            const message: Message = {
                id: messages.length + 1,
                user: "You",
                content: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            }
            setMessages([...messages, message])
            setNewMessage("")
        }
    }

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, [messages])


    return(
        <div className="flex h-screen">
            <div className="flex flex-1 overflow-hidden text-sm">
                <Card className="w-64 flex-none border-r rounded-none bg-black text-white">
                    <CardHeader>
                        <CardTitle>Inbox</CardTitle>
                    </CardHeader>

                    <ScrollArea className="flex-1">
                        {users.map((user) => (
                            <div key={user.id} className="flex items-center gap-3 px-4 py-2 hover:bg-accent">
                                <Avatar>
                                    <AvatarFallback>{user.avatar}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                                </div>
                        ))}
                        </ScrollArea>
                    </Card>

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
                                        <AvatarFallback>{message.user[0]}</AvatarFallback>
                                    </Avatar>

                                    <span className="font-semibold">{message.user}</span>
                                    <span className="text-sm text-muted-foreground">{message.timestamp}</span>
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
                                    className="flex-1"
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