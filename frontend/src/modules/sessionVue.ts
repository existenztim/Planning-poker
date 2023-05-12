/* eslint-disable no-console */
import { averageScore, socket } from '../socket.ts';
import renderTempAdminPage from './adminVue.ts';
import type { Task } from '../models/taskModel.ts';
import type { User } from '../models/userModel.ts';
import { getUser } from '../utils/getUser.ts';
import { adminDeliteLogedoutUser } from './adminVue.ts';
import { checkUser } from './user.ts';

const socketURL = 'http://localhost:5050';

export default function sessionVue() {
  let toggleView = true;
  const userData = JSON.parse(localStorage.getItem('userData') as string);

  /**Creates basic html-structure */
  const printAppHtml = () => {
    const container: HTMLElement = document.querySelector('#app') as HTMLElement;
    // eslint-disable-next-line no-console
    container.innerHTML = '';

    const votingPageContainer: HTMLDivElement = document.createElement('div');
    votingPageContainer.classList.add('votingpage');

    const todoTaskDiv: HTMLDivElement = document.createElement('div');
    todoTaskDiv.classList.add('todo-div');
    todoTaskDiv.innerText = 'Kommande röstningar';

    const votingContainer: HTMLDivElement = document.createElement('div');
    votingContainer.classList.add('voting-div');

    const todoTaskList: HTMLTableElement = document.createElement('table');
    todoTaskList.classList.add('todo-list');

    const displayVoteTask: HTMLDivElement = document.createElement('div');
    displayVoteTask.classList.add('voting-header');
    displayVoteTask.innerText = 'Väntar på omröstning...'

    const voteCardsContainer: HTMLDivElement = document.createElement('div');
    voteCardsContainer.classList.add('voting-card-container');

    const doneTasksDiv: HTMLDivElement = document.createElement('div');
    doneTasksDiv.classList.add('done-div');
    doneTasksDiv.innerText = 'Avslutade omröstningar';

    const doneTasksList: HTMLTableElement = document.createElement('table');
    doneTasksList.classList.add('done-tasks');

    const finishVotingBtn: HTMLButtonElement = document.createElement('button');
    finishVotingBtn.innerText = 'Avsluta sessionen';

    container.appendChild(votingPageContainer);

    votingPageContainer.append(todoTaskDiv, votingContainer, doneTasksDiv);

    todoTaskDiv.appendChild(todoTaskList);

    votingContainer.append(displayVoteTask, voteCardsContainer);

    doneTasksDiv.append(doneTasksList, finishVotingBtn);

    printHeaderHtml();

    finishVotingBtn.addEventListener('click', () => {
      console.log('klickade på avsluta omröstning');
      socket.emit('finishVoting');
    });
  };

  /*
   * Admin delete cards when a user LogOut.
   */

  function adminDeliteLogedoutUser(username: string) {
    socket.emit('removeUser', username);
  }

  const renderCards = () => {
    socket.on('userList', (UserList: User[]) => {
      const votingCardContainer: HTMLDivElement = document.querySelector('.voting-card-container') as HTMLDivElement;
      votingCardContainer.innerHTML = '';
      //console.log('Receiving update on users in session from server', UserList);

      const loggedInUser = getUser();
      let userHasCard = false;

      UserList.map((user) => {
        if (user.status == 'removed') {
          return;
        }

        if (user._id === loggedInUser._id) {
          if (!userHasCard) {
            const selectContainer = document.createElement('div');
            selectContainer.classList.add('voting-card-div');
            selectContainer.setAttribute('user-id', loggedInUser._id);
            const selectHTML =
              /*html */
              `
           <p>Rösta:</p>
      <select name="points" id="points">
        <option value=null>Välj</option>
        <option value=1>Tiny 1SP</option>
        <option value=3>Small 3SP</option>
        <option value=5>Medium 5SP</option>
        <option value=8>Large 8SP</option>
      </select>
      <button id="submitVote">Rösta</button>
    `;
            selectContainer.innerHTML = selectHTML;
            votingCardContainer.appendChild(selectContainer);

            const voteButton = document.querySelector('#submitVote') as HTMLButtonElement;
            const selectedOption = selectContainer.querySelector('#points') as HTMLSelectElement;
            voteButton.addEventListener('click', async (e) => {
              e.preventDefault();
              const response = await fetch(`${socketURL}/api/vote/send`, {
                method: 'POST',
                body: JSON.stringify({ user, vote: selectedOption.value }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.status === 200) {
                selectedOption.setAttribute('disabled', '');
                voteButton.setAttribute('disabled', '');
              }
            });
          }
          userHasCard = true;
        } else {
          const votingCard: HTMLDivElement = document.createElement('div');
          votingCard.classList.add('voting-card-div');
          votingCard.setAttribute('user-id', user._id);
          votingCard.innerText = 'Röstkort';

          votingCard.innerHTML = /*html */ `<p>${user.username} funderar</p>`;
          votingCardContainer.appendChild(votingCard);

          if (user.status === 'disconnected') {
            votingCard.innerHTML = `<p>${user.username} har lämnat omröstningen</p>`;
            const userData = JSON.parse(localStorage.getItem('userData') || '');
            adminDeliteLogedoutUser(user.username); // User som loggas ut tas bort när de diskonnectar.
            /*  if (userData!=null && userData.admin) {
              const deleteUserCardBtn: HTMLButtonElement = document.createElement('button');
              votingCard.appendChild(deleteUserCardBtn);
              deleteUserCardBtn.innerText = 'Ta bort användare';
              deleteUserCardBtn.addEventListener('click', () => {
                adminDeliteLogedoutUser(user.username);
              });
            }*/ // Om användaren ska ta bort users som är disconnectade själv.
          }
        }
      });
    });
  };

  const printHeaderHtml = () => {
    const headerContainer = document.querySelector('#header') as HTMLHeadingElement;
    const headerTag = /*html*/ `<h1>Planning Poker</h1>`;
    let adminButton = '';

    if (userData.admin) {
      adminButton = /*html*/ `<button id='adminMode'>Admin Läge</button>`;
    }

    headerContainer.innerHTML = /*html */ `
      ${headerTag}
      <div class="button-container">
        ${adminButton}
        <button id='logOut'>Logga ut</button>
      </div>
    `;

    adminBtnEvent();
    logoutBtnEvent();
  };

  const adminBtnEvent = () => {
    const adminBtn = document.getElementById('adminMode');
    adminBtn?.addEventListener('click', () => {
      if (toggleView) {
        toggleView = false; 
        adminBtn.innerText ="Sessions Läge";
        renderTempAdminPage();
      } else {
        toggleView = true; 
        adminBtn.innerText ="Admin Läge";
        sessionVue();
      }
    });
  };

  const logoutBtnEvent = () => {
    const logoutBtn = document.getElementById('logOut');
    const loggedOutUser = getUser();
    logoutBtn?.addEventListener('click', () => {
      socket.emit('disconnectUser', loggedOutUser);
      localStorage.removeItem('userData');
      location.reload();
    });
  };

  const getTasks = () => {
    socket.on('getTaskList', (list: Task[]) => {
      const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;
      table.innerHTML = '';
      //console.log(list);
      let count = 0;
      list.map((item) => {
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
      });
    });
  };

  const currentVoteTask = () => {
    const displayCurrentTask = document.querySelector('.voting-header') as HTMLDivElement;
    let nextButton = '';

    if (userData.admin) {
      nextButton = /*html*/ `<button id='nextTask'>Nästa uppgift</button>`;
    }

    socket.on('getTaskList', (list: Task[]) => {
      if (list.length >= 1) {
        displayCurrentTask.innerHTML =
          /*html*/
          `<h3>${list[0].title}</h3>
       <p>${list[0].description}</p>
       ${nextButton}
      `;
        const nextTaskBtn = document.getElementById('nextTask');
        nextTaskBtn?.addEventListener('click', () => {
          if (window.confirm('Är du säker på att du vill gå vidare till nästa omröstning?')) {
            const finishedTask = list.shift();

            const pointsOverwriteElement = document.querySelector('#overwrite-points') as HTMLSelectElement;
            const pointsOverwriteValue = pointsOverwriteElement.value;

            if (finishedTask) {
              if (pointsOverwriteValue !== 'null') {
                finishedTask.points = Number(pointsOverwriteValue);
              } else {
                finishedTask.points = averageScore;
              }
            }

            finishedTask;
            //finishedTaskList.push(finishedTask);
            socket.emit('send sessionList', list);
            socket.emit('send finishedList', finishedTask);
            //previousVoteTask();
            sessionVue();
          }
        });
      } else {
        displayCurrentTask.innerHTML = 'Sessionen är avslutad!';
      }
    });
  };
 
  printAppHtml();
  renderCards();
  getTasks();
  currentVoteTask();
}
