import type { Socket, Server } from 'socket.io';
import IUser from './models/userListModel';
import User from './models/UserModel';
/* eslint-disable no-console */
export const handleSession = (io: Server) => {
  let userList : IUser [] = [];

  io.on('connection', function(socket: Socket) {
    console.log("new session socket: ",socket.id);
          
    socket.on('send sessionList', (list) => {
      //console.log(list);
      //fortsätt här...

      io.emit('getList', (list))
    });

    socket.on('sendUser', (user) => {
      //console.log(user);

      userList.push(user)
      //console.log(userList);
      
      io.emit('userList', userList)
      
    })
    socket.on('localStorageUser', (loggedInUser) => {
      userList.push(loggedInUser);
      //console.log(loggedInUser);
      
      io.emit('userList', userList)
      console.log(userList);
      
    })  
    
    // socket.on('disconnect', () => {
    //   const disconnectedUser = userList.find(u => u.username === u.username)
    //   if (disconnectedUser) {
    //     const userIndex = userList.indexOf(disconnectedUser);
    //     userList.splice(userIndex, 1);
    //     console.log('någon har lämnat', userList);
    //   }
      
    // })
  })
}