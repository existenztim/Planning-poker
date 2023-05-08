import type { User } from '../models/userModel';

export const getUser = (): User => {
  return JSON.parse(localStorage.getItem('userData')!);
};
