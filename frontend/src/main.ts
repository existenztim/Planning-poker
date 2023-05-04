import './style.scss'
import './user'
import { socket } from './socket.ts'
import showTasks from './showTasks.ts'
import { taskSetup } from './selectTask'
//import { socket } from './socket.ts'
//import showTasks from './showTasks.ts'
import createTasks from './createTasks.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */`
  <div>
   <p>You can freely remove everything in this div 😁</p>
  </div>
`
taskSetup();
//showTasks();
createTasks ();
