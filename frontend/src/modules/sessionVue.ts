/* eslint-disable no-console */
import { socket } from "../socket.ts";
import renderTempAdminPage from "./adminVue.ts";
import type { Task } from "../models/taskModel.ts";
import type { User } from "../models/userModel.ts";

export default function sessionVue () {
  const printAppHtml =() => {
    const container: HTMLElement = document.querySelector('#app') as HTMLElement;
    // eslint-disable-next-line no-console
    container.innerHTML = '';
    
    const votingPageContainer : HTMLDivElement = document.createElement('div');
    votingPageContainer.classList.add('votingpage');
    const todoTaskList: HTMLTableElement = document.createElement('table');
    todoTaskList.classList.add('todo-list');
    todoTaskList.innerText = 'röstningslista'
    const votingContainer: HTMLDivElement = document.createElement('div');
    votingContainer.classList.add('voting-div');
    const doneTasksList: HTMLTableElement = document.createElement('table');
    doneTasksList.classList.add('done-tasks');
    doneTasksList.innerText='alla färdiga röstningar';
    
    //console.log(todoTaskList, votingContainer, doneTasksList);
    container.appendChild(votingPageContainer);
    votingPageContainer.append(todoTaskList, votingContainer, doneTasksList);
    
    const displayVoteTask: HTMLDivElement = document.createElement('div');
    displayVoteTask.classList.add('voting-header');
    displayVoteTask.innerText = 'vad vi ska rösta på';
    
    const voteCardsContainer: HTMLDivElement = document.createElement('div');
    voteCardsContainer.classList.add('voting-card-container');
    voteCardsContainer.innerText= 'våra röstkost';
  
    
    votingContainer.append(displayVoteTask, voteCardsContainer);
    printHeaderHtml();
  }

  const createUserCards = () => {
    socket.on('userList', (userList:User[]) => {
      console.log(userList);
      const votingCardContainer : HTMLDivElement = document.querySelector('.voting-card-container') as HTMLDivElement;
      votingCardContainer.innerHTML = '';
  
      userList.map(user => {
        console.log(user.username);
        const votingCard : HTMLDivElement = document.createElement('div');
        votingCard.classList.add('voting-card-div');
        votingCard.innerText = 'Röstkort';
        votingCard.innerHTML = /*html */`<p>${user.username}s: poäng</p>
        <select name="points" id="points">
          <option value=null>Välj</option>
          <option value=1>Tiny 1SP</option>
          <option value=3>Small 3SP</option>
          <option value=5>Medium 5SP</option>
          <option value=8>Large 8 SP</option>
        </select>`
  
        votingCardContainer.append(votingCard)
          
          
      })
      
    })
      
  }

  const printHeaderHtml =() => {
    const admin = true; // Tillfällig lösning
    const headerContainer = document.querySelector('#header') as HTMLHeadingElement;
    const headerTag = /*html*/`<h1>Planning Poker</h1>`;
    let adminButton = '';
  
    if(admin) { //kontrollera med localstorage (user.admin någon sådant)
      adminButton = `<button id='adminMode'>Admin Läge</button>`;
    }
  
    headerContainer.innerHTML =/*html */`
      ${headerTag}
      <div class="button-container">
        ${adminButton}
        <button id='logOut'>Logga ut</button>
      </div>
    `
    headerBtnsEvent();
  }
  
  const headerBtnsEvent = () => {
    const adminBtn = document.getElementById('adminMode');
    adminBtn?.addEventListener('click', () => {
      renderTempAdminPage();
    })
  }

  const getTasks =() => {
    const table: HTMLTableElement = document.querySelector('.todo-list') as HTMLTableElement;
  
    socket.on('getList', (list:Task[]) => {
      console.log(list);
      let count = 0
      list.map(item => {
        console.log(item.title);
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
  printAppHtml();
  createUserCards();
  getTasks();
}





