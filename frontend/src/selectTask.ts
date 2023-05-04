import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socketURL ="http://localhost:5050";

class Task {
  id: string;
  title: string;
  description: string;
  points: number | null;
      
  constructor(id: string ,title: string, description: string, points: number | null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.points = points;
  }
}

//this function will instead make a fetch in the future
export const taskSetup = () => {

  const templateTaskList: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
      points: null
    },
    {
      id: "2",
      title: "Task 2",
      description: "Task 2 description",
      points: null
    },
    {
      id: "3",
      title: "Task 3",
      description: "Task 3 description",
      points: null
    }
  ]
  console.log("Template/fetched list: ",templateTaskList);
  printTasks(templateTaskList);
}
/**
 * This will print the tasks from fetch 
 */
const printTasks = (list:Task[]) => {
  const body = document.querySelector<HTMLDivElement>('#app');
  const taskContainer = document.createElement("div");
  
  list.map(task => {
    taskContainer.innerHTML += /*html */`
    <div id="task:${task.id}">
        <ul>
            <li>${task.title}</li>
            <li>${task.description}</li>
        </ul>
        <input type="checkbox" id="checkbox:${task.title}" name="addTask" 
        data-id="
        ${task.id},
        ${task.title},
        ${task.description}">

        <label for="addTask">Add to voting session</label>
    </div>
    `
  })

  taskContainer.innerHTML += /*html*/`
  <button id="initSessionBtn">Start session</button>
  `
  body?.appendChild(taskContainer);
  initSessionBtnEvent();
}

/**
 * This function adds an event listener, when 
 * clicked creates an array of tasks from checked checkboxes and their associated task divs. 
 * The tasks get sent to the sessionList Array.
 */

const  initSessionBtnEvent = () => {
  const initSessionBtn = document.getElementById("initSessionBtn")as HTMLButtonElement || null;
  if(initSessionBtn) {
    initSessionBtn.addEventListener("click", () => {
      const sessionList: Task[] = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

      checkboxes.forEach((checkbox) => {
        if (checkbox) {
          const dataId = checkbox.dataset.id;
          const dataIdValues = dataId.split(',');
          
          const task = {
            id: dataIdValues[0].trim(), //trim to remove whitespace
            title: dataIdValues[1].trim(),
            description: dataIdValues[2].trim(),
            points: null
          }
          console.log(task);
          sessionList.push(task);
          
        } 
      });
      console.log("Session list: ",sessionList);
      emitSession(sessionList);
    })
  }
}

const emitSession = (tasks:Task[]) => {
  const socket = io(socketURL);
  socket.emit("send sessionList", tasks);

}