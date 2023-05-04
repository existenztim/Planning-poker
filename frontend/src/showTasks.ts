/* eslint-disable no-console */
import { socket } from "./socket.ts";
import showTaskHtml from "./showTasksHtml.ts";
import getTasks from "./getTasks.ts";

export default function showTasks () {
  showTaskHtml();

  getTasks();

}





