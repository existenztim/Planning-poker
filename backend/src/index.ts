import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import type { Socket } from 'socket.io';
import { Server } from 'socket.io';
import * as http from 'http';
import connectDB from './config/database';
import tasksRouter from './routes/tasks.route';
import { handleSession } from './selectTaskSocket';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// async function init (){
//   await mongoose.connect(process.env.MONGO_URI)
//     .then (() => console.log('databasen är igång'));
// }
// init ();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/tasks', tasksRouter);

// app.get('/ping', (req, res) => {
//   res.send('Hello World');
// });
//const tasks : any[] = [];

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
  
  // socket.on('createTask', ({title, description, points}) => {
  //   //console.log(title,description,points);
  //   const newTask : object = {title, description, points}
  //   //console.log(newTask);
  //   tasks.push(newTask);
  //   console.log(tasks);
    
  //   io.emit('tasks', tasks);
    
    
  //})
  //app.locals.socketIo = io;
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT}`);
  connectDB();
});
