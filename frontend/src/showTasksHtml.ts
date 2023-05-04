/* eslint-disable no-console */
export default function showTaskHtml() {
  const container: HTMLElement = document.querySelector('#app') as HTMLElement;
  // eslint-disable-next-line no-console
  console.log(container);
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

  console.log(displayVoteTask, voteCardsContainer);
  
  
  votingContainer.append(displayVoteTask, voteCardsContainer);

  //return todoTaskList;
}