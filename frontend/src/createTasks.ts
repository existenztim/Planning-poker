import showTasks from "./showTasks";
import { socket } from "./socket";

export default function createTasks () {
  //console.log('skapa tasks');
  const container : HTMLElement = document.querySelector('#app') as HTMLElement;
  container.innerHTML = '';

  const taskForm : HTMLFormElement = document.createElement('form');
  taskForm.innerHTML = `
<label for="title">Uppgift</label><br>
<input type="text" id="title" name="title"><br>
<label for="description">Beskrivning</label><br>
<input type="text" id="description" name="description">
<label for = "points">Poäng</label>
<select name="points" id="points">
  <option value="default">Välj</option>
  <option value="tiny-1SP">Tiny 1SP</option>
  <option value="small-3SP">Small 3SP</option>
  <option value="medium-5SP">Medium 5SP</option>
  <option value="large-8SP">Large 8 SP</option>
</select>
<button id="save-task-btn">Spara</button>`

  container.append(taskForm);
  const saveButton :HTMLButtonElement = document.querySelector('#save-task-btn') as HTMLButtonElement;
  const titleField :HTMLInputElement = document.querySelector('#title') as HTMLInputElement;
  const descriptionField :HTMLInputElement = document.querySelector('#description') as HTMLInputElement;
  const pointsField :HTMLSelectElement = document.querySelector('#points') as HTMLSelectElement;
  //console.log(saveButton, titleField, descriptionField, pointsField);

  saveButton.addEventListener('click', () => {
    //console.log(titleField.value, descriptionField.value, pointsField.value);
    showTasks();
    
    socket.emit(titleField.value, descriptionField.value, pointsField.value)
  })
    
}