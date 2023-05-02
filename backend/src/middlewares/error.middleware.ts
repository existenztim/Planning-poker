import { Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  res.status(res.statusCode).json({ message: err.message });
};

export default errorHandler;
