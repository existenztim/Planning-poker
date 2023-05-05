
import type { Socket, Server } from 'socket.io';
/* eslint-disable no-console */
export const handleSession = (io: Server) => {
  const userList : Array<string | number | boolean> = [];

  io.on('connection', function(socket: Socket) {
    console.log("new session socket: ",socket.id);
          
    socket.on('send sessionList', (list) => {
      //console.log(list);
      //fortsätt här...

      io.emit('getList', (list))
    });

    socket.on('sendUser', (user) => {
      console.log(user);

      userList.push(user)
      console.log(userList);
      
      io.emit('userList', userList)
      
    })
        
  })
}