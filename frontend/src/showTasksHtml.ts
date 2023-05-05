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
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  headerContainer.appendChild(buttonContainer);

  buttonContainer.innerHTML += /*html */`
  <button id='logOut'>Logga ut</button>
  `
  if(admin) { //kontrollera med localstorage (user.admin någon sådant)
    buttonContainer.innerHTML += /*html */`
    <button id='adminMode'>Admin läge</button>
    `
  }
}