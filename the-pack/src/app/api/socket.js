import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'node:http';
import axios from 'axios';



const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'ADD HOSTING WEBSITE HERE' : 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatrooms = await axios.get('http://localhost:3001/chatroom').then((res) => res.data);
setInterval(async () => {
  try {
    const updatedChatrooms = await axios.get('http://localhost:3001/chatroom').then((res) => res.data);
    chatrooms.length = 0;
    chatrooms.push(...updatedChatrooms);
    console.log('Chatrooms updated');
  } catch (error) {
    console.error('Error updating chatrooms:', error);
  }
}, 60000); // Refresh every 60 seconds



socket.on('joinChatroom', async (chatroomId) => {
  const user = getUserFromSocket(socket);
  if (!user) {
    emitError(socket, 'User not authenticated', 'AUTH_ERROR');
    return;
  }

  const chatrooms = await getChatroomData();
  const chatroom = chatrooms.find((room) => room.id === chatroomId);

  if (!chatroom) {
    emitError(socket, 'Chatroom not found', 'CHATROOM_NOT_FOUND');
    return;
  }

  if (isUserInChatroom(user.id, chatroomId)) {
    socket.join(chatroomId);
    console.log(`User ${user.id} joined chatroom ${chatroomId}`);
  } else {
    emitError(socket, 'You are not authorized to join this chatroom', 'UNAUTHORIZED');
  }
});

// Gets user from socket
function getUserFromSocket(socket) {
  // Retrieve user from the socket's metadata or session
  return { id: socket.userId, role: 'client' };  // Example return value
}

// Checking if the user is in the chatroom
function isUserInChatroom(userId, chatroomId) {
  // To check if user is in the chatroom
  const chatroom = chatrooms.find((room) => room.id === chatroomId);
  return chatroom && chatroom.users.includes(userId);
}

io.on('connection', (socket) => {

  console.log('A user connected:', socket.id);

  // Broadcast new messages to all clients in the chatroom
  socket.on('sendMessage', (messageData) => {
    io.to(messageData.chatroomId).emit('receiveMessage', messageData);
  });

  // Handling joinChatroom event
  socket.on('joinChatroom', (chatroomId) => {
    const user = getUserFromSocket(socket);
    if (!user) {
      socket.emit('error', 'User not authenticated');
      return;
    }

    const chatroom = chatrooms.find((room) => room.id === chatroomId);
    if (!chatroom) {
      socket.emit('error', 'Chatroom not found');
      return;
    }

    if (isUserInChatroom(user.id, chatroomId)) {
      socket.join(chatroomId);
      console.log(`User ${user.id} joined chatroom ${chatroomId}`);
    } else {
      socket.emit('error', 'You are not authorized to join this chatroom');
    }
});


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});


server.listen(3002, () => {
  console.log('Socket.IO server is running on port 3002');
});
