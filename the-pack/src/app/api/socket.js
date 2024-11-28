import { io } from 'socket.io-client';


// Create a Socket.IO client connection
const socket = io(
  process.env.NODE_ENV === 'production'
    ? 'ADD_BACKEND_PRODUCTION_URL_HERE'
    : 'http://localhost:3002',
  {
    withCredentials: false, // Include credentials for cross-origin requests if needed
    autoConnect: false, // Prevent automatic connection
  }
);

export default socket;