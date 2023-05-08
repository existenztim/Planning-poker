import { Router } from 'express';
import { addVote, getUserSessions } from '../controllers/vote.controller';

const voteRouter = Router();

voteRouter.post('/send', addVote);
voteRouter.get('/sessions', getUserSessions);

export default voteRouter;
