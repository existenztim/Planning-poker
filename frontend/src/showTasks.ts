/* eslint-disable no-console */
import { socket } from "./socket.ts";
import { printAppHtml, printHeaderHtml } from "./showTasksHtml.ts";
import getTasks from "./getTasks.ts";

export default function showTasks () {
  printAppHtml();
  printHeaderHtml();
  getTasks();

}





