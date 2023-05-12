import { Schema, model } from 'mongoose';
import Task from './TasksModel';

const ResultatSchema = new Schema({
  sprint: [Task.schema]
});

const Result = model('VoteResult', ResultatSchema);

export default Result;

