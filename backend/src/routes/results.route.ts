import { Router } from 'express';
import Result from '../models/ResultModel';

const resultRouter = Router();

resultRouter.get('/',async (req, res) => {
  const results = await Result.find({})
  res.send(results)
      
})

export default resultRouter;