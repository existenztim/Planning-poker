/* eslint-disable no-console */
import express from 'express';
import type { Socket, Server } from 'socket.io';
import { io } from './index';
import type IUser from './models/userListModel';
import type { newTask } from './models/TasksInterface';
import Result from './models/ResultModel';

import { Router } from 'express';
//import Result from '../models/ResultModel';

const resultRouter = Router();

resultRouter.get('/',async (req, res) => {
  const results = await Result.find({})
  res.send(results)
      
})

interface Props {
  user: IUser;
  vote: string;
}

export const finishedList: newTask[] = [];
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
      try {
        io.emit('getTaskList', list);
        io.emit('userList', UserList)
      } catch (error) {
        console.log('error in send SessionList', error);
        
      }
      
    });

    socket.on('sendUser', (user :IUser) => {
      try {
        user.status = 'connected';
        const connectedUser = UserList.find((item) => item.username === user.username);
        if (connectedUser) {
          console.log('User is in session, reconnecting');

          connectedUser.status = 'connected';
          io.emit('userList', UserList);
        } else {
          console.log('User does not exist in server, adding!');
          UserList.push(user);
          io.emit('userList', UserList);
        }
      //console.log('sendUser', UserList);
      }catch (error) {
        console.log('error in sendUser', error);
        
      }
      
    });

    socket.on('localStorageUser', (loggedInUser: IUser) => {
      try   {
        const user = UserList.find((user) => user.username === loggedInUser.username);

        if (!user) {
          loggedInUser.status = 'connected';
          UserList.push(loggedInUser);
          console.log('användaren finns redan');
        }
        io.emit('userList', UserList);

      }catch (error) {
        console.log('error in localStorageUser', error);  
      }
    });

    socket.on('removeUser', (username: string) => {
      try {
        const user = UserList.find(user => user.username === username) 
        if (user != undefined) {
          user.status = 'removed';
        }
        //console.log('sendUser', UserList)
        io.emit('userList', UserList);
        //console.log(error, 'error adding user on sendUser');
      
      } catch (error) {
        console.log('error i removeUser', error);
        
      }
      
    });

    socket.on('disconnectUser', (loggedOutUser) => {
      try {
        const disconnectedUser = UserList.find((user) => user.username === loggedOutUser.username);
        console.log(disconnectedUser, 'disconnect');

        if (disconnectedUser) {
          disconnectedUser.status = 'disconnected';
          console.log();
          disconnectedUser;
        }
        //const connectedUsers = UserList.filter(user => user.status === 'connected')
        io.emit('userList', UserList);
      } catch (error) {
        console.log('error disconnecting user', error);
      }
    });

    socket.on('send finishedList', (listItem) => {
      try {
        finishedList.push(listItem);
        console.log('finished list', finishedList);
        io.emit('finished List', finishedList);
        
      }catch (error) {
        console.log('error in send FinishedList', error);
      }
    });
    
    socket.on('finishVoting', async () => {
      try {
        const result = new Result({ sprint: finishedList });
        const savedResult = await result.save();
        console.log('Resultat sparad i databasen:', savedResult);
        finishedList.splice(0, finishedList.length);
        io.emit('restartVoting', UserList);
        //console.log('Alla resultat sparade i databasen');

      } catch (error) {
        console.log('error in finishVoting', error);
      }
    });
    
  });
};
