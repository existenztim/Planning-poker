class Task {
  title: string;
  description: string;
      
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}

//this function will instead make a fetch in the future
export const taskSetup = () => {

  const templateTaskList: Task[] = [
    {
      title: "Task 1",
      description: "Task 1 description",
    },
    {
      title: "Task 2",
      description: "Task 2 description",
    },
    {
      title: "Task 3",
      description: "Task 3 description",
    }
  ]
  printTasks(templateTaskList);
}

const printTasks = (list:Task[]) => {
  const body = document.querySelector<HTMLDivElement>('#app');
  const taskContainer = document.createElement("div");
  
  list.map(task => {
    taskContainer.innerHTML += /*html */`
    <div id=${task.title}>
        <ul>
            <li>${task.title}</li>
            <li>${task.description}</li>
        </ul>
        <input type="checkbox" id="scales" name="addTask">
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

const  initSessionBtnEvent = () => {
  const initSessionBtn = document.getElementById("initSessionBtn")as HTMLButtonElement || null;
  if(initSessionBtn) {
    initSessionBtn.addEventListener("click", () => {
      console.log("hey");
    })
  }
}