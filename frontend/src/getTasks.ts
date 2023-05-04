import { socket } from "./socket";

export default function getTasks() {
  const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;
  console.log(table);

//   socket.on('send sessionList', (list) => {
//     console.log(tasks);
//     tasks.map(task => {
//       //console.log(task.title);
//       const tr = document.createElement('tr');
//       const titleTd = document.createElement('td');
//       titleTd.innerText = task.title;
//       const descriptionTd = document.createElement('td');
//       descriptionTd.innerText = task.description;

//       table.append(tr);
//       tr.append(titleTd, descriptionTd);
//     });
//   });
}