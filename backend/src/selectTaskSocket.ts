import type { Socket, Server } from 'socket.io';
/* eslint-disable no-console */
export const handleSession = (io: Server) => {

  const fejklist = [{title: 'fejk', description: 'fejk', point: 1}]

  io.on('connection', function(socket: Socket) {
    console.log("new session socket: ",socket.id);
          
    socket.on('send sessionList', (list) => {
      console.log(list);
      //fortsätt här...

      io.emit('getList', (fejklist))
    });
        
  })
}