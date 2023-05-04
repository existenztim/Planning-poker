import type { Request } from 'express';

export interface IRequest<T> extends Request {
  body: T;
}

export interface Vote {
  userId: string;
  score: string;
}
