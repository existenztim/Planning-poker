import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import type { Task } from "../models/taskModel"
import sessionVue from "./sessionVue";
//import {renderCards} from '../modules/sessionVue'

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
  <button id="save-task-btn">Spara</button>
    <p id="create-task-feedback"></p>`
  
    container.append(taskForm);
    const saveButton = document.querySelector('#save-task-btn') as HTMLButtonElement;
    const titleField = document.querySelector('#title') as HTMLInputElement;
    const descriptionField = document.querySelector('#description') as HTMLInputElement;
    //const pointsField = document.querySelector('#points') as HTMLSelectElement;
    const createTaskFeedback = document.querySelector('#create-task-feedback') as HTMLParagraphElement;
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const task = {
        title: titleField.value, 
        description: descriptionField.value, 
        points: null
      }
      fetch('http://localhost:5050/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(res => res.json())
        .then(data => {
          alert(`Din uppgift "${data.title}" har sparats!`);
          
        }).catch(err => {
          createTaskFeedback.innerHTML = "Något gick fel:" + err;
        })
      renderTempAdminPage();
    })
    taskSetup();
  }
  const taskSetup = async () => {
    try {
      const response = await fetch(`${socketURL}/api/tasks`);
      const tasks = await response.json();
      const templateTaskList: Task[] = tasks
      printTasks(templateTaskList);
    } catch (error) {
      console.log(error);
    }
  }
  
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
          <label for="addTask">Lägg till i omröstning</label>
          <button id="delete-${task._id} "data-id="${task._id}">Ta bort uppgift</button>   
      </div>
      `
    })
  
    taskContainer.innerHTML += /*html*/`
    <button id="initSessionBtn">Starta session</button>
    `
    body?.appendChild(taskContainer);
    initSessionBtnEvent();
    deleteTaskEvent();
  }
  
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
        emitSession(sessionList);
      })
      
    }
  }

  const deleteTaskEvent = () => {
    const deleteBtns = document.querySelectorAll('button[id^="delete"]');

    deleteBtns.forEach((button) => {
      const dataId = (button as HTMLButtonElement).dataset.id as string;

      button.addEventListener("click", () => {

        fetch(`${socketURL}/api/tasks/delete/`, {
          method: "DELETE",
          body: JSON.stringify({dataId}),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            alert(`Uppgiften har tagits bort!`);
            console.log(res);
          })
          .catch((err) => {
            alert("Något gick fel:" + err);
          });
        renderTempAdminPage();
      })
    })
  }

  const socket = io(socketURL);
  const emitSession = (tasks:Task[]) => {
    socket.emit("send sessionList", tasks);
    alert("Tasks har lagts till i din Planning poker session!");
    //displayVotingTasks(); <--- behöver kalla på en funktion här
  }
  createTasks();
}
