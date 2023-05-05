import { taskSetup } from "./selectTask";
import showTasks from "./showTasks";
//import { socket } from "./socket";

export default function createTasks () {
  //console.log('skapa tasks');
  const container : HTMLElement = document.querySelector('#app') as HTMLElement;
  //container.innerHTML = '';

  const taskForm : HTMLFormElement = document.createElement('form');

  taskForm.innerHTML = 
  `<label for="title">Uppgift</label>
<input type="text" id="title" name="title">
<label for="description">Beskrivning</label>
<textarea id="description" name="description"></textarea>
<label for = "points">Poäng</label>
<select name="points" id="points">
  <option value=null>Välj</option>
  <option value=1>Tiny 1SP</option>
  <option value=3>Small 3SP</option>
  <option value=5>Medium 5SP</option>
  <option value=8>Large 8 SP</option>
</select>
<button id="save-task-btn">Spara</button>`

  container.append(taskForm);
  const saveButton :HTMLButtonElement = document.querySelector('#save-task-btn') as HTMLButtonElement;
  const titleField :HTMLInputElement = document.querySelector('#title') as HTMLInputElement;
  const descriptionField :HTMLInputElement = document.querySelector('#description') as HTMLInputElement;
  const pointsField :HTMLSelectElement = document.querySelector('#points') as HTMLSelectElement;
  //console.log(saveButton, titleField, descriptionField, pointsField);

  saveButton.addEventListener('click', () => {
    const task = {title: titleField.value, description: descriptionField.value, points: pointsField.value}
    //console.log(titleField.value, descriptionField.value, pointsField.value);
    

    fetch('http://localhost:5050/api/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
      })
    //showTasks();
    taskSetup();
  })
    
  //socket.emit('createTask', {title: titleField.value, description: descriptionField.value, points: pointsField.value})
  
    
}