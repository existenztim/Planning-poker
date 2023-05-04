import { error, log } from 'console';
import { Router } from 'express';
import Task from '../models/TasksModel';

const tasksRouter = Router();

tasksRouter.get('/',async (req, res) => {
  const tasks = await Task.find({})
  res.send(tasks)
    
})

tasksRouter.post('/add', async (req, res) => {
  try{
    const newTask = {title: req.body.title, description: req.body.description, points: req.body.points}
    //console.log(newTask);
    const saveTask = await Task.create(newTask)
    console.log(saveTask);
    
    //res.send(saveTask);
        
  }catch {
    console.log(error);
        
  }
});

export default tasksRouter;