/* eslint-disable no-console */
import type { Socket, Server } from 'socket.io';
import { io } from './index';
import type IUser from './models/userListModel';

interface Props {
  user: IUser;
  vote: string;
}

export const UserList: IUser[] = [];
export const VoteList: Props[] = [];

const findNearestFibonacci = (value: number) => {
  if (value === 0) {
    return 0;
  }

  let first = 0;
  let second = 1;
  let third = first + second;

  while (third <= value) {
    first = second;
    second = third;
    third = first + second;
  }

  const answer = Math.abs(third - value) >= Math.abs(second - value) ? second : third;
  return answer;
};

const calculateAverage = () => {
  let value = 0;
  let entries = 0;
  for (const entry of VoteList) {
    value += Number(entry.vote);
    entries++;
  }

  return findNearestFibonacci(value / entries);
};

export const handleAddVote = (user: IUser, vote: string) => {
  VoteList.push({ user, vote });

  if (UserList.length === VoteList.length) {
    // Everyone has voted
    const average = calculateAverage();
    io.emit('flipCards', VoteList, average);
    VoteList.splice(0, VoteList.length);
  }
};

export const handleSession = (io: Server) => {
  io.on('connection', function (socket: Socket) {
    console.log('new session socket: ', socket.id);
    socket.on('send sessionList', (list) => {
      //console.log(list);
      //fortsätt här...

      io.emit('getTaskList', list);
    });

    socket.on('sendUser', (user: IUser) => {
      //console.log(user);
      user.status = 'connected';
      if (UserList.find((item) => item.username === user.username)) {
        const connectedUser = UserList.find((item) => item.username === user.username);
        if (connectedUser) {
          connectedUser.status = 'connected';
          io.emit('userList', UserList);
        }
      } else {
        console.log('User does not exist in server, adding!');
        UserList.push(user);
        io.emit('userList', UserList);
      }
      //console.log('sendUser', UserList);
    });
    socket.on('localStorageUser', (loggedInUser: IUser) => {
      const user = UserList.find((user) => user.username === loggedInUser.username);

      if (!user) {
        loggedInUser.status = 'connected';
        UserList.push(loggedInUser);
        console.log('användaren finns redan');
      }

      //console.log('localstorage', UserList);

      io.emit('userList', UserList);
    });

    socket.on('disconnectUser', (loggedOutUser) => {
      const disconnectedUser = UserList.find((user) => user.username === loggedOutUser.username);
      console.log(disconnectedUser, 'disconnect');

      if (disconnectedUser) {
        disconnectedUser.status = 'disconnected';
        console.log();
        disconnectedUser;
      }
      //const connectedUsers = UserList.filter(user => user.status === 'connected')
      io.emit('userList', UserList);
    });
  });
};
