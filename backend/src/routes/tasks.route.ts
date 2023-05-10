import error from '../middlewares/error.middleware';
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
tasksRouter.delete('/delete/', async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete({ _id: req.body.dataId });
    if(deleteTask)
    {res.send(`Task ${req.body.dataId} deleted`);}
    else
    {res.send(`Task not found`);}
  }  
  catch(error) {
    console.log(error);
  }
});

export default tasksRouter;