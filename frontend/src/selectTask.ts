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
  const taskTable = document.createElement("table");
  
  list.map(task => {
    taskTable.innerHTML += /*html */`
    <p>${task.title}</p>
    <p>${task.description}</p>
    `
  })

  body?.appendChild(taskTable);
}