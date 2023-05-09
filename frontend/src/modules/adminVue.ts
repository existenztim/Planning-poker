import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import type { Task } from "../models/taskModel"
import sessionVue from "./sessionVue";
const socketURL ="http://localhost:5050";

export default function renderTempAdminPage () {
  const container = document.querySelector('#app');
  if (container !==null){
    container.innerHTML = '';
  }

  const createTasks = () => {
    const container : HTMLElement = document.querySelector('#app') as HTMLElement;
    //container.innerHTML = '';
  
    const taskForm : HTMLFormElement = document.createElement('form');
  
    taskForm.innerHTML = /*html */`
    <label for="title">Uppgift</label>
    <input type="text" id="title" name="title">
    <label for="description">Beskrivning</label>
    <textarea id="description" name="description"></textarea>
    <label for = "points">Poäng</label>
    <select name="points" id="points">
      <option value=null>Välj</option>
      <option value=1>Tiny 1SP</option>
      <option value=3>Small 3SP</option>
      <option value=5>Medium 5SP</option>
      <option value=8>Large 8 SP</option>
    </select>
  <button id="save-task-btn">Spara</button>`
  
    container.append(taskForm);
    const saveButton :HTMLButtonElement = document.querySelector('#save-task-btn') as HTMLButtonElement;
    const titleField :HTMLInputElement = document.querySelector('#title') as HTMLInputElement;
    const descriptionField :HTMLInputElement = document.querySelector('#description') as HTMLInputElement;
    const pointsField :HTMLSelectElement = document.querySelector('#points') as HTMLSelectElement;
    //console.log(saveButton, titleField, descriptionField, pointsField);
  
    saveButton.addEventListener('click', () => {
      const task = {title: titleField.value, description: descriptionField.value, points: pointsField.value}
      //console.log(titleField.value, descriptionField.value, pointsField.value);
      
  
      fetch('http://localhost:5050/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          
        })
      //showTasks();
      taskSetup();
    })
    taskSetup();
  }
  const taskSetup = async () => {
    try {
      const response = await fetch(`${socketURL}/api/tasks`);
      const tasks = await response.json();
      const templateTaskList: Task[] = tasks
      console.log("Fetched list: ",templateTaskList);
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
    taskContainer.classList.add("select-task-container");
  
    list.map(task => {
      taskContainer.innerHTML += /*html */`
      <div id="task:${task._id}" class="task-item">
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
            sessionVue();
          } 
        });
        console.log("Session list: ",sessionList);
        emitSession(sessionList);
      })
      
    }
  }
  
  /**
   *Emits sessionList to backend using socket.io
   */
  
  const emitSession = (tasks:Task[]) => {
    const socket = io(socketURL);
    socket.emit("send sessionList", tasks);
    alert("Tasks have been sent for a planning poker session!");
    //displayVotingTasks(); <--- behöver kalla på en funktion här
  }
  createTasks();
}
