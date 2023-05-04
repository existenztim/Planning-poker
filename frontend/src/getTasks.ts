import { socket } from "./socket";

export default function getTasks() {
  const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;
  console.log(table);

  socket.on('getList', (list) => {
    //console.log(fejklist);
    list.map(item => {
      console.log(item.title);
      const tr = document.createElement('tr');
      const titleTd = document.createElement('td');
      titleTd.innerText = item.title;
      const descriptionTd = document.createElement('td');
      descriptionTd.innerText = item.description;

      table.append(tr);
      tr.append(titleTd, descriptionTd);
    });
  });
}