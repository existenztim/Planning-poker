class Task {
  id: string;
  title: string;
  description: string;
      
  constructor(id: string ,title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

//this function will instead make a fetch in the future
export const taskSetup = () => {

  const templateTaskList: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Task 2 description",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Task 3 description",
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
        <input type="checkbox" id="checkbox:${task.title}" name="addTask">
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
      const taskDivs = document.querySelectorAll('[id^="task"]');
      
      checkboxes.forEach((checkbox, i) => {
        if (checkbox) {
          const taskDiv = taskDivs[i];
          const title = taskDiv.querySelector('li:first-child')?.innerHTML as string;
          const description = taskDiv.querySelector('li:last-child')?.innerHTML as string;
          const taskId = taskDiv.id.replace('task:', '');

          const task = {
            id: taskId,
            title,
            description
          }
          sessionList.push(task);
        }
      });
      console.log("Session list: ",sessionList);
    })
  }
}