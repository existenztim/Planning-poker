/* eslint-disable no-console */
import { socket } from "./socket.ts";
import showTaskHtml from "./showTasksHtml.ts";
import getTasks from "./getTasks.ts";
import createUserCards from "./createUserCardHtml.ts";

export default function showTasks () {
  showTaskHtml();
  createUserCards();
  getTasks();

  // const loggedInUser = JSON.parse(localStorage.getItem('userData') || '');
  // console.log(loggedInUser);

  // socket.emit('checkUsers', (loggedInUser))

}





