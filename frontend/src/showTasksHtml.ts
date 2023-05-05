/* eslint-disable no-console */
export const printAppHtml =() => {
  const container: HTMLElement = document.querySelector('#app') as HTMLElement;
  // eslint-disable-next-line no-console
  container.innerHTML = '';
  
  const todoTaskList: HTMLTableElement = document.createElement('table');
  todoTaskList.classList.add('todo-list');
  const votingContainer: HTMLDivElement = document.createElement('div');
  votingContainer.classList.add('voting-div');
  votingContainer.innerText = 'allt som rör röstning';
  const doneTasksList: HTMLTableElement = document.createElement('table');
  doneTasksList.classList.add('done-tasks');
  doneTasksList.innerText='alla färdiga röstningar';
  
  container.append(todoTaskList, votingContainer, doneTasksList);
  
  const displayVoteTask: HTMLDivElement = document.createElement('div');
  displayVoteTask.classList.add('voting-header');
  displayVoteTask.innerText = 'vad vi ska rösta på';
  
  const voteCardsContainer: HTMLDivElement = document.createElement('div');
  voteCardsContainer.innerText= 'våra röstkost';

  
  votingContainer.append(displayVoteTask, voteCardsContainer);
}

export const printHeaderHtml =() => {
  const admin = true; // Tillfällig lösning
  const headerContainer = document.querySelector("#header") as HTMLHeadingElement;
  headerContainer.innerHTML += /*html */`
  <button id="logOut">Logga ut</button>
  `
  if(admin) {
    headerContainer.innerHTML += /*html */`
    <button id="adminMode">Admin läge</button>
    `
  }
}