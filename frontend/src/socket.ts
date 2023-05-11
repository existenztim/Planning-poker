import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import type { User } from './models/userModel';
import type { Task } from './models/taskModel';
import { checkUser } from './modules/user';
//import sessionVue from './modules/sessionVue';
//import { getUser } from './utils/getUser';


const URL = 'http://localhost:5050';
export const socket = io(URL);


interface Props {
  user: User;
  vote: string;
}


socket.on('flipCards', (data: Props[], average: number) => {
  const cardElements = document.querySelector('.voting-card-container') as HTMLDivElement;

  for (const vote of data) {
    const card = document.querySelector(`[user-id="${vote.user._id}"`) as HTMLDivElement;
    card.innerHTML = `<p>${vote.user.username} röstade på ${vote.vote}</p>`;
  }

  const votingContainer = document.querySelector('.voting-div') as HTMLDivElement;
  const averageScoreElement = document.createElement('p');
  averageScoreElement.innerHTML = `Medel-röstvärde: ${String(average)}`;

  votingContainer.appendChild(averageScoreElement);
});

socket.on('finished List', (list:Task[]) => {
  const table = document.querySelector('.done-tasks') as HTMLTableElement;
  

  let count = 0;
  list.map((item) => {
    const tr = document.createElement('tr');
    tr.id = `tr-${count}`;
    count++;

    const titleTd = document.createElement('td');
    titleTd.innerText = item.title;
    const descriptionTd = document.createElement('td');
    descriptionTd.innerText = item.description;

    table.append(tr);
    tr.append(titleTd, descriptionTd);

    
    // tr.addEventListener('click', (e) => {
    //   console.log(e.currentTarget);
    // });
  });
 
  socket.on('restartVoting', (UserList: User[]) => {
    checkUser();
    console.log('restartVoting', UserList);
    
  })
})