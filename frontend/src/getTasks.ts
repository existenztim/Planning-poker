import { socket } from "./socket";

export default function getTasks() {
  const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;
  //console.log(table);

  socket.on('getList', (list) => {
    //console.log(list);
    let count = 0
    list.map(item => {
      //console.log(item.title);
      const tr = document.createElement('tr');
      tr.id = `tr-${count}`;
      count++;

      const titleTd = document.createElement('td');
      titleTd.innerText = item.title;
      const descriptionTd = document.createElement('td');
      descriptionTd.innerText = item.description;
      

      table.append(tr);
      tr.append(titleTd, descriptionTd);

      tr.addEventListener('click', (e) => {
        //console.log(e.currentTarget);
        
      })
    });
  });
}