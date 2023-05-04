import { Router } from 'express';

const userRouter = Router();

import User from '../models/UserModel';
import CryptoJS from "crypto-js";
import { error } from 'console';


userRouter.post('/add', async (req, res) => {
  try {
    const user = await User.create(req.body)
    const passwordToSave = CryptoJS.SHA3(req.body.password).toString()
    user.password = passwordToSave;
    await user.save()
    res.status(201).json({username:user.username, _id:user._id, admin:user.admin})
  } catch (error){
    console.log(error)
    res.status(400).end()
  }
});
//userRouter.post('/add', addUser);

export default userRouter;
