import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import type { Task } from "./models/taskModel"
/* eslint-disable no-console */
const socketURL ="http://localhost:5050";

export const taskSetup = async () => {
  try {
    const response = await fetch(`${socketURL}/api/tasks`);
    const tasks = await response.json();
    console.log(tasks);
    const templateTaskList: Task[] = tasks
    console.log("Template/fetched list: ",templateTaskList);
    printTasks(templateTaskList);
  } catch (error) {
    console.log(error);
  }
}

/**
 * This will print the tasks from fetch 
 */

const printTasks = (list:Task[]) => {
  const body = document.querySelector<HTMLDivElement>('#app');
  const taskContainer = document.createElement("div");
  
  list.map(task => {
    taskContainer.innerHTML += /*html */`
    <div id="task:${task._id}">
        <ul>
            <li>${task.title}</li>
            <li>${task.description}</li>
        </ul>
        <input type="checkbox" id="checkbox:${task.title}" name="addTask" 
        data-id="
        ${task._id},
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
  const initSessionBtn = document.getElementById("initSessionBtn");
  if(initSessionBtn) {
    initSessionBtn.addEventListener("click", () => {
      const sessionList: Task[] = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

      checkboxes.forEach((checkbox) => {
        if (checkbox) {
          const dataId = (checkbox as HTMLInputElement).dataset.id as string;
          const dataIdValues = dataId.split(',');
          
          const task = {
            _id: dataIdValues[0].trim(), //trim to remove whitespace
            title: dataIdValues[1].trim(),
            description: dataIdValues[2].trim(),
            points: null
          }
          sessionList.push(task);
          
        } 
      });
      console.log("Session list: ",sessionList);
      emitSession(sessionList);
    })
  }
}

/**
 *Emit sessionList to backend using socket.io
 */

const emitSession = (tasks:Task[]) => {
  const socket = io(socketURL);
  socket.emit("send sessionList", tasks);
  //displayVotingTasks(); <--- behöver kalla på en funktion här
}
