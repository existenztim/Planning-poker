import { Router } from 'express';

const userRouter = Router();

import User from '../models/UserModel';
import CryptoJS from "crypto-js";
//import { error } from 'console';


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

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    User.find({username:username})
      .then (results => {
        for (let i = 0; i < results.length; i++) {
          const foundUser = results[i];
          //console.log(CryptoJS.SHA3(password).toString())
          if(CryptoJS.SHA3(password).toString() === foundUser.password) {
            res.json({username:foundUser.username, _id:foundUser._id, admin:foundUser.admin})
            return;
          }
        }
        res.status(401).json("Incurrect password or email")
      }) 
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
});
//userRouter.post('/add', addUser);

export default userRouter;
