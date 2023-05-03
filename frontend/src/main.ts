import './style.css'
import { testing123 } from './selectTask'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html */`
  <div>
   <p>hey</p>
  </div>
`
testing123();
