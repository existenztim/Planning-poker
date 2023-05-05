import createTasks from "./createTasks";
import { taskSetup } from "./selectTask";

export default function renderTempAdminPage () {
  const container = document.querySelector('#app');
  if (container !==null){
    container.innerHTML = '';
  }

  createTasks();
  taskSetup();
}