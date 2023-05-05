/* eslint-disable no-console */
export const printAppHtml =() => {
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
  voteCardsContainer.innerText= 'våra röstkost';

  
  votingContainer.append(displayVoteTask, voteCardsContainer);
}

export const printHeaderHtml =() => {
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
}