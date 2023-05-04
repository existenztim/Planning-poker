/* eslint-disable no-console */
export default function showTaskHtml() {
  const container: HTMLElement = document.querySelector('#app') as HTMLElement;
  // eslint-disable-next-line no-console
  console.log(container);
  container.innerHTML = '';
  
  const todoTaskList: HTMLTableElement = document.createElement('table');
  todoTaskList.classList.add('todo-list');
  const votingContainer: HTMLDivElement = document.createElement('div');
  votingContainer.classList.add('voting-div');
  const doneTasksList: HTMLTableElement = document.createElement('table');
  doneTasksList.classList.add('done-tasks');
  
  console.log(todoTaskList, votingContainer, doneTasksList);
  container.append(todoTaskList, votingContainer, doneTasksList);
  
  const displayVoteTask: HTMLDivElement = document.createElement('div');
  displayVoteTask.classList.add('voting-header');
  
  const voteCardsContainer: HTMLDivElement = document.createElement('div');

  console.log(displayVoteTask, voteCardsContainer);
  
  
  votingContainer.append(displayVoteTask, voteCardsContainer);
}