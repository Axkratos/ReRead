import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js';
import messageRouter from './routes/message.route.js'; // Import your message router

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/message', messageRouter); // Use your message router

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', async (data) => {
    try {
      // Extract sellerName from the message data
      const { sellerName } = data;

      // Emit the message to a room specific to the sellerName
      io.to(sellerName).emit('message', data);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { app, server };
