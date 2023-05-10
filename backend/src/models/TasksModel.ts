import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: null,
      //required: true
    },
  }
);

const Task = model('tasks', taskSchema);

export default Task;
