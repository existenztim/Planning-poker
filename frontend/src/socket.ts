import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import type { User } from './models/userModel';
import type { Task } from './models/taskModel';
//import sessionVue from './modules/sessionVue';
//import { getUser } from './utils/getUser';


const URL = 'http://localhost:5050';
export const socket = io(URL);

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

socket.on('userList', (userList: User[]) => {
  console.log('Receiving update on users in session from server', userList);
  const votingCardContainer: HTMLDivElement = document.querySelector('.voting-card-container') as HTMLDivElement;
  votingCardContainer.innerHTML = '';

  userList.map((user) => {
    const votingCard: HTMLDivElement = document.createElement('div');
    votingCard.classList.add('voting-card-div');
    votingCard.innerText = 'Röstkort';
    votingCard.innerHTML = /*html */ `<p>${user.username}s: poäng</p>
    <select name="points" id="points">
      <option value=null>Välj</option>
      <option value=1>Tiny 1SP</option>
      <option value=3>Small 3SP</option>
      <option value=5>Medium 5SP</option>
      <option value=8>Large 8 SP</option>
    </select>`;

    votingCardContainer.append(votingCard);
  });
});

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
  table.innerHTML="alla färdiga röstningar";
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
})