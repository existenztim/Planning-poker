import createTasks from "./createTasks";
import { taskSetup } from "./selectTask";

export default function renderTempAdminPage () {
    const container = document.querySelector('#app');
    container.innerHTML = '';

    createTasks();
    taskSetup();
}