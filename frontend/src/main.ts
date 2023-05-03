import './style.css'
import { taskSetup } from './selectTask'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */`
  <div>
   <p>You can freely remove everything in this div 😁</p>
  </div>
`
taskSetup();
