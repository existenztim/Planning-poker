import { Router } from 'express';
import { addVote } from '../controllers/vote.controller';

const voteRouter = Router();

voteRouter.post('/', addVote);

export default voteRouter;
