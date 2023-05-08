import asyncHandler from 'express-async-handler';
import { UserList, handleAddVote } from '../selectTaskSocket';
import type IUser from '../models/userListModel';

interface Body {
  user: IUser;
  vote: string;
}
interface IRequest<T> {
  body: T;
}

export const addVote = asyncHandler(async (req: IRequest<Body>, res) => {
  if (req.body) {
    console.log(req.body);
    handleAddVote(req.body.user, req.body.vote);
    res.status(200).json({ success: true, message: 'Vote registered' });
  } else {
    res.status(400);
    throw new Error('No body specified');
  }
});

export const getUserSessions = asyncHandler(async (req, res) => {
  res.status(200).json(UserList);
});
