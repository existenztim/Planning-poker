import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
// import type { Socket } from 'socket.io';
// import { Server } from 'socket.io';
import * as http from 'http';
import connectDB from './config/database';
import userRoute from './routes/user.route';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoute);

// app.get('/ping', (req, res) => {
//   res.send('Hello World');
// });

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket: Socket) => {
//   socket.on('chat', (arg: ClientChatMessage) => {
//     handleChatEvent(arg, io);
//   });
//   app.locals.socketIo = io;
// });

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT}`);
  connectDB();
});
