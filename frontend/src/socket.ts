import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import type { User } from './models/userModel';

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
    console.log(user);
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
