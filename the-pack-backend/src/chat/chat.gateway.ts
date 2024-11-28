import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
  

@WebSocketGateway(3002, {
    cors: {
        origin: process.env.NODE_ENV === 'production'
        ? 'ADD HOSTING WEBSITE HERE'
        : 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    // Handle client connection
    handleConnection(client: Socket) {
      console.log('User connected:', client.id);
    }
  
    // Handle client disconnection
    handleDisconnect(client: Socket) {
      console.log('User disconnected:', client.id);
    }
  
    // Join room event
    @SubscribeMessage('join_room')
    handleJoinRoom(client: Socket, { roomId, username }: { roomId: string; username: string }) {
      console.log(`${username} joined room ${roomId}`);
      client.join(roomId);
    }
  
    // Send message event
    @SubscribeMessage('send_message')
    handleSendMessage(client: Socket, { roomId, message }: { roomId: string; message: string }) {
      console.log(`Message in room ${roomId}: ${message}`);
      this.server.to(roomId).emit('newMessage', { username: client.id, message });
    }

    //Receive message event
    @SubscribeMessage('receive_message')
    handleReceiveMessage(client: Socket, { roomId, message }: { roomId: string; message: string }) {
        console.log(`Message in room ${roomId}: ${message}`);
        this.server.to(roomId).emit('newMessage', { username: client.id, message });
    }

    //Create room event
    @SubscribeMessage('create_room')
    handleCreateRoom(client: Socket, { roomId, username }: { roomId: string; username: string }) {
        console.log(`${username} created room ${roomId}`);
        client.join(roomId);
    }
}