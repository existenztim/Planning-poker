import asyncHandler from 'express-async-handler';

const Votes = new Map();

interface Vote {
  userId: string;
  score: string;
}

interface IRequest {
  body: Vote;
}

export const addVote = asyncHandler(async (req: IRequest, res) => {
  if (req.body) {
    console.log(req.body);
    res.status(200).json({ success: true, message: 'Vote registered' });
  } else {
    res.status(400);
    throw new Error('No body specified');
  }
});
