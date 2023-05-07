/* eslint-disable no-console */
import type { Socket, Server } from 'socket.io';
import type { User } from './controllers/vote.controller';
import { io } from './index';

interface Props {
  user: User;
  vote: string;
}

export const UserList: User[] = [];
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

export const handleAddVote = (user: User, vote: string) => {
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

      io.emit('getList', list);
    });

    socket.on('sendUser', (user: User) => {
      console.log(user);

      UserList.push(user);
      console.log(UserList);

      io.emit('userList', UserList);
    });
  });
};
