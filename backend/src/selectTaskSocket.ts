import type { Socket, Server } from 'socket.io';
/* eslint-disable no-console */
export const UserList: Array<string | number | boolean> = [];

export const handleSession = (io: Server) => {
  io.on('connection', function (socket: Socket) {
    console.log('new session socket: ', socket.id);

    socket.on('send sessionList', (list) => {
      //console.log(list);
      //fortsätt här...

      io.emit('getList', list);
    });

    socket.on('sendUser', (user) => {
      console.log(user);

      UserList.push(user);
      console.log(UserList);

      io.emit('userList', UserList);
    });
  });
};
