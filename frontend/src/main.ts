import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/

import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
*/

/*--------------------------------------------------------------------------
------------------- Add user -----------------------------------------------
--------------------------------------------------------------------------*/

const userAndLoginRoot = document.getElementById('app'); 

const newUserInput = document.createElement('input');
newUserInput.setAttribute('type', 'text');
newUserInput.id = 'newUserInput';
newUserInput.className = 'newUserInput';
newUserInput.placeholder = 'Namn';

const newUserPassword = document.createElement('input');
newUserPassword.setAttribute('type', 'text');
newUserPassword.id = 'newUserPassword';
newUserPassword.className = 'newUserPassword';
newUserPassword.placeholder = 'Lösenord';

const addNewUserBtn = document.createElement('button');
addNewUserBtn.innerHTML = 'Lägg till ny användare och logga in';

userAndLoginRoot?.append(newUserInput, newUserPassword, addNewUserBtn);

addNewUserBtn.addEventListener('click', (event) => {

  event.preventDefault();
    let user = {name: newUserInput.value, password:newUserPassword.value};
    console.log(user);

  fetch("http://localhost:3000/api/users/add", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(user)
  })
  .then(res => res.json())
 // .then(data => {});
  newUserInput.value = "";
  newUserPassword.value = "";
})