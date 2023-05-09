/* eslint-disable no-console */
import { socket } from '../socket.ts';
import renderTempAdminPage from './adminVue.ts';
import type { Task } from '../models/taskModel.ts';
import type { User } from '../models/userModel.ts';
import { getUser } from '../utils/getUser.ts';
const socketURL ="http://localhost:5050";


export default function sessionVue() {
  let toggleView = true;
  const userData = JSON.parse(localStorage.getItem("userData") as string);

  const printAppHtml = () => {
    const container: HTMLElement = document.querySelector('#app') as HTMLElement;
    // eslint-disable-next-line no-console
    container.innerHTML = '';
    const votingPageContainer: HTMLDivElement = document.createElement('div');
    votingPageContainer.classList.add('votingpage');
    const todoTaskList: HTMLTableElement = document.createElement('table');
    todoTaskList.classList.add('todo-list');
    todoTaskList.innerText = 'röstningslista';
    const votingHeader: HTMLDivElement = document.createElement('h3');
    votingHeader.innerText ="Nu röstar vi om: ";
    const votingContainer: HTMLDivElement = document.createElement('div');
    votingContainer.classList.add('voting-div');
    const doneTasksList: HTMLTableElement = document.createElement('table');
    doneTasksList.classList.add('done-tasks');
    doneTasksList.innerText = 'alla färdiga röstningar';

  
    container.appendChild(votingPageContainer);
    votingPageContainer.append(todoTaskList, votingContainer, doneTasksList);

    const displayVoteTask: HTMLDivElement = document.createElement('div');
    displayVoteTask.classList.add('voting-header');
    displayVoteTask.innerText = 'När en session börjar kommer du kunna se vad vi ska rösta på här';

    const voteCardsContainer: HTMLDivElement = document.createElement('div');
    voteCardsContainer.classList.add('voting-card-container');
    voteCardsContainer.innerText = 'våra röstkost';

    votingContainer.append(votingHeader, displayVoteTask, voteCardsContainer);
    printHeaderHtml();
  };

  const renderSelfCard = (user: User, render: Element) => {
    const selectContainer = document.createElement('div');
    selectContainer.innerHTML = /*html */ `
      <select name="points" id="points">
        <option value=null>Välj</option>
        <option value=1>Tiny 1SP</option>
        <option value=3>Small 3SP</option>
        <option value=5>Medium 5SP</option>
        <option value=8>Large 8 SP</option>
      </select>
      <button id="submitVote">Rösta</button>
    `;

    render.appendChild(selectContainer);

    const voteButton = render.querySelector('#submitVote') as HTMLButtonElement;
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
  };

  const createUserCards = async () => {
    const response = await fetch(`${socketURL}/api/vote/sessions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const users = (await response.json()) as User[];
      const self = getUser();
      console.log('Users in session', users);

      const votingCardContainer: HTMLDivElement = document.querySelector('.voting-card-container') as HTMLDivElement;
      votingCardContainer.innerHTML = '';

      users.map((user) => {
        const votingCard: HTMLDivElement = document.createElement('div');
        votingCard.classList.add('voting-card-div');
        votingCard.innerHTML = /*html */ `<p>${user.username} funderar</p>`;
        votingCard.setAttribute('user-id', user._id);

        if (user._id === self._id) {
          renderSelfCard(user, votingCard);
        }

        votingCardContainer.append(votingCard);
      });
    }
  };

  const currentVoteTask = () => {
    const displayCurrentTask = document.querySelector('.voting-header') as HTMLDivElement;
    let nextButton = '';
    
    if(userData.admin == false) { //ta bort false senare 
      nextButton = /*html*/`<button id='nextTask'>Nästa uppgift</button>`;
    }

    socket.on('getTaskList', (list:Task[]) => {
      if (list.length >= 1){
        displayCurrentTask.innerHTML = /*html*/
      `<h3>${list[0].title}</h3>
       <p>${list[0].description}</p>
       ${nextButton}
      `;
        const nextTaskBtn = document.getElementById('nextTask');
        nextTaskBtn?.addEventListener('click', () => {
          if(window.confirm("Är du säker på att du vill gå vidare till nästa task?")){
            const finishedTask = list.shift();
            finishedTask;
            //finishedTaskList.push(finishedTask);
            socket.emit('send sessionList', list);
            socket.emit('send finishedList', finishedTask);
            sessionVue();
            previousVoteTask();
          }     
        })
      } 
    })
  }

  const previousVoteTask = () => {
    const table = document.querySelector('.done-tasks') as HTMLTableElement;
    socket.on('finished List', (list:Task[]) => {
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

        tr.addEventListener('click', (e) => {
          console.log(e.currentTarget);
        });
      });
    })
  }

  const printHeaderHtml = () => {
    const headerContainer = document.querySelector('#header') as HTMLHeadingElement;
    const headerTag = /*html*/ `<h1>Planning Poker</h1>`;
    let adminButton = '';

    if(userData.admin == false) { //ta bort false senare 
      adminButton = /*html*/`<button id='adminMode'>Admin Läge</button>`;
    }

    headerContainer.innerHTML = /*html */ `
      ${headerTag}
      <div class="button-container">
        ${adminButton}
        <button id='logOut'>Logga ut</button>
      </div>
    `

    adminBtnEvent();
    logoutBtnEvent();
  }
  
  const adminBtnEvent = () => {
    const adminBtn = document.getElementById('adminMode');
    adminBtn?.addEventListener('click', () => {
      if (toggleView) {
        toggleView = false; 
        adminBtn.innerHTML = "Sessions Läge";
        renderTempAdminPage();

      } else {
        toggleView = true; 
        adminBtn.innerHTML = "Admin Läge";
        sessionVue();
      }
    })
  }

  const logoutBtnEvent =() => {
    const logoutBtn = document.getElementById('logOut');
    logoutBtn?.addEventListener('click', () => {
      localStorage.removeItem("userData");
      location.reload();
    })
  }

  const getTasks = () => {
    const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;

    socket.on('getTaskList', (list: Task[]) => {
      //console.log(list);
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

        tr.addEventListener('click', (e) => {
          console.log(e.currentTarget);
        });
      });
    });
  };

  printAppHtml();
  createUserCards();
  getTasks();
  currentVoteTask();
}
